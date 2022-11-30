import React, { useEffect } from "react";
import RepoBoard from "../components/RepoBoard";
import fetchTrendingRepos from "../api/fetchTrendingRepos.js";

export default function RepoBoardController(props) {
  const { languageValue, rangeValue, repos, setRepos } = props;

  useEffect(() => {
    fetchTrendingRepos(languageValue, rangeValue).then((data) => {
      setRepos(data);
    });
  }, [languageValue, rangeValue]);
  return <RepoBoard repos={repos} />;
}
