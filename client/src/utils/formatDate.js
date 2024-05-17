export const formatDate = (date) => {
  return date.split("T").slice(0, 1).join();
};
