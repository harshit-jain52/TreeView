import Home from "./pages/Home";
import ViewItem from "./pages/ViewItem";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/viewitem/:id" element={<ViewItem />} />
      </Routes>
    </Router>
  );
};

export default App;
