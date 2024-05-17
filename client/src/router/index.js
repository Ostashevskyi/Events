import App from "../App";
import Register from "../pages/Register";
import View from "../pages/View";

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
  {
    path: "/view/:event",
    element: <View />,
  },
]);
