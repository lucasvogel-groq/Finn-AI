import { React, useState } from "react";
import { SearchBar } from "./SearchBar.js";
import axios from "axios";

function FollowUp() {
  const placeholders = [
    "How can I optimize my monthly budget?",
    "What steps should I take to achieve my goals?",
    "What are the best ways to generate passive income?",
    "When should I rebalance my investment portfolio?",
    "Am I on track to retire by 60?",
  ];
  const [question, setQuestion] = useState("");
  const [response, setResponse] = useState("");
  const [error, setError] = useState(null);
  const handleChange = (e) => {
    let question = e.target.value;
    setQuestion(question);
    console.log(e.target.value);
  };
  const onSubmit = async (e) => {
    e.preventDefault();
    setResponse(null);
    setError(null);
    // send question to back end to get repsonse from AI model
    try {
      console.log("Question: " + question);
      const res = await axios.post("http://localhost:5001/api/QA", question);
      setResponse(res);
      console.log("follow up response: " + res);
    } catch (error) {
      setError(
        error.response?.data?.error || "An error occurred. Please try again."
      );
      console.error("Error fetching data: " + error);
    }
  };
  return (
    <div>
      <div className="text-sm sm:text-base font-normal pb-5 pr-64">
        <SearchBar
          placeholders={placeholders}
          value={question}
          onChange={handleChange}
          onSubmit={onSubmit}
        />
      </div>
      {response && (
        <>
          <div className="h-screen bg-transparent rounded-lg shadow-md overflow-y-auto">
            {response?.data.split("\n").map((line, index) => (
              <p className="font-normal text-white-500 text-xl p-2" key={index}>
                {line}
              </p>
            ))}
            <div className="min-h-96"></div>
          </div>
        </>
      )}
    </div>
  );
}

export default FollowUp;
