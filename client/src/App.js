import "./App.css";
import { useState, useEffect } from "react";
import Axios from "axios";

function App() {
  const [password, setPassword] = useState("");
  const [title, setTitle] = useState("");
  const [passwordlist, setpasswordlist] = useState([]);

  useEffect(() => {
    Axios.get("http://localhost:5000/showpasswords").then((response) => {
      setpasswordlist(response.data);
    });
  }, []);

  const addPassword = () => {
    Axios.post("http://localhost:5000/addpassword", {
      password: password,
      title: title,
    });
  };

  const decryption = (encryption) => {
    Axios.post("http://localhost:5000/decryptpassword", {
      password: encryption.password,
      iv: encryption.iv,
    }).then((response) => {
      setpasswordlist(
        passwordlist.map((val) => {
          return val.id === encryption.id
            ? {
                id: val.id,
                password: val.password,
                title: response.data,
                iv: val.iv,
              }
            : val;
        })
      );
    });
  };
  return (
    <div className="App">
      <div className="AddingPassword">
        <input
          type="text"
          placeholder="Password"
          onChange={(event) => {
            setPassword(event.target.value);
          }}
        />
        <input
          type="text"
          placeholder="Facebook"
          onChange={(event) => {
            setTitle(event.target.value);
          }}
        />
        <button onClick={addPassword}>Add Password</button>
      </div>

      <div className="Showpassword">
        {passwordlist.map((val) => {
          return (
            <div className="main">
              <div
              className="password"
              
            >
              <h3>{val.title}</h3>
             
            </div>
             <button className="show" onClick={() => {
                decryption({ password: val.password, iv: val.iv, id: val.id });
              }}>Show password</button>
            </div>
            
          );
        })}
      </div>
    </div>
  );
}

export default App;
