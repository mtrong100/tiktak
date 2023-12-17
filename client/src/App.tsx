import { Route, Routes } from "react-router-dom";
import MainLayout from "./components/layouts/MainLayout";
import Home from "./pages/Home";
import Following from "./pages/Following";
import Explore from "./pages/Explore";
import SecondaryLayout from "./components/layouts/SecondaryLayout";
import CreatorLayout from "./components/layouts/CreatorLayout";
import Upload from "./pages/Upload";
import Manage from "./pages/Manage";

function App() {
  return (
    <Routes>
      <Route element={<MainLayout />}>
        <Route path="/" element={<Home />} />
        <Route path="/following" element={<Following />} />
      </Route>

      <Route element={<SecondaryLayout />}>
        <Route path="/explore" element={<Explore />} />
      </Route>

      <Route element={<CreatorLayout />}>
        <Route path="/creator/upload" element={<Upload />} />
        <Route path="/creator/manage" element={<Manage />} />
      </Route>
    </Routes>
  );
}

export default App;
