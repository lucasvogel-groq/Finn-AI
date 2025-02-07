import Groq from "groq-sdk";
import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import dotenv from "dotenv";
import axios from "axios";

dotenv.config();
const groq = new Groq({
  apiKey: "Your Groq API key",
});

const app = express();
const PORT = process.env.PORT || 5001;

app.use(cors());
app.use(bodyParser.json());

app.get("/", (req, res) => {
  res.send("Backend is Running");
});

// Start the Server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});

var messages = [];
var followUpMessages = [];
contextAgent(); // Contexts agent with system prompt

// form submission backend point
app.post("/api/submit", async (req, res) => {
  const {
    age,
    annualIncome,
    monthlyExpenses,
    currentSavings,
    context,
    investments,
    shortTermGoals,
    longTermGoals,
  } = req.body;
  const prompt = generatePrompt({
    age,
    annualIncome,
    monthlyExpenses,
    currentSavings,
    context,
    investments,
    shortTermGoals,
    longTermGoals,
  });
  contextFollowUpClient({
    age,
    annualIncome,
    monthlyExpenses,
    currentSavings,
    investments,
    shortTermGoals,
    longTermGoals,
  });
  const prompt_message = {
    role: "user",
    content: prompt,
  };
  messages.push(prompt_message);
  try {
    const advice = await generateAdvice(messages);
    const response_message = {
      role: "assistant",
      content: advice,
    };
    messages.push(response_message);
    res.json(advice);
  } catch (error) {
    console.error(
      "Error interacting with Groq API:",
      error.response?.data || error.message
    );
    res
      .status(500)
      .json({ error: "Failed to generate advice. Please try again later." });
  }
});

// TODO: Fix this
app.post("/api/followup", async (req, res) => {
  console.log("Received request body:", req.body);
  if (!req.body || !req.body.question) {
    return res.status(400).json({ error: "Invalid request body" });
  }
  const question = req.body.question;
  console.log("processed question: " + question);
  const follow_up_prompt = {
    role: "user",
    content: question,
  };
  followUpMessages.push(follow_up_prompt);
  console.log("Follow Up Messages: " + JSON.stringify(followUpMessages));
  try {
    const advice = await getFollowUpQuestionAnswer();
    console.log("Advice: " + advice);
    res.json(advice);
  } catch (error) {
    console.error(
      "Error interacting with Groq - Follow up question",
      error.response?.data || error.message
    );
    res.status(500);
  }
});

async function generateAdvice(messages) {
  const GroqAdvice = await getGroqChatCompletion(messages);
  return GroqAdvice.choices[0]?.message?.content || "";
}

function generatePrompt({
  age,
  annualIncome,
  monthlyExpenses,
  currentSavings,
  context,
  investments,
  shortTermGoals,
  longTermGoals,
}) {
  return `
       Here is the given user's financial data, goals, and preferences:
        - Age: $${age}
        - Context about the user: $${context}
        - Annual Income: $${annualIncome}
        - Monthly Expenses: $${monthlyExpenses}
        - Current Savings: $${currentSavings}
        - Current Investment Details: $${investments}
        - Short Term Goals: $${shortTermGoals}
        - Long Term Goals: $${longTermGoals}
        Provide your JSON output given this user's data.
    `;
}

export async function getGroqChatCompletion(messages) {
  const chat_completion = groq.chat.completions.create({
    messages: messages,
    temperature: 0,
    stream: false,
    response_format: { type: "json_object" },
    model: "llama-3.3-70b-versatile",
  });
  return chat_completion;
}

