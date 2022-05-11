import { useRef, useState, useEffect, useContext } from 'react';
import AuthContext from '../../context/AuthProvider';

import axios from '../../api/axios';

const SignInForm = () => {
    const { setAuth } = useContext(AuthContext);
    const userRef = useRef();
    const errRef = useRef();


    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [errMsg, setErrMsg] = useState('');

    useEffect(() => {
        userRef.current.focus();
    }, [])

    useEffect(() => {
        setErrMsg('');
    }, [email, password])


    const handleLogin = async (e) => {

        e.preventDefault();

        try{
            const response = await axios.post(`api/users/login`, 
            JSON.stringify({ email, password}), 
            {
                mode: 'no-cors',
                headers: {
                  'Access-Control-Allow-Origin': '*',
                  'Content-Type': 'application/json',
                }
            }
            );
            // window.location = "/publication";
            console.log(JSON.stringify(response?.data));
            const accessToken = response?.data?.Token;
            const isAdmin = response?.data?.isAdmin;
            setAuth({ email, password, isAdmin, accessToken });
            setEmail('');
            setPassword('');
        } 
        catch (err) {
        if(!err?.response) {
            setErrMsg('No server response');
        } else if (err.response?.status === 400) {
            setErrMsg('Missing email or password');
        } else if (err.response?.status === 401) {
            setErrMsg('Unauthorized');
        } else {
            setErrMsg('Login failed');
        }
        errRef.current.focus();
    }
}

    return (
       <section>
           <p ref={errRef} className={errMsg ? "errmsg" : "offscreen"} aria-live="assertive">{errMsg}</p>
           <h1>se connecter</h1>
           <br />
           <form onSubmit={handleLogin}>
               <label htmlFor="email">Email</label>
               <input 
               type="text" 
               id='email'
               ref={userRef}
               autoComplete='off'
               onChange={(e) => setEmail(e.target.value)}
               value={email}
               required 
               />
               <br />
               <label htmlFor="password">Mot de passe</label>
               <input 
               type="password" 
               id='password'
               onChange={(e) => setPassword(e.target.value)}
               value={password}
               required 
               />
               <button>Se connecter</button>
               <br />
               <button>
                   <a href="/register">Créer un nouveau compte</a>
                </button>
           </form>
       </section>
    );
};

export default SignInForm;