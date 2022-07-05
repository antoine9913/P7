import React from 'react';
import axios from '../../../api/axios';

const EditPost = (id) => {

    const storage = JSON.parse(localStorage.getItem('User'));
    let token = "Bearer " +  storage.token;
    
    const HandleEditPost = async (e) => {

        e.preventDefault();

        try{
                const EditPostData = await axios.put(`api/post/update/${id.id}`, 
                {
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': token
                    }
                });
                console.log(EditPostData)
                return EditPostData;
            } catch (err) {
                return err
            }
        };

    return (
        <button onClick={HandleEditPost}>
            <img className='logo-allpage' src="./images/icons/edit.svg" alt="editpost" />
        </button>
    );
};

export default EditPost;