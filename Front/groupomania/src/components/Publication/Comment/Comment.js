import React, { useEffect, useState } from 'react';
import Moment from 'react-moment';

import { faAngleDown, faHouse, faUser } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import axios from '../../../api/axios';
import DeleteComment from '../DeleteComment/DeleteComment';

import './comment.css'

const Comment = (post) => {
    
    const [comments, setComments] = useState([]);

    useEffect(() => {
        const fetchComment = async () => {
            try {
                const commentsData = await axios.get(`api/comment/${post.post.id}/comment`,
                {
                    headers: {
                        'Content-Type': 'application/json',
                    }
                });
                console.log(commentsData.data)
                setComments(commentsData.data);
            } catch (err) {}
        };
        fetchComment();
    },[]);  

    const [isShown, setIsShown] = useState(false);

  const handleClick = event => {
    setIsShown(current => !current);
  };

    return (
        <div className='comments-container'>
            <button onClick={handleClick}>
                <FontAwesomeIcon icon={faAngleDown} className='comment-scrolling-svg'/>
            </button>
            {isShown && (
                <section className='section-comments'>
                {comments.map((comment, index) => (
                <div key={index} className="comments">
                <div className='posts-user-container'>
                    <img className='posts-user-avatar' crossorigin="anonymous" src={comment.User.avatar} alt="avatar" />
                    <h1 className='posts-user-username'>{comment.User.username}</h1>
                        <div className='post-user-timestamp'>
                            <h3 className='date' key={"date" + comment.id}>Publié le <Moment key={"date" + comment.id} format="DD MMM YYYY" date={comment.createdAt} /></h3>
                            <br />
                            <h3 className='date' key={"date" + comment.id}> à <Moment key={"date" + comment.id} format="HH:mm:ss" date={comment.createdAt} /></h3>
                        </div>
                 </div>
                    <div className='comment-container'>
                        <p className='comment-content'>{comment.content}</p>
                    </div>
                    <DeleteComment id= {comment.id}/>
                </div>
            ))}
            </section>
            )}
        </div>
    );
}

export default Comment;