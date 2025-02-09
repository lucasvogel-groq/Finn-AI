import { React } from "react";
import { Tabs } from "./Tabs.js";
import { PieChart } from "./PieChart.js";
import FollowUp from "./FollowUp.js";
import SankeyDiagram from "./SankeyDiagram.js";

export function Response({ data }) {
  const tabs = [
    {
      title: "Overview",
      value: "overview",
      content: (
        <div className="w-full overflow-hidden relative h-full rounded-2xl p-10 text-xl md:text-4xl font-bold text-white bg-gradient-to-br from-purple-700 to-violet-900">
          <p>Financial Overview</p>
          <Overview
            financialAssessment={data.summary.financial_health}
            savingsRate={data.summary.savings_rate}
            savingsGoal={data.budget.income_breakdown.savings}
            overallEvaluation={data.summary.overall_advice}
          />
        </div>
      ),
    },
    {
      title: "Budgeting",
      value: "Budgeting",
      content: (
        <div className="w-full overflow-hidden relative h-full rounded-2xl p-10 text-xl md:text-4xl font-bold text-white bg-gradient-to-br from-purple-700 to-violet-900">
          <p>Budgeting</p>
          <BudgetSection data={data}></BudgetSection>
        </div>
      ),
    },
    {
      title: "Investments",
      value: "investments",
      content: (
        <div className="w-full overflow-hidden relative h-full rounded-2xl p-10 text-xl md:text-4xl font-bold text-white bg-gradient-to-br from-purple-700 to-violet-900">
          <p>Investments</p>
          <InvestmentSection
            recommendedPortfolio={data.investments.recommended_portfolio}
            shortTermInvestments={
              data.investments.recommended_shortterm_investments
            }
            longTermInvestments={
              data.investments.recommended_longterm_investments
            }
            riskLevel={data.investments.risk_level}
            InvestmentStrategy={data.investments.investment_strategy}
            retirement={data.investments.retirement_planning}
            investmentResources={data.investments.investing_resources}
          ></InvestmentSection>
        </div>
      ),
    },
    {
      title: "Goals",
      value: "Goals",
      content: (
        <div className="w-full overflow-hidden relative h-full rounded-2xl p-10 text-xl md:text-4xl font-bold text-white bg-gradient-to-br from-purple-700 to-violet-900">
          <p>Goals</p>
          <GoalsSection
            longTerm={data.goals.long_term_goal_advice}
            shortTerm={data.goals.short_term_goal_advice}
            actionableSteps={data.goals.actionable_steps}
          ></GoalsSection>
        </div>
      ),
    },
    {
      title: "Questions",
      value: "Questions",
      content: (
        <div className="w-full overflow-hidden relative h-full rounded-2xl p-10 text-xl md:text-4xl font-bold text-white bg-gradient-to-br from-purple-700 to-violet-900">
          <p className="pb-10">Ask Finn Any Follow Up Questions</p>
          <FollowUp></FollowUp>
        </div>
      ),
    },
  ];
  const styles = {
    responseContainer: {
      height: "100vh",
    },
  };
  return (
    <div style={styles.responseContainer}>
      (
      <div className="h-[40rem] md:h-[38rem] md:w-[100rem] [perspective:1000px] relative b flex flex-col max-w-5xl mx-auto w-full  items-start justify-start my-30">
        <Tabs tabs={tabs} />
      </div>
      )
    </div>
  );
}

const Overview = ({
  financialAssessment,
  savingsRate,
  savingsGoal,
  overallEvaluation,
}) => {
  const savingsRateNum = parseInt(savingsRate, 10);
  const savingsGoalNum = parseInt(savingsGoal, 10);
  return (
    <div className="p-10 h-screen overflow-y-auto bg-transparent rounded-lg shadow-md">
      <div className="mb-6">
        <h3 className="text-3xl">
          Finn's overall assessment of your financial status:{" "}
          <p className="font-normal">{financialAssessment}</p>
        </h3>
      </div>

      <div className="mb-6">
        <h3 className="text-3xl mb-2">Savings Rate vs Savings Goal</h3>
        <div className="flex items-center">
          <div className="w-1/2">
            <p className="font-normal text-white-700 text-xl">
              Your Current Savings Rate: {savingsRate}%
            </p>
            <p className="font-normal text-white-700 text-xl">
              Finn's Reccomended Savings Goal: {savingsGoal}%
            </p>
            <div className="p-5 w-full">
              <div className="bg-gray-200 rounded-full h-4">
                <div
                  className="bg-blue-500 rounded-full h-4"
                  style={{
                    width: `${(savingsRateNum / savingsGoalNum) * 100}%`,
                  }}
                ></div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div>
        <h3 className="text-3xl mb-2">Overall Evaluation & Advice</h3>
        <p className="font-normal text-white-500 text-xl">
          {overallEvaluation}
        </p>
      </div>
      <div className="min-h-96"></div>
    </div>
  );
};

