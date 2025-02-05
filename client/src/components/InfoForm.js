"use client";
import React, { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { Label } from "./Label.js";
import { Input } from "./InputComp.js";
import { cn } from "../lib/utils.js";
import axios from "axios";

export function InfoForm() {
  const [response, setResponse] = useState(null);
  const [error, setError] = useState(null);
  const resultRef = useRef(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    age: "",
    annualIncome: "",
    monthlyExpenses: "",
    currentSavings: "",
    investments: "",
    shortTermGoals: "",
    longTermGoals: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setResponse(null);
    setError(null);
    setLoading(true);
    navigate("/loading");
    try {
      // Send data to the backend
      const res = await axios.post(
        "http://localhost:5001/api/submit",
        formData
      );
      console.log("data reposone in form: " + res.data);
      navigate("/dashboard", { state: { data: res.data } });
    } catch (err) {
      setError(
        err.response?.data?.error || "An error occurred. Please try again."
      );
    }
  };
  return (
    <div className="max-w-md w-full mx-auto rounded-none md:rounded-2xl p-4 md:p-8 shadow-input bg-white dark:bg-black">
      <h2 className="font-bold text-xl text-neutral-800 dark:text-neutral-200">
        Welcome to Finn AI
      </h2>
      <p className="text-neutral-600 text-sm max-w-sm mt-2 dark:text-neutral-300">
        Fill out some basic financial information to get access to a
        personalized financial dashboard
      </p>
      <form className="my-8" onSubmit={handleSubmit}>
        <div className="flex flex-col md:flex-row space-y-2 md:space-y-0 md:space-x-2 mb-4">
          <LabelInputContainer>
            <Label htmlFor="firstname">First name</Label>
            <Input
              id="firstname"
              placeholder="Lucas"
              type="text"
              name="firstName"
              title="firstName"
              value={formData.firstName}
              onChange={handleChange}
            />
          </LabelInputContainer>
          <LabelInputContainer>
            <Label htmlFor="lastname">Last name</Label>
            <Input
              id="lastname"
              placeholder="Vogel"
              type="text"
              name="lastName"
              title="lastName"
              value={formData.lastName}
              onChange={handleChange}
            />
          </LabelInputContainer>
        </div>
        <div className="flex flex-col md:flex-row space-y-2 md:space-y-0 md:space-x-2 mb-4">
          <LabelInputContainer>
            <Label htmlFor="age">Age</Label>
            <Input
              id="age"
              placeholder="35"
              type="text"
              name="age"
              title="age"
              value={formData.age}
              onChange={handleChange}
            />
          </LabelInputContainer>
          <LabelInputContainer>
            <Label htmlFor="income">Annual Income</Label>
            <Input
              id="income"
              placeholder="1000"
              type="text"
              name="annualIncome"
              title="annualIncome"
              value={formData.annualIncome}
              onChange={handleChange}
            />
          </LabelInputContainer>
        </div>
        <div className="flex flex-col md:flex-row space-y-2 md:space-y-0 md:space-x-2 mb-4">
          <LabelInputContainer>
            <Label htmlFor="savings">Current Savings</Label>
            <Input
              id="savings"
              placeholder="35"
              type="text"
              name="currentSavings"
              title="currentSavings"
              value={formData.currentSavings}
              onChange={handleChange}
            />
          </LabelInputContainer>
          <LabelInputContainer>
            <Label htmlFor="monthlyexpenses">Monthly Expenses</Label>
            <Input
              id="expenses"
              placeholder="250"
              type="text"
              name="monthlyExpenses"
              title="monthlyExpenses"
              value={formData.monthlyExpenses}
              onChange={handleChange}
            />
          </LabelInputContainer>
        </div>
        <LabelInputContainer className="mb-5">
          <Label htmlFor="investments">Current State of Investment</Label>
          <Input
            id="investments"
            placeholder="Rough Investment Portfolio Details"
            type="text"
            name="investments"
            title="investments"
            value={formData.investments}
            onChange={handleChange}
          />
        </LabelInputContainer>
        <LabelInputContainer className="mb-5">
          <Label htmlFor="shorttermgoals">Short Term Financial Goals</Label>
          <Input
            id="shortTermGoals"
            placeholder="Buy a Car, Go on Vacation, etc."
            type="text"
            name="shortTermGoals"
            title="shortTermGoals"
            value={formData.shortTermGoals}
            onChange={handleChange}
          />
        </LabelInputContainer>
        <LabelInputContainer className="mb-5">
          <Label htmlFor="longtermgoals">Long Term Financial Goals</Label>
          <Input
            id="password"
            placeholder="Retire at age 65"
            type="text"
            name="longTermGoals"
            title="longTermGoals"
            value={formData.longTermGoals}
            onChange={handleChange}
          />
        </LabelInputContainer>

        <button
          className="bg-gradient-to-br relative group/btn from-black dark:from-zinc-900 dark:to-zinc-900 to-neutral-600 block dark:bg-zinc-800 w-full text-white rounded-md h-10 font-medium shadow-[0px_1px_0px_0px_#ffffff40_inset,0px_-1px_0px_0px_#ffffff40_inset] dark:shadow-[0px_1px_0px_0px_var(--zinc-800)_inset,0px_-1px_0px_0px_var(--zinc-800)_inset]"
          type="submit"
        >
          Submit &rarr;
          <BottomGradient />
        </button>
        <div className="bg-gradient-to-r from-transparent via-neutral-300 dark:via-neutral-700 to-transparent my-8 h-[1px] w-full" />
      </form>
    </div>
  );
}

const BottomGradient = () => {
  return (
    <>
      <span className="group-hover/btn:opacity-100 block transition duration-500 opacity-0 absolute h-px w-full -bottom-px inset-x-0 bg-gradient-to-r from-transparent via-cyan-500 to-transparent" />
      <span className="group-hover/btn:opacity-100 blur-sm block transition duration-500 opacity-0 absolute h-px w-1/2 mx-auto -bottom-px inset-x-10 bg-gradient-to-r from-transparent via-indigo-500 to-transparent" />
    </>
  );
};

const LabelInputContainer = ({ children, className }) => {
  return (
    <div className={cn("flex flex-col space-y-2 w-full", className)}>
      {children}
    </div>
  );
};
