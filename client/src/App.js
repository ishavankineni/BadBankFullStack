//import logo from "./logo.svg";
import "./App.css";
import NavBar from "./Components/NavBar";
import { BrowserRouter, Routes, Route ,Outlet } from "react-router-dom";
import Home from "./Components/Home";
import AllData from "./Components/AllData";
import Deposit from "./Components/Deposit";
import CreateAccount from "./Components/CreateAccount";
import Withdraw from "./Components/Withdraw";
import LoginOrSignUp from "./Components/LoginOrSignUp";
import Login from "./Components/login";
//import Balance from "./Components/Balance";
import { useState, React } from 'react';
import AppContext from "./context";
function App() {
  const [allUsers, setAllUsers] = useState([/*{
    name : 'Isha Vankineni',
    email: 'isha@gmail.com',
    password: 'password',
    balance: 100
  }*/]);
  const [currentUser, setCurrentUser] = useState([{}]);
  const [loggedInUser , setLoggedInUser]= useState(null);
  const [totalAmount , setTotalAmount]= useState(0);
  return (
    <main>
      <AppContext.Provider value={{
        allUsers,
        setAllUsers,
        currentUser,
        setCurrentUser,
        loggedInUser,
        setLoggedInUser,
        totalAmount,
        setTotalAmount
        }}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<Home />} />
            <Route path="/createAccount" element={<CreateAccount />} />
            <Route path="/deposit" element={<Deposit />} />
            <Route path="/withdraw" element={<Withdraw />} />
            <Route path="/alldata" element={<AllData />} />
            <Route path="/loginOrSignUp" element={<LoginOrSignUp/>} />
            <Route path="/login" element={<Login/>} />
          </Route>
        </Routes>
      </BrowserRouter>
      </AppContext.Provider>
    </main>
  );
}
const Layout = () => {
  return <div><NavBar/><Outlet/></div>;
};

export default App;
