const slugify = (text) => {
    return text
      .toString()
      .toLowerCase()
      .trim()
      .replace(/[\s\W-]+/g, "-")   // space & special char → -
      .replace(/^-+|-+$/g, "");   // start/end dash remove
  };
  
  export default slugify;
  