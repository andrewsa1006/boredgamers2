export const unescapeHTML = (escapedHTML) => {
  return escapedHTML
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&amp;/g, "&");
};

export const clearHTMLTags = (strToSanitize) => {
  return strToSanitize.replace(/(<([^>]+)>)/gi, "");
};
