import React, { useState } from "react";
import { Link, Redirect } from "react-router-dom";
import logoImg from "../assets/anyvision-logo.png";
import { Card, Logo, Form, Input, Button, Error } from "../components/AuthForm";
import axios from "axios";


function Signup() {
      const [isSignUp, setIsSignUp] = useState(false);
      const [isError, setIsError] = useState(false);
      const [errorContent, setErrorContent]= useState('')
      const [email, setEmail] = useState("");
      const [password, setPassword] = useState("");
      const [firstname, setFirstName] = useState("");
      const [lastname, setLastName] = useState("");
      const [username, setUserName] = useState("");
      const [phoneNumber, setPhoneNumber] = useState("");

      
    function postSignup() {
      if(!email || !password || !firstname || !lastname){
        setIsError(true);
        setErrorContent('missing one or more property, check you form please');
        
      }
      else{
        axios.post("http://localhost:3001/api/auth/signup", {firstname, lastname, username, phoneNumber, email, password })
          .then(result => {
            if (result.data.status === 201) {
              setIsSignUp(true)
            } else {
              setIsError(true);
              setErrorContent(result.data.data);
            }
          })
          .catch(e => {
            setIsError(true);
          });
      }
    }
    if (isSignUp) {
      return <Redirect to={"/login"} />;
    }
  return (
    <Card>
      <Logo src={logoImg} />
      <Form>
        <Input type="first_name" onChange={e => {setFirstName(e.target.value);}} placeholder="first name" />
        <Input type="last_name" onChange={e => {setLastName(e.target.value);}} placeholder="last name" />
        <Input type="username" onChange={e => {setUserName(e.target.value);}} placeholder="username" />
        <Input type="phone_number" onChange={e => {setPhoneNumber(e.target.value)}} placeholder="phone number" />
        <Input type="email" onChange={e => {setEmail(e.target.value)}} placeholder="email" />
        <Input type="password" onChange={e => {setPassword(e.target.value);}}placeholder="password" />        
        {isError &&
        <Error>{errorContent}</Error> }

        <Button onClick={postSignup}>Sign Up</Button>
      </Form>
      <Link to="/login">Already have an account?</Link>
    </Card>
  );
}

export default Signup;
