import React, { useEffect, useState } from "react";
import Moment from "react-moment";

import axios from "../../../api/axios";
import NewComment from "../NewComment/NewComment";

import "./allPost.css";
import DeletePost from "../DeletePost/DeletePost";
import Comment from "../Comment/Comment";
import UpdatePost from "../UpdatePost/UpdatePost";

const AllPost = () => {
  const [posts, setPosts] = useState([]);

  const storage = JSON.parse(localStorage.getItem("User"));
  const token = "Bearer " + storage.token;
  const isAdmin = storage.isAdmin;

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const postsData = await axios.get(`api/post`, {
          headers: {
            "Content-Type": "application/json",
            Authorization: token,
          },
        });
        setPosts(postsData.data);
      } catch (err) {}
    };
    fetchPosts();
  }, [token]);

  return (
    <section className="container-all-post">
      {posts.map((post, index) => (
        <div key={index} className="post">
          <div className="posts-user-container">
            <img
              className="posts-user-avatar"
              crossOrigin="anonymous"
              src={post.User.avatar}
              alt="avatar"
            />
            <h1 className="posts-user-username">{post.User.username}</h1>
            <div key={"date" + post.id} className="post-user-timestamp">
              <h3>
                Publié le <Moment format="DD MMM YYYY" date={post.createdAt} />
              </h3>
              <br />
              <h3>
                {" "}
                à <Moment format="HH:mm:ss" date={post.createdAt} />
              </h3>
            </div>
          </div>
          <div className="posts-container">
            <h2 className="posts-title">{post.title}</h2>
            <img
              className="posts-attachment"
              crossOrigin="anonymous"
              src={post.attachment}
              alt="attachment"
            />
            <p className="posts-content">{post.content}</p>
          </div>
          {storage.userId === post.User.id || isAdmin ? (
            <div className="delete-comment">
              <UpdatePost id={post.id} />
              <DeletePost id={post.id} />
            </div>
          ) : (
            <div></div>
          )}
          <NewComment id={post.id} />
          <Comment post={post} />
        </div>
      ))}
    </section>
  );
};

export default AllPost;
