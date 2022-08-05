import { useRef, useState, useEffect } from "react";
import { NavLink } from "react-router-dom";

import axios from "../../../api/axios";

import "./signIn.css";

const SignInForm = () => {
  const userRef = useRef();
  const errRef = useRef();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errMsg, setErrMsg] = useState("");

  useEffect(() => {
    userRef.current.focus();
  }, []);

  useEffect(() => {
    setErrMsg("");
  }, [email, password]);

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        `api/users/login`,
        JSON.stringify({ email, password }),
        {
          mode: "no-cors",
          headers: {
            "Access-Control-Allow-Origin": "*",
            "Content-Type": "application/json",
          },
        }
      );
      window.location = "/home";
      localStorage.setItem("User", JSON.stringify(response.data));
      return response.data;
    } catch (err) {
      if (!err?.response) {
        setErrMsg("No server response");
      } else if (err.response?.status === 400) {
        setErrMsg("Missing email or password");
      } else if (err.response?.status === 401) {
        setErrMsg("Unauthorized");
      } else {
        setErrMsg("Login failed");
      }
      errRef.current.focus();
    }
  };

  return (
    <div className="container">
      <img
        className="img-logo"
        src="../images/icon.svg"
        alt="logo background"
      />
      <section className="container-connexion">
        <p
          ref={errRef}
          className={errMsg ? "errmsg" : "offscreen"}
          aria-live="assertive"
        >
          {errMsg}
        </p>
        <form onSubmit={handleLogin}>
          <input
            type="text"
            id="email"
            ref={userRef}
            autoComplete="off"
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Adresse email"
            value={email}
            required
          />
          <br />
          <input
            type="password"
            id="password"
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Mot de passe"
            value={password}
            required
          />
          <button className="SignInButton">Se connecter</button>
          <br />
          <label htmlFor=""></label>
          <button className="SignInButton">
            <NavLink to="/register">
              <span>Créer un nouveau compte</span>
            </NavLink>
          </button>
        </form>
      </section>
    </div>
  );
};

export default SignInForm;
