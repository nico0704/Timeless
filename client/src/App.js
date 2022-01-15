import React, { Fragment, useEffect } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Navbar from "./components/layout/Navbar";
import Landing from "./components/layout/Landing";
import Login from "./components/auth/Login";
import Register from "./components/auth/Register";
import Alert from "./components/layout/Alert";
import Dashboard from "./components/dashboard/Dashboard";
import CreateProfile from "./components/profile-forms/CreateProfile";
import AddExperience from "./components/profile-forms/AddExperience";
import SingleExperience from "./components/dashboard/SingleExperience";
import { loadUser } from "./actions/auth";
import PrivateRoute from "./components/routing/PrivateRoute";
import setAuthToken from "./utils/setAuthToken";
import { LOGOUT } from "./actions/types";

// redux
import store from "./store";
import { Provider } from "react-redux";

// css
import "./App.css";

const App = () => {
  useEffect(() => {
    // check for token in LS when app first runs
    if (localStorage.token) {
      // if there is a token set axios headers for all requests
      setAuthToken(localStorage.token);
    }
    // try to fetch a user, if no token or invalid token we
    // will get a 401 response from our API
    store.dispatch(loadUser());

    // log user out from all tabs if they log out in one tab
    window.addEventListener("storage", () => {
      if (!localStorage.token) store.dispatch({ type: LOGOUT });
    });
  }, []);
  return (
    <Provider store={store}>
      <Router>
        <Navbar />
        <Alert />
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="login" element={<Login />} />
          <Route path="register" element={<Register />} />
          <Route
            path="dashboard"
            element={<PrivateRoute component={Dashboard} />}
          />
          <Route
            path="create-profile"
            element={<PrivateRoute component={CreateProfile} />}
          />
          <Route
            path="add-experience"
            element={<PrivateRoute component={AddExperience} />}
          />
          <Route
            path="profile/experience/:id"
            element={<PrivateRoute component={SingleExperience} />}
          />
        </Routes>
      </Router>
    </Provider>
  );
};

export default App;
