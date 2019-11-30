import React, { useState } from "react";
import { Link, Redirect } from "react-router-dom";
import axios from "axios";
import logoImg from "../assets/anyvision-logo.png";
import { Card, Logo, Form, Input, Button, Error } from "../components/AuthForm";
import { useAuth } from "../context/auth";
import get from 'lodash/get';
function Login(props) {
    const [isLoggedIn, setLoggedIn] = useState(false);
    const [isError, setIsError] = useState(false);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const { setAuthTokens } = useAuth();
    
    function postLogin() {
      axios.post("http://localhost:3001/api/auth/login", {email, password})
      .then(result => {
        if (result.data.status === 200) {
          setAuthTokens(result.data);
          setLoggedIn(true);
        } else {
          setIsError(true);
        }
      })
      .catch(e => {
        setIsError(true);
      });
    }

    function getReferer() {
      const pathname = get(props.location, "pathname");
      if (pathname !== '/login') {
        return get(props, 'location.state.referer') || '/searches'
      } else {
        return '/searches'
      }
    }

      const referer = getReferer()
      if (isLoggedIn) {
        return <Redirect to={referer} />;
      }

  return (
    <Card>
      <Logo src={logoImg} />
      <Form>
        <Input type="email" onChange={e => {setEmail(e.target.value)}} placeholder="email" />
        <Input type="password" onChange={e => {setPassword(e.target.value)}} placeholder="password" />
        <Button onClick={postLogin}>Sign In</Button>
      </Form>
      <Link to="/signup">Don't have an account?</Link>
        
        {isError &&
        <Error>The email or password provided were incorrect!</Error> }
    </Card>
  );
}

export default Login;
