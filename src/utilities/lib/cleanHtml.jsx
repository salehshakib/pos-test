export function cleanHtmlData(data) {
  // Replace escaped '<' and '>' characters with their unescaped counterparts
  return data
    .replace(/\\</g, "<") // Replace '\<' with '<'
    .replace(/\\>/g, ">") // Replace '\>' with '>'
    .replace(/\\r\\n/g, "") // Remove escaped newlines
    .replace(/\\n/g, "") // Remove escaped newlines
    .replace(/\\t/g, "") // Remove escaped tabs
    .replace(/\\/g, ""); // Remove any remaining backslashes
}
