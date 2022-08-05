import React from "react";
import axios from "../../../api/axios";

const DeletePost = (id) => {
  const storage = JSON.parse(localStorage.getItem("User"));
  let token = "Bearer " + storage.token;

  const HandleDeletePost = async (e) => {
    e.preventDefault();

    try {
      const deletePostData = await axios.delete(
        `api/post/${storage.userId}/delete/${id.id}`,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: token,
          },
        }
      );
      window.location = "/home";
      return deletePostData;
    } catch (err) {
      return err;
    }
  };

  return (
    <button className="post-button" onClick={HandleDeletePost}>
      <img
        className="logo-allpage"
        src="../images/icons/trash.svg"
        alt="trash"
      />
    </button>
  );
};

export default DeletePost;
