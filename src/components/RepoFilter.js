import React from "react";
import { FileBinaryIcon, ClockIcon } from "@primer/octicons-react";
import fetchTrendingRepos from "../api/fetchTrendingRepos";

export default function RepoFilter(props) {
  const languageOptions = [
    {
      label: "All languages",
      value: "",
    },
    {
      label: "C",
      value: "c",
    },
    {
      label: "Java",
      value: "java",
    },
    {
      label: "JavaScript",
      value: "javascript",
    },
    {
      label: "Python",
      value: "python",
    },
  ];

  // All options for the time frame select tag
  const timeOptions = [
    {
      label: "Daily",
      value: "daily",
    },
    {
      label: "Weekly",
      value: "weekly",
    },
    {
      label: "Monthly",
      value: "monthly",
    },
  ];

  const { setLanguageValue, setRangeValue, languageValue, rangeValue } = props;

  const handleLanguageChange = (event) => {
    setLanguageValue(event.target.value);
  };

  const handleRangeChange = (event) => {
    setRangeValue(event.target.value);
  };

  return (
    <div className="repo-filter">
      <div className="select-group">
        <FileBinaryIcon size={16} />
        <select onChange={handleLanguageChange} value={languageValue}>
          {languageOptions.map((option) => (
            <option key={Math.random()} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
      </div>
      <div className="select-group">
        <ClockIcon size={16} />
        <select onChange={handleRangeChange} value={rangeValue}>
          {timeOptions.map((option) => (
            <option key={Math.random()} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
}
