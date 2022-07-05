import React from 'react';
import PostForm from './NewPost/PostForm';
import AllPost from './AllPost/AllPost';
import './thread.css'

const Thread = () => {
    return (
        <div className='container-thread'>
        <img className="img-logo" src="../images/icon.svg" alt="logo background" />
            <PostForm />
            <AllPost />
        </div>
    );
};

export default Thread;