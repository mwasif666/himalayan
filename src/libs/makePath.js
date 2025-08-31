const makePath = (text) => {
  if (!text) return ""; // agar null/undefined ho to empty string return karo

  const pathMakeAbleText = text
    .toLowerCase()
    .split("/") // yahan optional chaining ki zaroorat nahi
    .join(" ");

  return pathMakeAbleText;
};

export default makePath;
