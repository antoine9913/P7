import React from 'react';
import { useRef, useState } from 'react';

import axios from '../../../api/axios';

import "./postForm.css"

const PostForm = () => {

const postRef = useRef();

const [title, setTitle] = useState('');
const [content, setContent] = useState('');
const [attachement, setAttachement] = useState('');

const handlePost = async (e) => {

    e.preventDefault();

    const storage = JSON.parse(localStorage.getItem('User'));
    let token = "Bearer " +  storage.token;

    try{
        const response = await axios.post(`api/post/create`,
        JSON.stringify({ title, content, attachement }),
        {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': token
            }
        }
        );
        window.location = "/home";
        console.log(response.data)
        return response.data;
    } 
    catch (err) {
        console.error(err)
}
}

    return (
        <section className='container-new-post'>
           <form>
               <input 
               type="text" 
               id='title'
               ref={postRef}
               autoComplete='off'
               onChange={(e) => setTitle(e.target.value)}
               placeholder="Titre de la publication"
               value={title}
               required
               />
               <br />
               <input 
               type="text" 
               id='content'
               ref={postRef}
               autoComplete='off'
               onChange={(e) => setContent(e.target.value)}
               placeholder="Quoi de neuf ?"
               value={content}
               required
               />
               <br />
           </form>
           <form className='form-signIn-send'>
               <input 
               type="file" 
               id='attachement'
               ref={postRef}
               autoComplete='off'
               onChange={(e) => setAttachement(e.target.value)}
               value={attachement}
               />
            <button onClick={handlePost}>
                <img className='logo-allpage' src="./images/icons/send.svg" alt="sendPost" />
            </button>
            </form>
       </section>
    );
};

export default PostForm;