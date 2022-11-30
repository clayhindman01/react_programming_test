import { StarIcon, RepoForkedIcon, RepoIcon } from "@primer/octicons-react";

export default function RepoCard({
  url,
  name,
  description,
  language,
  stars,
  forks,
}) {
  return (
    <div className="repo-card">
      <h2 className="title">
        <RepoIcon size={20} />
        <a href={url} target="_blank" rel="noreferrer">
          {name}
        </a>
      </h2>
      <p className="description">{description}</p>
      <p className="metadata">
        <span className="stars">{language}</span>
        <span className="stars">
          <StarIcon size={16} />
          {stars}
        </span>
        <span className="forks">
          <RepoForkedIcon size={16} />
          {forks}
        </span>
      </p>
    </div>
  );
}
