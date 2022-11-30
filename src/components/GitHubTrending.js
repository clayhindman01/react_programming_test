import React, { useState } from "react";
import { fetchTrendingRepos } from "./GitHubTrending";
import RepoFilter from "./RepoFilter";
import RepoBoard from "./RepoBoard";
import RepoBoardController from "../controllers/RepoBoardController";
/**
 * The main component that renders GitHub trending repositories based-on user selections.
 *
 * @todo You should complete this React component to display trending repositories and let user select filters.
 * You may change the parameters and existing code of this function.
 */
export default function GitHubTrending() {
  const [languageValue, setLanguageValue] = useState("");
  const [rangeValue, setRangeValue] = useState("daily");
  const [repos, setRepos] = useState([]);

  return (
    <div>
      <RepoFilter
        setLanguageValue={setLanguageValue}
        setRangeValue={setRangeValue}
        languageValue={languageValue}
        rangeValue={rangeValue}
      />
      <RepoBoardController
        languageValue={languageValue}
        rangeValue={rangeValue}
        repos={repos}
        setRepos={setRepos}
      />
    </div>
  );
}
