import { useState } from "react";
// import { useAuth } from "../context/AuthProvider";
import { supabase } from "../utils/supabase_api";

export function ConnectionPopupMenu(props) {
  // const { setAuth } = useAuth();

  const [mode, setMode] = useState("Login");

  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const dbRegister = async (mode) => {
    if (mode === "Login") {
      const { data, error } = await supabase.auth.signInWithPassword({
        email: email,
        password: password,
      });
      // alert("Logged in!");
      console.log(data, error);
    } else if (mode === "Register") {
      const { data, error } = await supabase.auth.signUp({
        email: email,
        password: password,
        options: {
          data: {
            username: username,
          },
        },
      });
      // alert("User created!");
      console.log(data, error);
    }
  };

  return (
    <div>
      <div class="popUpHeader">
        <button
          onClick={() => {
            setMode("Login");
          }}
        >
          Log in
        </button>
        <button
          onClick={() => {
            setMode("Register");
          }}
        >
          Register
        </button>
      </div>
      {mode === "Register" ? (
        <RegisterMenu
          setUsername={setUsername}
          setEmail={setEmail}
          setPassword={setPassword}
        />
      ) : (
        <LoginMenu setEmail={setEmail} setPassword={setPassword} />
      )}
      <button
        onClick={() => {
          dbRegister(mode);
        }}
      >
        {mode}
      </button>
    </div>
  );
}

function LoginMenu(props) {
  const setEmail = props.setEmail;
  const setPassword = props.setPassword;

  return (
    <div>
      <div>
        <label>Email: </label>
        <input
          onChange={(e) => {
            setEmail(e.target.value);
          }}
          placeholder="Please type email..."
        ></input>
      </div>

      <div>
        <label>Password: </label>
        <input
          onChange={(e) => {
            setPassword(e.target.value);
          }}
          placeholder="Please type password..."
        ></input>
      </div>
    </div>
  );
}

function RegisterMenu(props) {
  const setEmail = props.setEmail;
  const setPassword = props.setPassword;
  const setUsername = props.setUsername;

  return (
    <div>
      <div>
        <label>Username: </label>
        <input
          onChange={(e) => {
            setUsername(e.target.value);
          }}
          placeholder="Please type username..."
        ></input>
      </div>
      <div>
        <label>Email: </label>
        <input
          onChange={(e) => {
            setEmail(e.target.value);
          }}
          placeholder="Please type email..."
        ></input>
      </div>

      <div>
        <label>Password: </label>
        <input
          onChange={(e) => {
            setPassword(e.target.value);
          }}
          placeholder="Please type password..."
        ></input>
      </div>
    </div>
  );
}
