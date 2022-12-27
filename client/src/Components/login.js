import React from "react";
import { auth, provider } from "../firebase.js";
import { useState } from "react";
import AppContext from "../context";
import { useContext, useEffect } from "react";
import { AiFillGoogleCircle } from "react-icons/ai";
import { useNavigate } from "react-router-dom";
const Login = () => {
  let navigate = useNavigate();
  const { loggedInUser, setLoggedInUser } = useContext(AppContext);
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [nameError, setNameError] = useState("");
  const [passwordError, setpasswordError] = useState("");
  const [emailError, setemailError] = useState("");
  const { currentUser, setCurrentUser } = useContext(AppContext);
  const [formIsValid, setFormIsValid] = useState(false);
  const [formTouched, setFormTouched] = useState(null); //
  const [buttonName, setButtonName] = useState("CREATE ACCOUNT");

  async function getOneUser(email) {
    const response = await fetch(`http://localhost:5000/users/` + email);
    if (!response.ok) {
      const message = `An error occurred: ${response.statusText}`;
      window.alert(message);
      return;
    }
    let records = await response.json();
    if (records != null) {
      console.log(JSON.stringify(records));
      console.log(
        "****************Found " + records.length + " records " + records
      );
      setCurrentUser(records);
      console.log("****************Found " + currentUser.length + " records");
    } else {
      console.log("No record in db found!");
      var user = {
        email: email,
        balance: 0,
        name: email,
        password: 'test123',
      };
      setCurrentUser(user);
      postUser(user);
    }
  }
  async function loginUsingUnamePwd(email) {
    const response = await fetch(`http://localhost:5000/users/` + email);
    if (!response.ok) {
      const message = `An error occurred: ${response.statusText}`;
      window.alert(message);
      return;
    }
    let record = await response.json();
    if (record != null) {
      console.log(JSON.stringify(record));
      console.log(
        "****************Found record for: " + record.name + "  " + record
      );
      console.log(record.password === password);
      if(record.password === password){
      setCurrentUser(record);
      setLoggedInUser(email);
      alert("User Logged in successfully!");
      navigate("/");
      }else {
        alert('Incorrect credentials , Please try again!');
      }
    } else {
      console.log("No record in db found!");
      alert('Incorrect credentials , Please try again!');
    }
  }
  async function postUser(data) {
    const settings = {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    };
    try {
      const fetchResponse = await fetch(
        `http://localhost:5000/users/add`,
        settings
      );
      const data = await fetchResponse.json();
      console.log(" DATA::::::::::::::::::::::::::::" + JSON.stringify(data));
      return data;
    } catch (e) {
      return e;
    }
  }
  // Sign in with google
  const signin = () => {
    auth.signInWithPopup(provider).then((result) => {
      console.log(result);
      if (auth.currentUser != null) {
        console.log(auth.currentUser);
        sessionStorage.setItem("loggedInUser", auth.currentUser.email);
        console.log(auth.currentUser.email + "logged in successfully!");
        setLoggedInUser(auth.currentUser.email);
        getOneUser(auth.currentUser.email);
        alert("User Logged in successfully!");
        navigate("/");
      }
    });
  };

  const logout = () => {
    auth.signOut().then((result) => {
      console.log(result);
      sessionStorage.removeItem("loggedInUser");
      setLoggedInUser(null);
    });
  };

  const handleValidation = (event) => {
    //let valid = false;
    /*if (name.length === 0) {
      //valid = false;
      setNameError(() => "Name is Required");
    } else {
      setNameError(() => "");
      //valid = true;
    }*/
    if (!email.match(/^[A-Z0-9-_%+-.]+@[A-Z0-9._]+\.[A-Z]{2,}$/i)) {
      //valid = false;
      setemailError(() => "Please enter a valid email");
    } else {
      setemailError(() => "");
      //valid = true;
    }
    if (password === null || password.length === 0 || password === "") {
      //valid = false;
      setpasswordError(() => "Password is Required");
    }/* else if (
      !password.match(
        "^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{8,})"
      )
    ) {
      //valid = false;
      setpasswordError(
        () =>
          "Length must be min 8 Charcters and Max 24 Charcters . Use atleast one capital letter , one small letter, one digit and one special character"
      );
    } */else {
      setpasswordError(() => "");
      //valid = true;
    }
  };
  useEffect(() => {
    //console.log(password);
    console.log(
      "formtouched " + formTouched,
      formIsValid,
      nameError,
      emailError,
      passwordError
    );
    if (formTouched) {
      handleValidation();
    }
    setFormIsValid(
      () => /*nameError == "" &&*/ passwordError == "" && emailError == ""
    );
    //console.log(formIsValid);
  }, [
    name,
    email,
    password,
    nameError,
    emailError,
    passwordError,
    handleValidation,
  ]);

  const loginSubmit = (e) => {
    e.preventDefault();
    console.log(formIsValid);
    if (formIsValid) {
      /*var user_list = user;
      user_list.push({
        name: name,
        email: email,
        password: password,
        balance: 0,
      });
      setUser(user_list);*/
      loginUsingUnamePwd(email);
    }
    //alert("Successfully Created Account");
    e.target.reset();
    //setButtonName(() => "ADD ANOTHER ACCOUNT");
  };

  return (
    <div id="mainCreateAccount">
      <h1>LOGIN</h1>
      <div
        className="App"
        style={{ marginLeft: "0px", width: "30%", backgroundColor: "darkgray" }}
      >
        <div className="container">
          <div className="row d-flex">
            <div
              className="col-md-4"
              style={{ width: "100%", height: "300px" }}
            >
              <form id="loginform" onSubmit={loginSubmit}>
                <div
                  className="form-group"
                  style={{ marginLeft: "0px", width: "100%" }}
                >
                  <label>EMAIL ADDRESS</label>
                  <input
                    type="email"
                    className="form-control"
                    id="EmailInput"
                    name="EmailInput"
                    aria-describedby="emailHelp"
                    placeholder="Enter email"
                    onChange={(event) => {
                      setEmail(() => event.target.value);
                      handleValidation(event);
                      setFormTouched(() => true);
                    }}
                  />
                  <small id="emailHelp" className="text-danger form-text">
                    {emailError}
                  </small>
                </div>
                <div className="form-group">
                  <label>PASSWORD</label>
                  <input
                    type="password"
                    className="form-control"
                    id="exampleInputPassword1"
                    placeholder="Password"
                    onChange={(event) => {
                      setPassword(() => event.target.value);
                      handleValidation(event);
                      setFormTouched(() => true);
                    }}
                  />
                  <small id="passworderror" className="text-danger form-text">
                    {passwordError}
                  </small>
                </div>
                <button
                  type="submit"
                  className="btn btn-primary"
                  style={{ marginTop: "10px" }}
                  //disabled={formTouched===null?true:!formIsValid}
                >
                  LOGIN
                </button>

                {/*<button
                  id="addOtherAccountBtn"
                  type="submit"
                  className="btn btn-primary"
                  style={{ marginTop: "10px", display: "none" }}
                  //onClick={navigate("/createAccount")}
                >
                  ADD ANOTHER ACCOUNT
                  </button>*/}
              </form>
              <center>
                <button
                  className="btn btn-primary"
                  style={{ marginTop: "10px" }}
                  onClick={signin}
                >
                  <AiFillGoogleCircle icon="check-square" size={20} /> Sign In with Google
                </button>
              </center>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
