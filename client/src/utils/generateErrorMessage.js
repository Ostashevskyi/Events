const generateErrorMessage = (type) => {
  switch (type) {
    case "required":
      return "This field is required";
  }
};

export default generateErrorMessage;
