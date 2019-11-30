import React, { useState } from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import SearchPage from "./pages/SearchPage";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import { AuthContext } from "./context/auth";
import PrivateRoute from "./PrivateRoute";
import DetailsPage from "./pages/DetailsPage";

function App(props) {
  const [authTokens, setAuthTokens] = useState();
  const setTokens = data => {
    localStorage.setItem("tokens", JSON.stringify(data));
    setAuthTokens(data);
  };


  return (
    <AuthContext.Provider value={{ authTokens, setAuthTokens: setTokens }}>
      <Router>
        <div>
          <Route exact={true} path="/" component={Login} />
          <Route exact={true} path="/login" component={Login} />
          <Route path="/signup" component={Signup} />
          <PrivateRoute exact path="/searches" component={SearchPage} />
          <PrivateRoute exact path="/details" component={DetailsPage} />
        </div>
      </Router>
    </AuthContext.Provider>
  );
}

export default App;
