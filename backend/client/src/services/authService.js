const axios = require("axios");
import { useAuth } from "../context/auth";

const authService = props =>{
    logOut = () => {
      axios
        .post("http://localhost:3001/api/auth/logout", {})
        .then(result => {
          if (result.status === 200) {
            setAuthTokens(result.data);
            setAuthTokens();
          }
        })
        .catch(e => {});
    }

};

export default new authService ()