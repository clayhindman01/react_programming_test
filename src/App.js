/**
 * A GitHub trending repositories showcase.
 *
 * Your task is to implement this page using React.js by completing functions annotated by @todo.
 */

import {
  RepoIcon,
  StarIcon,
  RepoForkedIcon,
  ClockIcon,
  FileBinaryIcon
} from "@primer/octicons-react";

import "./styles.css";

/**
 * Get the GitHub trending repositories.
 *
 * @param {string} language the programming language of trending repository to be displayed
 * @param {string} range the time range of the trending repositories, can be daily, weekly, and monthly
 * @returns a list of GitHub trending repositories, each repository is an object in the following format
 *  {
 *    name: 'string',
 *    url: 'string',
 *    description: 'string',
 *    language: 'string',
 *    stars: 'number',
 *    forks: 'number'
 *  }
 */
async function fetchTrendingRepos(language = "", range = "daily") {
  const url = `https://my-github-trending.herokuapp.com/repo?lang=${language}&since=${range}`;
  const response = await fetch(url);
  const json = await response.json();
  const mapItemToRepo = (item) => ({
    name: item.repo,
    url: item.repo_link,
    description: item.desc,
    language: item.lang,
    stars: item.stars,
    forks: item.forks
  });
  return json.items.map(mapItemToRepo);
}

/**
 * A GitHub repository card.
 *
 * @param {string} url the repository url
 * @param {string} name the repository name
 * @param {string} description a brief description of the repository
 * @param {number} language the programming language of the repository
 * @param {number} stars number of stars of the repository
 * @param {number} forks number of forks of the repository
 * @returns the rendered repository card
 */
function RepoCard({ url, name, description, language, stars, forks }) {
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

/**
 * A repository filter lets the user select the programming language and time range of the repositories.
 *
 * @todo You should complete this React component to implement functions for select language and time range.
 * You may change the parameters and existing code of this function.
 */
function RepoFilter() {
  return (
    <div className="repo-filter">
      <div className="select-group">
        <FileBinaryIcon size={16} />
        <select>
          <option value="">All languages</option>
          <option value="c">C</option>
          <option value="java">Java</option>
          <option value="javascript">JavaScript</option>
          <option value="python">Python</option>
        </select>
      </div>
      <div className="select-group">
        <ClockIcon size={16} />
        <select>
          <option value="daily">Daily</option>
          <option value="weekly">Weekly</option>
          <option value="monthly">Monthly</option>
        </select>
      </div>
    </div>
  );
}

/**
 * A repository board that renders a list of GitHub repositories.
 *
 * @todo You should complete this React component to render a list of GitHub repositories.
 * You may change the parameters and existing code of this function.
 */
function RepoBoard({ repos = [] }) {
  return (
    <div className="repo-board">
      <RepoCard
        url="https://github.com/nexus-lab"
        name="nexus-lab/example"
        description="An example GitHub repository"
        language="Java"
        stars={999}
        forks={999}
      />
    </div>
  );
}

/**
 * The main component that renders GitHub trending repositories based-on user selections.
 *
 * @todo You should complete this React component to display trending repositories and let user select filters.
 * You may change the parameters and existing code of this function.
 */
function GitHubTrending() {
  return (
    <div>
      <RepoFilter />
      <RepoBoard />
    </div>
  );
}

/**
 * The main entry of the app.
 */
export default function App() {
  return (
    <div className="App">
      <h1 className="pagetitle">GitHub Trending</h1>
      <GitHubTrending />
    </div>
  );
}
