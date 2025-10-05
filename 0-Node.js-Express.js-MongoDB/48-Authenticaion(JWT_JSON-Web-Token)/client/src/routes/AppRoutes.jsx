import { BrowserRouter, Route, Routes } from "react-router-dom";


import Register from "../pages/Register";
import Login from "../pages/Login";
import Profile from "../pages/Profile"; 
import RouteError from "../pages/RouteError";
import NavBar from "../components/NavBar";

const AppRoutes = () => {
  return (
    <>
      <BrowserRouter>
        <NavBar></NavBar>
        <Routes>
          <Route path="/" element={<Register></Register>}></Route>
          <Route path="/login" element={<Login></Login>}></Route>
          <Route path="/profile" element={<Profile></Profile>}></Route>
          <Route path="*" element={<RouteError></RouteError>}></Route>
        </Routes>
      </BrowserRouter>
    </>
  );
};

export default AppRoutes;
