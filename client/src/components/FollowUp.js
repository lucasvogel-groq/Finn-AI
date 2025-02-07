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
  const [loading, setLoading] = useState(false);
  const handleChange = (e) => {
    let question = e.target.value;
    setQuestion(question);
    console.log(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setResponse(null);
    setError(null);
    setLoading(true);
    try {
      // Send data to the backend
      const response = await axios.post("http://localhost:5001/api/followup", {
        question,
      });
      setResponse(response);
      console.log("response:" + response.data);
    } catch (err) {
      setError(
        err.response?.data?.error || "An error occurred. Please try again."
      );
    }
  };
  return (
    <div>
      <div className="text-sm sm:text-base font-normal pb-5 pr-64">
        <SearchBar
          placeholders={placeholders}
          value={question}
          onChange={handleChange}
          onSubmit={handleSubmit}
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
            <div className="min-h-10"></div>
          </div>
        </>
      )}
    </div>
  );
}

export default FollowUp;
