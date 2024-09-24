import ReactDOM from "react-dom/client";
import "./index.css";
import { RouterProvider } from "react-router-dom";
import router from "./routes/routes";
import { Toaster } from "sonner";
import { Provider } from "react-redux";
import { store } from "./redux/store";
import { ConfigProvider } from "antd";

// Styles
import "./styles/scrollbar.css";

const theme = {
  token: {
    colorPrimary: "#2e3192",
    colorPrimaryBg: "#f2fff8",
    colorPrimaryHover: "#2e3192",
    colorLink: "#2e3192",
    colorPrimaryBgHover: "#f2fff8",
    colorBgTextActive: "#f2fff8",
    colorBgTextHover: "#f2fff8",
    tableRowHoverBg: "#2e3192",
    fontFamily: "inherit",
  },
};

ReactDOM.createRoot(document.getElementById("root")!).render(
  <Provider store={store}>
    <ConfigProvider theme={theme}>
      <RouterProvider router={router} />
    </ConfigProvider>
    <Toaster richColors expand={true} position="top-center" />
  </Provider>
);
