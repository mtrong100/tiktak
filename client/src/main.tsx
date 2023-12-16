import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./globals.css";
import { ThemeProvider } from "./components/theme-provider.tsx";
import { Toaster } from "./components/ui/toaster.tsx";
import { BrowserRouter } from "react-router-dom";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <BrowserRouter>
    <ThemeProvider>
      <App />
      <Toaster />
    </ThemeProvider>
  </BrowserRouter>
);
