import React from "react";
import RepoCard from "./RepoCard";

export default function RepoBoard({ repos }) {
  return (
    <div className="repo-board">
      {repos.map((data) => (
        <RepoCard
          key={Math.random()}
          url={data.url}
          name={data.name}
          description={data.description}
          language={data.language}
          stars={data.stars}
          forks={data.forks}
        />
      ))}
    </div>
  );
}
