export const validateDate = (value) => {
  const selected = new Date(value).getFullYear();
  const now = new Date().getFullYear();
  return now - selected >= 16;
};
