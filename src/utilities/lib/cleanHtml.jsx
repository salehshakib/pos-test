export function cleanHtmlData(data) {
  // Replace escaped '<' and '>' characters with their unescaped counterparts
  return data
    ? data
        .replace(/\\</g, "<") // Replace '\<' with '<'
        .replace(/\\r\\n/g, "") // Remove escaped newlines
    : // .replace(/\\>/g, ">") // Replace '\>' with '>'
      // i want to replace newline with > with only >

      // .replace(/\\n/g, "") // Remove escaped newlines
      // .replace(/\\t/g, "") // Remove escaped tabs
      // .replace(/\\/g, "")
      ""; // Remove any remaining backslashes
}
