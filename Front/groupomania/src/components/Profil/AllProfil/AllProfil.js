import React, { useEffect} from 'react';

import axios from '../../../api/axios';
import NavBarHome from '../../Layout/Header/NavBarHome';
import LeftNav from '../../Layout/LeftBarNav/LeftNav';
import DeleteProfil from '../DeleteProfil/DeleteProfil';
import UpdateProfil from '../UpdateProfil/UpdateProfil';

import "./allProfil.css"

const AllProfil = () => {

    const storage = JSON.parse(localStorage.getItem('User'));
    let token = "Bearer " +  storage.token;
    
    useEffect(() => {
        const fetchProfil = async () => {
            try {
                const usersData = await axios.get(`api/users/profile/${storage.userId}`, 
                {
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': token
                    }
                });
                console.log(usersData.data)
            return usersData.data;
            } catch (err) {}
        };
        fetchProfil();
    }, [token]);

    return (
        <div>
        <NavBarHome />
        <LeftNav />
        <section className='container-user'>
            <div className="user">
                <div className='users-profil-container'>
                    <div className='users-profil-container-avatar'>
                        <h1>Avatar</h1>
                        <img className='users-profil-avatar' src={storage.avatar} alt="avatar" />
                    </div>
                    <div className='users-profil-container-username'>
                        <h1>Username</h1>
                        <h2 className='users-profil-username'>{storage.username}</h2>
                    </div>
                    <div className='users-profil-container-email'>
                        <h1>Email</h1>
                        <h2 className='users-profil-email'>{storage.email}</h2>
                    </div>
                    <div className='users-profil-container-bio'>
                        <h1>Bio</h1>
                        {storage.bio ?
                        <p className='users-profil-bio'>{storage.bio}</p>
                        : 
                        <p>Veuillez modifiez votre profil afin d'ajoutez une bio</p>
                        }
                    </div>
                    <DeleteProfil />
                    <img src="../images/icons/edit.svg" alt="edit" onClick={UpdateProfil}/>
                    
                </div>
            </div>
        </section>
    </div>
    );
};

export default AllProfil;