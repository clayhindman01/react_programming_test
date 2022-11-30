import React from "react";
import GitHubTrending from "./components/GitHubTrending";

import "./styles.css";
export default function App() {
  return (
    <div className="App">
      <h1 className="pagetitle">GitHub Trending</h1>
      <GitHubTrending />
    </div>
  );
}
