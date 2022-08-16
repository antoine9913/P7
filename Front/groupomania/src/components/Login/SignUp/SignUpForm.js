import { useEffect, useState, useRef } from "react";
import {
  faCheck,
  faTimes,
  faInfoCircle,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { NavLink } from "react-router-dom";

import axios from "../../../api/axios";

import "./signUp.css";

const EMAIL_REGEX =
  /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
const USERNAME_REGEX = /^[A-z][A-z0-9-_]{3,23}$/;
const PASSWORD_REGEX =
  /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%*]).{8,24}$/;

const SignUpForm = () => {
  const userRef = useRef();
  const errRef = useRef();

  const [email, setEmail] = useState("");
  const [validEmail, setValidEmail] = useState(false);
  const [emailFocus, setEmailFocus] = useState(false);

  const [username, setUsername] = useState("");
  const [validUsername, setvalidUsername] = useState(false);
  const [usernameFocus, setUsernameFocus] = useState(false);

  const [password, setPassword] = useState("");
  const [validPassword, setValidPassword] = useState(false);
  const [passwordFocus, setPasswordFocus] = useState(false);

  const [matchPassword, setMatchPassword] = useState("");
  const [validMatchPassword, setValidMatchPassword] = useState(false);
  const [matchPasswordFocus, setMatchPasswordFocus] = useState(false);

  const [errMsg, setErrMsg] = useState("");

  useEffect(() => {
    userRef.current.focus();
  }, []);

  useEffect(() => {
    const result = EMAIL_REGEX.test(email);
    setValidEmail(result);
  }, [email]);

  useEffect(() => {
    const result = USERNAME_REGEX.test(username);
    setvalidUsername(result);
  }, [username]);

  useEffect(() => {
    const result = PASSWORD_REGEX.test(password);
    setValidPassword(result);
    const match = password === matchPassword;
    setValidMatchPassword(match);
  }, [password, matchPassword]);

  useEffect(() => {
    setErrMsg("");
  }, [email, username, password, matchPassword]);

  const handleRegister = async (e) => {
    e.preventDefault();

    const emailTest = EMAIL_REGEX.test(email);
    const usernameTest = USERNAME_REGEX.test(username);
    const passwordTest = PASSWORD_REGEX.test(password);
    if (!emailTest || !usernameTest || !passwordTest) {
      setErrMsg("Invalid entry");
      return;
    }
    try {
      const response = await axios.post(
        `api/users/register`,
        JSON.stringify({ email, username, password }),
        {
          mode: "no-cors",
          headers: {
            "Access-Control-Allow-Origin": "*",
            "Content-Type": "application/json",
          },
        }
      );
      if (response.data.valide) {
        window.location = "/";
      }
    } catch (err) {
      if (!err?.response) {
        setErrMsg("No server response");
      } else if (err.response?.status === 409) {
        setErrMsg("Username taken");
      } else {
        setErrMsg("Regsitraton failed");
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
        <form onSubmit={handleRegister}>
          <FontAwesomeIcon
            icon={faCheck}
            className={validEmail ? "valid" : "hide"}
          />
          <FontAwesomeIcon
            icon={faTimes}
            className={validEmail || !email ? "hide" : "invalid"}
          />
          <input
            type="text"
            id="email"
            ref={userRef}
            autoComplete="off"
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Adresse email"
            required
            aria-invalid={validEmail ? "false" : "true"}
            aria-describedby="emailnote"
            onFocus={() => setEmailFocus(true)}
            onBlur={() => setEmailFocus(false)}
          />
          <p
            id="emailnote"
            className={
              emailFocus && email && !validEmail ? "instructions" : "offscreen"
            }
          >
            <FontAwesomeIcon icon={faInfoCircle} />
            4 à 24 caractères.
            <br />
            Doit commencer par une lettre.
            <br />
            Lettres, chiffres, traits de soulignement, traits d'union autorisés.
          </p>
          <br />

          <FontAwesomeIcon
            icon={faCheck}
            className={validUsername ? "valid" : "hide"}
          />
          <FontAwesomeIcon
            icon={faTimes}
            className={validUsername || !username ? "hide" : "invalid"}
          />
          <input
            type="text"
            id="username"
            ref={userRef}
            autoComplete="off"
            onChange={(e) => setUsername(e.target.value)}
            placeholder="Nom d'Utilisateur"
            required
            aria-invalid={validUsername ? "false" : "true"}
            aria-describedby="uidnote"
            onFocus={() => setUsernameFocus(true)}
            onBlur={() => setUsernameFocus(false)}
          />
          <p
            id="uidnote"
            className={
              usernameFocus && username && !validUsername
                ? "instructions"
                : "offscreen"
            }
          >
            <FontAwesomeIcon icon={faInfoCircle} />
            4 à 24 caractères.
            <br />
            Doit commencer par une lettre.
            <br />
            Lettres, chiffres, traits de soulignement, traits d'union autorisés.
          </p>
          <br />

          <FontAwesomeIcon
            icon={faCheck}
            className={validPassword ? "valid" : "hide"}
          />
          <FontAwesomeIcon
            icon={faTimes}
            className={validPassword || !password ? "hide" : "invalid"}
          />
          <input
            type="password"
            id="password"
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Mot de passe"
            required
            aria-invalid={validPassword ? "false" : "true"}
            aria-describedby="pwdnote"
            onFocus={() => setPasswordFocus(true)}
            onBlur={() => setPasswordFocus(false)}
          />
          <p
            id="pwdnote"
            className={
              passwordFocus && !validPassword ? "instructions" : "offscreen"
            }
          >
            <FontAwesomeIcon icon={faInfoCircle} />
            8 à 24 caractères.
            <br />
            Doit inclure des lettres majuscules et minuscules, un chiffre et un
            caratère spécial.
            <br />
            Caractères spéciaux autorisés: ! @ # $ % *
          </p>
          <br />

          <FontAwesomeIcon
            icon={faCheck}
            className={validMatchPassword && matchPassword ? "valid" : "hide"}
          />
          <FontAwesomeIcon
            icon={faTimes}
            className={
              validMatchPassword || !matchPassword ? "hide" : "invalid"
            }
          />
          <input
            type="password"
            id="confirm_password"
            onChange={(e) => setMatchPassword(e.target.value)}
            placeholder="Confirmez votre mot de passe"
            required
            aria-invalid={validMatchPassword ? "false" : "true"}
            aria-describedby="confirmpwdnote"
            onFocus={() => setMatchPasswordFocus(true)}
            onBlur={() => setMatchPasswordFocus(false)}
          />
          <p
            id="confirmpwdnote"
            className={
              matchPasswordFocus && !validMatchPassword
                ? "instructions"
                : "offscreen"
            }
          >
            <FontAwesomeIcon icon={faInfoCircle} />
            Doit correspondre au premier champ de saisie du mot de passe.
          </p>

          <button
            className="SignUpButton"
            disabled={
              !validEmail ||
              !validUsername ||
              !validPassword ||
              !validMatchPassword
                ? true
                : false
            }
          >
            S'inscrire
          </button>
          <br />
          <label></label>
          <button className="SignUpButton">
            <NavLink to="/">
              <span>Déja inscrit ? connectez-vous</span>
            </NavLink>
          </button>
        </form>
      </section>
    </div>
  );
};

export default SignUpForm;
