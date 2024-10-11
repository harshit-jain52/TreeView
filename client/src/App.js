import Home from "./pages/Home";
import ViewItem from "./pages/ViewItem";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Stack } from "@chakra-ui/react";
import Navbar from "./components/Navbar";

const App = () => {
  return (
    <Stack h="100vh">
      <Navbar />
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/viewitem/:id" element={<ViewItem />} />
        </Routes>
      </Router>
    </Stack>
  );
};

export default App;
