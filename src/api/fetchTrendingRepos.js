export default async function fetchTrendingRepos(
  language = "",
  range = "daily"
) {
  const url = `https://my-github-trending.herokuapp.com/repo?lang=${language}&since=${range}`;
  const response = await fetch(url);
  const json = await response.json();
  const mapItemToRepo = (item) => ({
    name: item.repo,
    url: item.repo_link,
    description: item.desc,
    language: item.lang,
    stars: item.stars,
    forks: item.forks,
  });
  return json.items.map(mapItemToRepo);
}
