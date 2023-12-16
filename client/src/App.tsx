import { Route, Routes } from "react-router-dom";
import MainLayout from "./components/layouts/MainLayout";
import { Home } from "lucide-react";

function App() {
  return (
    <Routes>
      <Route element={<MainLayout />}>
        <Route path="/" element={<Home />} />
      </Route>
    </Routes>
  );
}

export default App;
