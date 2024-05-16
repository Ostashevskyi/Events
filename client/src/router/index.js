import App from "../App";

const { createBrowserRouter } = require("react-router-dom");

export const router = createBrowserRouter([
    {
      path: "/",
      element: <App/>,
    },
]);