const InvestmentSection = ({
  recommendedPortfolio,
  shortTermInvestments,
  longTermInvestments,
  InvestmentStrategy,
  retirement,
  investmentResources,
}) => {
  return (
    <div className="p-6 h-screen overflow-y-auto">
      <div className="rounded-lg shadow-md mb-8 grid grid-cols-2 gap-4">
        <div className="mb-8 p-5">
          <PieChart portfolio={recommendedPortfolio}></PieChart>
        </div>
        <div div className="mb-8 p-5">
          <h3 className="text-3xl mb-2">Overall Investment Strategy</h3>
          <p className="text-white-700 font-normal text-xl">
            {InvestmentStrategy}
          </p>
        </div>
      </div>
      <div className="mb-8 grid grid-cols-2 gap-4 rounded-lg shadow-md">
        <div className="mb-8 p-5">
          <h3 className="text-3xl mb-4">Short-Term Investments</h3>
          <div className="grid grid-cols-1 gap-4">
            {shortTermInvestments.map((investment, index) => (
              <div key={index} className="p-4 bg-transparent rounded-lg">
                <h4 className="text-xl ">{investment.name}</h4>
                <p className="text-white-700 text-xl">
                  <strong>ETF:</strong> {investment.etf}
                </p>
                <p className="text-white-700 font-normal text-xl">
                  {investment.explanation}
                </p>
              </div>
            ))}
          </div>
        </div>
        <div className="mb-8 p-5">
          <h3 className="text-3xl mb-4">Long-Term Investments</h3>
          <div className="grid grid-cols-1 gap-4">
            {longTermInvestments.map((investment, index) => (
              <div key={index} className="p-4 bg-transparent rounded-lg">
                <h4 className="text-xl ">{investment.name}</h4>
                <p className="text-white-700 text-xl">
                  <strong>ETF:</strong> {investment.etf}
                </p>
                <p className="text-white-700 font-normal text-xl">
                  {investment.explanation}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
      <div className="mb-8 rounded-lg shadow-md p-5">
        <h3 className="text-3xl mb-2">Investment Resources</h3>
        <p className="text-white-700 font-normal text-xl">
          {investmentResources}
        </p>
      </div>
      <div className="rounded-lg shadow-md p-4">
        <h3 className="text-3xl mb-2">Planning for Retirement</h3>
        <p className="text-white-700 font-normal text-xl">{retirement}</p>
      </div>
      <div className="min-h-96"></div>
    </div>
  );
};

const GoalsSection = ({ longTerm, shortTerm, actionableSteps }) => {
  return (
    <div className="p-6 h-screen bg-transparent overflow-y-auto">
      <div className="rounded-lg shadow-md">
        <div className="mb-8 p-5">
          <h3 className="text-3xl mb-4">Reaching Your Short Term Goals</h3>
          <p className="text-white-700 font-normal text-xl">{shortTerm}</p>
        </div>
        <div className="mb-8 p-5">
          <h3 className="text-3xl mb-4">Reaching Your Long term Goals</h3>
          <p className="text-white-700 font-normal text-xl">{longTerm}</p>
        </div>
      </div>
      <div className="grid grid-cols-2 gap-4 pt-5">
        {actionableSteps.map((step, index) => (
          <div key={index} className="p-4 bg-transparent rounded-lg shadow-md">
            <h4 className="text-3xl p-2">Step {index + 1}</h4>
            <p className="text-white-700 font-normal text-xl">{step}</p>
          </div>
        ))}
      </div>
      <div className="min-h-96"></div>
    </div>
  );
};

const BudgetSection = ({ data }) => {
  return (
    <div className="p-6 h-screen bg-transparent overflow-y-auto">
      <div className="mb-20 rounded-lg shadow-md grid grid-cols-2 gap-6">
        <div className="h-full mb-8 flex items-center">
          <SankeyDiagram
            percentages={data.budget.income_breakdown}
          ></SankeyDiagram>
        </div>
        <div>
          <p className="h-full flex items-center justify-content text-white-700 font-normal text-xl">
            {data.budget.income_breakdown_explained}
          </p>
        </div>
      </div>
      <div className="mb-8 rounded-lg shadow-md p-4">
        <h3 className="text-3xl mb-2">Long Term Budget Planning</h3>
        <p className="text-white-700 font-normal text-xl">
          {data.budget.long_term_budget_advice}
        </p>
      </div>
      <div className="mb-8 rounded-lg shadow-md p-4">
        <h3 className="text-3xl mb-2">
          Emergency Fund Allocation: {data.budget.emergency_fund}$
        </h3>
      </div>
      <div className="mb-5 rounded-lg shadow-md p-4">
        <h3 className="text-3xl mb-2">How to Build an Emergency Fund</h3>
        <p className="text-white-700 font-normal text-xl">
          {data.budget.emergency_fund_build}
        </p>
      </div>
      <div className="min-h-96"></div>
    </div>
  );
};
