export function replaceHtmlEntities(text: string) {
  return text.replaceAll("&amp;", "&").replaceAll("&#x27;", "'");
}
