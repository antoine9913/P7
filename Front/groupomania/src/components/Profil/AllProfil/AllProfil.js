import React, { useEffect, useState } from "react";

import axios from "../../../api/axios";
import NavBarHome from "../../Layout/Header/NavBarHome";
import DeleteProfil from "../DeleteProfil/DeleteProfil";

import "./allProfil.css";

const AllProfil = () => {
  const [users, setUsers] = useState([]);

  const storage = JSON.parse(localStorage.getItem("User"));
  let token = "Bearer " + storage.token;

  useEffect(() => {
    const fetchProfil = async () => {
      try {
        const usersData = await axios.get(
          `api/users/profile/${storage.userId}`,
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: token,
            },
          }
        );
        setUsers(usersData.data);
      } catch (err) {}
    };
    fetchProfil();
  }, [token]);

  return (
    <div>
      <NavBarHome user={users} />
      <div className="page-user-container">
        <section className="container-user">
          <img
            className="img-logo"
            src="../images/icon.svg"
            alt="logo background"
          />
          <div className="user">
            <div className="users-profil-container">
              <div className="users-profil-container-avatar">
                <img
                  className="users-profil-avatar"
                  crossOrigin="anonymous"
                  src={users.avatar}
                  alt="avatar"
                />
              </div>
              <div className="users-profil-container-username">
                <h1>Nom d'utilisateur</h1>
                <p className="users-profil-username">{users.username}</p>
              </div>
              <div className="users-profil-container-email">
                <h1>Email</h1>
                <p className="users-profil-email">{users.email}</p>
              </div>
              <div className="users-profil-container-bio">
                <h1>Bio</h1>
                {users.bio ? (
                  <p className="users-profil-bio">{users.bio}</p>
                ) : (
                  <p>Veuillez modifiez votre profil afin d'ajoutez une bio</p>
                )}
              </div>
              <div className="users-profil-container-button">
                <DeleteProfil />
                <button>
                  <a className="allProfil-a-update" href="/updateProfil">
                    <img
                      src="../images/icons/edit.svg"
                      className="logo-allpage"
                      alt="editprofil"
                    />
                  </a>
                </button>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default AllProfil;
