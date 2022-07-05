import React from 'react';

import axios from '../../../api/axios';

const DeleteProfil = () => {

    const storage = JSON.parse(localStorage.getItem('User'));
    let token = "Bearer " +  storage.token;
    
    const HandleDeleteProfil = async (e) => {

        e.preventDefault();

        try{
                const usersData = await axios.delete(`api/users/profile/${storage.userId}`, 
                {
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': token
                    }
                });
                console.log(usersData.data)
                localStorage.clear()
                window.location = '/';
                return usersData.data;
            } catch (err) {
                return err
            }
        };

    return (
        <img src="../images/icons/trash.svg" alt="trash" onClick={HandleDeleteProfil}/>
    );
};

export default DeleteProfil;