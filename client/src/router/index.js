import App from "../App";
import Register from "../pages/Register";

const { createBrowserRouter } = require("react-router-dom");

export const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
  },
  {
    path: "/register/:event",
    element: <Register />,
  },
]);
