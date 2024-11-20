import { useEffect } from "react";
import { Route, Routes } from "react-router-dom";
import Header from "./components/Header";
import Sidebar from "./components/Sidebar";
import Home from "./pages/Home";
import SearchResultsPage from "./pages/SearchResultsPage";
import VideoDetailsPage from "./pages/VideoDetailsPage";
import { useQueryContext } from "./contexts/QueryContext";

const App = () => {
  const { setShowSidebar, showSidebar } = useQueryContext();
  useEffect(() => {
    if (showSidebar) {
      document.body.classList.add(
        "fixed",
        "top-0",
        "left-0",
      );
    } else {
      document.body.classList.remove(
        "fixed",
        "top-0",
        "left-0",
      );
    }
  }, [showSidebar]);
  return (
    <main className={`mt-24`}>
      <Sidebar showSidebar={showSidebar} setShowSidebar={setShowSidebar} />
      <Header setShowSidebar={setShowSidebar} />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/watch" element={<VideoDetailsPage />} />
        <Route path="/results" element={<SearchResultsPage />} />
      </Routes>
      <div
        className={`${
          showSidebar ? "block" : "hidden"
        } fixed top-0 left-0 w-full h-full bg-black opacity-50 z-30`}
        onClick={() => setShowSidebar(false)}
      ></div>
    </main>
  );
};

export default App;
