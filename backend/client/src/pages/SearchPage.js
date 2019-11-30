import React, { useState, useEffect } from "react";
import logoImg from "../assets/itunes-logo.png";
import { Card, Logo, Form, Input, Button, Error } from "../components/AuthForm";
import { useAuth } from "../context/auth";
import  ResultTable  from "../components/ResultTable";
import { List } from 'antd';
const axios = require("axios");

const SearchPage = props => {
  const { setAuthTokens } = useAuth();
  const [isError, setIsError] = useState(false);
  const [searchContent, setSearchContent] = useState("");
  const [popularSearches, setPopularSearches] = useState([]);
  const [resultsList, setResultsList] = useState([]);
  const [isSubmitted, setIsSubmmited] = useState(false);
  const [isShowTopSearches, setIsShowTopSearches] = useState(false);
    function search() {
      var correctSearchContent = searchContent.split(" ").join("+");
      axios.get(`http://localhost:3001/api/searches/${correctSearchContent}&limit=25`).then(result => {
        if (result.status === 200) {
          setResultsList(result.data.data);
        }
      });
    }
  function submit(){
    setIsSubmmited(true);
  } 
  useEffect(()=>{ 
    if(isSubmitted){
      search();
      setIsSubmmited(false);
    }
  }, [isSubmitted]);

  useEffect(() => {
    axios.get("http://localhost:3001/api/searches/popular", {}).then(result => {
      if (result.data.status === 200) {
        console.log(result.data);
        const popularList = result.data.data.map(({content, counter})=>({content , counter}));
        popularList.forEach(element => {
          element.content= element.content.split("+").join(" ");
        });
        setPopularSearches(popularList);
      }
    });
  }, []);

  function logOut() {
    axios.post("http://localhost:3001/api/auth/logout",{})
      .then(result => {
        if (result.status === 200) {
          setAuthTokens(result.data);
          setAuthTokens();
        }
      })
  }

  function showTopSearches(){
    setIsShowTopSearches(true);
  }
  function hideTopSearches(){
    setIsShowTopSearches(false);
  }

  return (
    <div style={{ display: "flex" }}>
      <span>
        <Button onClick={logOut}>
          Log out<i className="fas fa-sign-out-alt"></i>
        </Button>
        {!isShowTopSearches && 
          <Button onClick={showTopSearches}>Show Top 10</Button>
        }
        {isShowTopSearches &&
        <Button onClick={hideTopSearches}>Hide Top 10</Button>}
      </span>
        {isShowTopSearches && (
        <span>
          <Card>
            {popularSearches.length > 0 && (
              <List
                size="large"
                header={<h2>Top 10 searching</h2>}
                bordered
                dataSource={popularSearches}
                renderItem={item => (
                  <List.Item>
                    <List.Item.Meta
                      title={item.content}
                      description={`searched ${item.counter} times`}
                    />
                  </List.Item>
                )}
              />
            )}
          </Card>
        </span>
      )}
      <Card>
        <Logo src={logoImg} />
        <Form>
          <Input
            type="searchContent"
            onChange={e => {
              setSearchContent(e.target.value);
            }}
            placeholder="search"
          />
          <Button onClick={submit}>Submit</Button>
        </Form>

        {isError && <Error>need to provide some content!</Error>}
      </Card>
      {resultsList.length > 0 && <ResultTable data={resultsList} />}
    </div>
  );
};
export default SearchPage;
