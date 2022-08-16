import React, { useEffect, useState } from "react";
import Moment from "react-moment";

import { faAngleDown } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import axios from "../../../api/axios";
import DeleteComment from "../DeleteComment/DeleteComment";

import "./comment.css";

const Comment = (post) => {
  const [comments, setComments] = useState([]);
  const [isShown, setIsShown] = useState(false);

  const storage = JSON.parse(localStorage.getItem("User"));
  const isAdmin = storage.isAdmin;

  useEffect(() => {
    const fetchComment = async () => {
      try {
        const commentsData = await axios.get(
          `api/comment/${post.post.id}/comment`,
          {
            headers: {
              "Content-Type": "application/json",
            },
          }
        );
        setComments(commentsData.data);
      } catch (err) {}
    };
    fetchComment();
  }, []);

  const handleClick = (event) => {
    setIsShown((current) => !current);
  };

  return (
    <div className="comments-container">
      <h6>Comentaires</h6>
      <button onClick={handleClick}>
        <FontAwesomeIcon icon={faAngleDown} className="comment-scrolling-svg" />
      </button>
      {isShown && (
        <section className="section-comments">
          {comments.map((comment, index) => (
            <div key={index} className="comments">
              <div className="posts-user-container">
                <img
                  className="posts-user-avatar"
                  crossOrigin="anonymous"
                  src={comment.User.avatar}
                  alt="avatar"
                />
                <h1 className="posts-user-username">{comment.User.username}</h1>
                <div key={"date" + comment.id} className="post-user-timestamp">
                  <h3 className="date">
                    Publié le{" "}
                    <Moment format="DD MMM YYYY" date={comment.createdAt} />
                  </h3>
                  <br />
                  <h3 className="date">
                    {" "}
                    à <Moment format="HH:mm:ss" date={comment.createdAt} />
                  </h3>
                </div>
              </div>
              <div className="comment-container">
                <p className="comment-content">{comment.content}</p>
              </div>
              {storage.userId === comment.UserId || isAdmin ? (
                <div className="delete-comment">
                  <DeleteComment id={comment.id} />
                </div>
              ) : (
                <div></div>
              )}
            </div>
          ))}
        </section>
      )}
    </div>
  );
};

export default Comment;
