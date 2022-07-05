import React, { useEffect, useState } from 'react';
import Moment from 'react-moment';

import axios from '../../../api/axios';
import DeleteComment from '../DeleteComment/DeleteComment';

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

    return (
        <div>
            {comments.map((comment, index) => (
                <div key={index} className="comments">
                <div className='posts-user-container'>
                    <img className='posts-user-avatar' src={comment.User.avatar} alt="avatar" />
                    <h1 className='posts-user-username'>{comment.User.username}</h1>
                        <div className='post-user-timestamp'>
                            <h3 key={"date" + comment.id}>Publié le <Moment key={"date" + comment.id} format="DD MMM YYYY" date={comment.createdAt} /></h3>
                            <br />
                            <h3 key={"date" + comment.id}> à <Moment key={"date" + comment.id} format="HH:mm:ss" date={comment.createdAt} /></h3>
                        </div>
                 </div>
                    <div className='comment-container'>
                        <p className='comment-content'>{comment.content}</p>
                    </div>
                    <DeleteComment id= {comment.id}/>
                </div>
            ))}
        </div>
    );
};

export default Comment;