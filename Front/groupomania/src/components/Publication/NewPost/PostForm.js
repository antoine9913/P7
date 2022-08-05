import React from "react";
import { useRef, useState } from "react";

import axios from "../../../api/axios";

import "./postForm.css";

const PostForm = () => {
  const postRef = useRef();

  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [attachment, setAttachment] = useState({ preview: "", data: "" });

  const handlePost = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("file", attachment.data);
    formData.append("title", title);
    formData.append("content", content);

    const storage = JSON.parse(localStorage.getItem("User"));
    const token = "Bearer " + storage.token;

    axios
      .post(`api/post/create`, formData, {
        headers: {
          "Content-Type": "application/json",
          Authorization: token,
        },
      })
      .then((res) => {
        window.location = "/home";
      });
  };

  const handleFile = (e) => {
    const img = {
      preview: URL.createObjectURL(e.target.files[0]),
      data: e.target.files[0],
    };
    setAttachment(img);
  };

  return (
    <section className="container-new-post">
      <form>
        <input
          className="postFrom-input"
          type="text"
          id="title"
          ref={postRef}
          autoComplete="off"
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Titre de la publication"
          value={title}
          required
        />
        <br />
        <input
          className="postFrom-input"
          type="text"
          id="content"
          ref={postRef}
          autoComplete="off"
          onChange={(e) => setContent(e.target.value)}
          placeholder="Quoi de neuf ?"
          value={content}
          required
        />
        <br />
      </form>
      <form className="form-signIn-send">
        {attachment.preview && (
          <img
            src={attachment.preview}
            className="post-update-preview-attachment"
          />
        )}
        <input type="file" id="attachment" name="file" onChange={handleFile} />
        <button className="post-button" onClick={handlePost}>
          <img
            className="logo-allpage"
            src="./images/icons/send.svg"
            alt="sendPost"
          />
        </button>
      </form>
    </section>
  );
};

export default PostForm;
