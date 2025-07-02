export function extractNamesFromText(text: string): string[] {
  const keywords = ["herr", "herrn", "frau", "bewohner", "bewohnerin"];
  const words = text.split(/\s+/); // Split by whitespace
  const results: string[] = [];

  for (let i = 0; i < words.length; i++) {
    const word = words[i].toLowerCase().replace(/[.,!?;]/g, ""); // remove punctuation
    if (keywords.includes(word)) {
      const nextWord = words[i + 1];
      const secondNextWord = words[i + 2];
      if (nextWord && secondNextWord) {
        results.push(`${nextWord} ${secondNextWord}`);
      }
    }
  }

  return results;
}