function contextAgent() {
  // JSON schema for Financial report
  const schema = {
    summary: {
      financial_health: "<Bad/Moderate/Fair/Good/Great>",
      savings_rate: "<Percentage integer>",
      overall_advice:
        "<Summarize the user's financial status; explain why their data led you to this conclusion>",
    },
    budget: {
      income_breakdown: {
        savings: "<Percentage of income integer>",
        investments: "<Percentage of income integer>",
        housing_utilities: "<Percentage of income integer>",
        discretionary: "<Percentage of income integer>",
        dining: "<Percentage of income integer>",
      },
      income_breakdown_explained:
        "<Explain why you chose each percentage and why it fits the users needs>",
      long_term_budget_advice:
        "<Why is this budget breakdown good for the long term>",
      emergency_fund: "<Calculate an ideal emergency fund for 3-6 months>",
      emergency_fund_build: "<Recommend steps to build the emergency fund>",
    },
    investments: {
      recommended_portfolio: {
        stocks: "<Percentage integer>",
        bonds: "<Percentage integer>",
        cash: "<Percentage integer>",
        crypto: "<Percentage integer>",
      },
      recommended_shortterm_investments: [
        {
          name: "<Stocks/Bonds/Crypto>",
          etf: "<ETF name>",
          explanation: "<Explain why you chose it for the user>",
        },
        {
          name: "<Stocks/Bonds/Crypto>",
          etf: "<ETF name>",
          explanation: "<Explain why you chose it for the user>",
        },
        {
          name: "<Stocks/Bonds/Crypto>",
          etf: "<ETF name>",
          explanation: "<Explain why you chose it for the user>",
        },
      ],
      recommended_longterm_investments: [
        {
          name: "<Stocks/Bonds/Crypto>",
          etf: "<ETF name>",
          explanation: "<Explain why you chose it for the user>",
        },
        {
          name: "<Stocks/Bonds/Crypto>",
          etf: "<ETF name>",
          explanation: "<Explain why you chose it for the user>",
        },
        {
          name: "<Stocks/Bonds/Crypto>",
          etf: "<ETF name>",
          explanation: "<Explain why you chose it for the user>",
        },
      ],
      risk_level: "<Low/Moderate/High>",
      investment_strategy: "<Paragraph explaining investment strategy>",
      retirement_planning:
        "<Paragraph suggesting strategies for retirement planning>",
      investing_resources: "<Paragraph giving the user investing resources>",
    },
    goals: {
      long_term_goal_advice: "<How can the user reach their long term goals>",
      short_term_goal_advice: "<How can the user reach their short term goals>",
      actionable_steps: [
        "<In-depth step 1>",
        "<In-depth step 2>",
        "<In-depth step 3>",
        "<In-depth step 4>",
      ],
    },
  };
  const jsonSchema = JSON.stringify(schema, null, 4);
  // TODO: Fix this for better responses
  const system_message = `You are a highly intelligent financial advising AI agent. Your role is to generate personalized financial advice. Follow these strict guidelines:

      1. **General Instructions**
         - You will first be given user's financial data and your role is to analyze this data and then provide a financial report in JSON structure.
         - You are the users financial advisor so give them in depth actionable advice
         - Never advise the user to consult a financial advisor

      2. **Response Rules**
         - Tailor advice based on the user’s specific financial inputs and goals and the given economic data.
         - Provide actionable, practical, and clear steps the user can take to improve their financial health
         - All of your responses within the JSON structure should be as if you were talking to the person like their financial advisor
         - Ensure the JSON structure is valid, well-formatted, and error-free
      
      3. **Assumptions and Defaults**
         - If any required input data is missing, make reasonable assumptions and clearly state them in the response
      
      4. **Output Format:**
         - Your response must be perfectly formatted JSON with the following structure: ${jsonSchema}
      `;
  const system_prompt = {
    role: "system",
    content: system_message,
  };
  messages.push(system_prompt);
}

function contextFollowUpClient({
  age,
  annualIncome,
  monthlyExpenses,
  currentSavings,
  investments,
  shortTermGoals,
  longTermGoals,
}) {
  const system_message = `You are a highly intelligent financial advising AI agent.
  
  Here is your clients financial data:
        - Age: $${age}
        - Annual Income: $${annualIncome}
        - Monthly Expenses: $${monthlyExpenses}
        - Current Savings: $${currentSavings}
        - Current Investment Details: $${investments}
        - Short Term Goals: $${shortTermGoals}
        - Long Term Goals: $${longTermGoals} 
  
  1. **Response Guidelines**
      - Personalization: Tailor responses based on the provided financial data.
      - Financial Principles: Ensure all advice follows sound financial principles and common investment strategies.
      - Clarity & Simplicity: Keep responses clear, actionable, and free from unnecessary jargon.
      - Scenario Analysis: If applicable, offer multiple options with trade-offs to help the user make informed decisions.
      - Legal Disclaimer: Clarify that you are an AI providing informational guidance, not a licensed financial professional.
      - DO NOT summarize the users financial data, only answer their question and provide your recommendations
      `;

  const system_prompt = {
    role: "system",
    content: system_message,
  };
  followUpMessages.push(system_prompt);
}

export async function getFollowUpQuestionAnswer() {
  const chatCompletion = await groq.chat.completions.create({
    messages: followUpMessages,
    model: "llama-3.3-70b-versatile",
  });
  console.log("Groq API Full Response:", chatCompletion);
  console.log(
    "Groq API Full Response:",
    JSON.stringify(chatCompletion, null, 2)
  );
  return chatCompletion.choices[0]?.message.content || "";
}
