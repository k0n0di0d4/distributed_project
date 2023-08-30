import React, {useState} from "react";

const Login = () => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [jwt, setJwt] = useLocalState("", "jwt");

    function sendLoginRequest () {
        console.log("xD");
    }

    return (
      <>
          <div>
              <label htmlFor="username">Username</label>
              <input type="email" id="username" value={username} onChange={e => setUsername(e.target.value)}/>
          </div>
          <div>
              <label htmlFor="password">Password</label>
              <input type="password" id="password" value={password} onChange={e => setPassword(e.target.value)}/>
          </div>
          <div>
              <button id={"submit"} type={"button"} onClick={() => sendLoginRequest()}>Login</button>
          </div>
      </>
    );
};

export default Login;