import React from 'react';
import axios from '../../../api/axios';

const DeleteComment = (id) => {

    const storage = JSON.parse(localStorage.getItem('User'));
    let token = "Bearer " +  storage.token;
    
    const HandleDeleteComment = async (e) => {

        e.preventDefault();

        try{
                const deleteCommentData = await axios.delete(`api/comment/${id.id}/comment`, 
                {
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': token
                    }
                });
                window.location = '/home';
                return deleteCommentData;
            } catch (err) {
                return err
            }
        };

    return (
        <button onClick={HandleDeleteComment}>
        <img className='logo-allpage' src="../images/icons/trash.svg" alt="trash"/>
        </button>
    );
};

export default DeleteComment;