import React from "react";

const AppContext = React.createContext({
  allUsers: null,
  setAllUsers: () => {},
  currentUser : null,
  setCurrentUser : () => {},
  loggedInUser: null,
  setLoggedInUser: () =>{},
  totalAmount:0,
  setTotalAmount: () =>{}
});

export default AppContext;