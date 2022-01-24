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
import React from "react";
import { displayPartsToString, ImportsNotUsedAsValues } from "typescript";

import "./styles.css";

var newArr = []

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

  // All options for the lanuage select tag
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
    }
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
    }
  ];

  let languageValue = "";
  let timeValue = "daily";

  function handleChangeLanguage(e) {
    languageValue = e.target.value;
    console.log(fetchTrendingRepos(languageValue, timeValue))
    return fetchTrendingRepos(languageValue, timeValue);
  }

  function handleChangeTime(e) {
    timeValue = e.target.value;
    console.log(fetchTrendingRepos(languageValue, timeValue));
  }

  return (
    <div className="repo-filter">
      <div className="select-group">
        <FileBinaryIcon size={16} />
        <select onChange={(e) => handleChangeLanguage(e)}>
          {languageOptions.map((option) => (
            <option key={Math.random()} value={option.value}>{option.label}</option>
          ))}
        </select>
      </div>
      <div className="select-group">
        <ClockIcon size={16} />
        <select onChange={(e) => handleChangeTime(e)}>
          {timeOptions.map((option) => (
            <option key={Math.random()} value={option.value}>{option.label}</option>
          ))}
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
class RepoBoard extends React.Component {
  constructor() {
    super();

    this.state = {
      repos: {
        url: "",
        name: "",
        description: "",
        language: "",
        stars: 0,
        forks: 0
      }
    }
  }

  componentDidMount() {
    this.getRepos().then(result => this.setState({
      url: result.url,
      name: result.name,
      description: result.description,
      language: result.language,
      stars: result.stars,
      forks: result.forks
    }))
  }

  //Taking this out causes the whole thing to crash so I will leave this in here.
  getRepos() {
    return fetchTrendingRepos();
  }

  render() {
    const getRepos = async () => {
      const a = await fetchTrendingRepos();
      newArr.push(a)
    };
    getRepos()

    var finalArr = [];
    if (newArr.length > 0) {
      newArr[0].map((data) => {
        finalArr.push(data)
      });
    }

    return (
      <div className="repo-board">
        {finalArr.map((data) => (
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