import React, { useState } from 'react';

import axios from '../../../api/axios';
import "./updateProfil.css"

const UpdateProfil = () => {

    const [avatar, setAvatar] = useState('');
    const [bio, setBio] = useState('');

    const storage = JSON.parse(localStorage.getItem('User'));
    let token = "Bearer " +  storage.token;


    console.log(token)

const HandleUpdateProfil = async (e) => {

    e.preventDefault();

    try{
            const usersData = await axios.put(`api/users/profile/${storage.userId}`, 
            JSON.stringify(storage.avatar,storage.bio),
            {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': token
                }
            })
            console.log(usersData.data)
            return usersData.data;
        } catch (err) {
            return err
        }
    };

    return (
        <form onSubmit={HandleUpdateProfil}>
        <input 
        type="text" 
        id='avatar'
        autoComplete='off'
        onChange={(e) => setAvatar(e.target.value)}
        placeholder="Avatar"
        value={avatar}
        />
        <br />
        <input 
        type="text" 
        id='bio'
        autoComplete='off'
        onChange={(e) => setBio(e.target.value)}
        placeholder="Bio"
        value={bio}
        />
        <img src="../images/icons/send.svg" alt="edit" onClick={HandleUpdateProfil}/>
        </form>
    );
};


export default UpdateProfil;