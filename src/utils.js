import duckduckgoSearch from "duckduckgo-search";

export default async function searchContext(question) {
  // Text search
  const answers = [];
  for await (const result of duckduckgoSearch.text(question)) {
    answers.push(result);
    if (answers.length > 10) {
      break;
    }
  }
  return answers;
}
