import React, { useEffect, useState } from "react";

import axios from "../../../api/axios";
import NavBarHome from "../../Layout/Header/NavBarHome";

import "./updateProfil.css";

const UpdateProfil = () => {
  const [users, setUsers] = useState([]);
  const [avatar, setAvatar] = useState({ preview: "", data: "" });
  const [bio, setBio] = useState("");
  const [username, setUsername] = useState("");

  const storage = JSON.parse(localStorage.getItem("User"));
  const token = "Bearer " + storage.token;

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

  const HandleEditBioProfil = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("file", avatar.data);
    formData.append("bio", bio);
    formData.append("username", username);

    axios
      .put(`api/users/profile/${storage.userId}`, formData, {
        headers: {
          "Content-Type": "application/json",
        },
      })
      .then((res) => {
        window.location = "/profil";
      });
  };

  const handleFileChange = (e) => {
    const img = {
      preview: URL.createObjectURL(e.target.files[0]),
      data: e.target.files[0],
    };
    setAvatar(img);
  };

  return (
    <div>
      <NavBarHome />
      <div className="page-user-container">
        <section className="container-user">
          <img
            className="img-logo"
            src="../images/icon.svg"
            alt="logo background"
          />
          <div className="user">
            <div className="users-update-container">
              <form
                className="users-form-update-container"
                onSubmit={HandleEditBioProfil}
              >
                <div className="users-update-container-profil">
                  <img
                    className="users-update-avatar"
                    crossOrigin="anonymous"
                    src={users.avatar}
                    alt="avatar"
                  />
                  {avatar.preview && (
                    <img src={avatar.preview} width="100" height="100" />
                  )}
                  <input
                    type="file"
                    id="avatar"
                    name="file"
                    onChange={handleFileChange}
                  />
                </div>
                <div className="users-update-container-bio">
                  <div className="users-update-bio">
                    <h1>Bio</h1>
                    <input
                      type="text"
                      id="bio"
                      autoComplete="off"
                      onChange={(e) => setBio(e.target.value)}
                      placeholder={users.bio}
                      value={bio}
                    />
                  </div>
                  <div className="users-update-username">
                    <h1>Username</h1>
                    <input
                      type="text"
                      id="bio"
                      autoComplete="off"
                      onChange={(e) => setUsername(e.target.value)}
                      placeholder={users.username}
                      value={username}
                    />
                  </div>
                </div>
                <button type="submit">
                  <img
                    src="../images/icons/send.svg"
                    className="logo-allpage"
                    alt="edit"
                  />
                </button>
              </form>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default UpdateProfil;
