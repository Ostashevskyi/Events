const generateErrorMessage = (type) => {
  switch (type) {
    case "required":
      return "This field is required";
    case "pattern":
      return "Invalid value";
    case "validate":
      return "You must be older than 16 y.o";
  }
};

export default generateErrorMessage;
