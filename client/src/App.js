import Home from "./pages/Home";
import ViewItem from "./pages/ViewItem";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Stack } from "@chakra-ui/react";
import Navbar from "./components/Navbar";
import PrivateRoutes from "./utils/PrivateRoutes";
import Login from "./pages/Login";
import Register from "./pages/Register";

export const BASE_URL = process.env.REACT_APP_API_URL;

const App = () => {
  return (
    <Router>
      <Stack h="100vh">
        <Navbar />
        <Routes>
          <Route element={<PrivateRoutes redirectPath="/login" />}>
            <Route path="/" element={<Home />} />
            <Route path="/viewitem/:id" element={<ViewItem />} />
          </Route>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
        </Routes>
      </Stack>
    </Router>
  );
};

export default App;
