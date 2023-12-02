export const validateUsername = (username) => {
  const regex = /^[a-zA-Z][a-zA-Z0-9.-_]{2,28}[a-zA-Z0-9]$/;
  const startsWithNumber = /^\d/.test(username);
  const endsWithNumber = /\d$/.test(username);
  const isValid = regex.test(username) && !startsWithNumber && !endsWithNumber;
  return isValid;
};
