import React, { useRef, useState } from 'react';

import axios from '../../../api/axios';

const NewComment = (id) => {

const commentRef = useRef();

const [content, setContent] = useState('');

    const handleComment = async (e) => {

        e.preventDefault();
    
        const storage = JSON.parse(localStorage.getItem('User'));
        let token = "Bearer " +  storage.token;
    
        try{
            const response = await axios.post(`api/comment/${id.id}/comment`,
            JSON.stringify({ 
                content:content,
                id: storage.userId
            }),
            {
                headers: {
                    'Content-Type': 'application/json',
                }
            }
            );
            console.log(content)
            window.location = '/home';
            return response.data;
        } 
        catch (err) {
            console.error(err)
    }
}
    return (
        <div>
    <div className="posts-comment-container">
        <input 
               type="text" 
               id='content'
               ref={commentRef}
               autoComplete='off'
               onChange={(e) => setContent(e.target.value)}
               placeholder="dites nous ce que vous en pensez"
               value={content}/>
        <img className='logo-allpage' src="./images/icons/send.svg" alt="sendPost" onClick={handleComment}/>
    </div>
</div>
    );
};

export default NewComment;