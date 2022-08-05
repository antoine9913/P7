// import React, { useState } from 'react';

// import axios from '../../../api/axios';

// const Likes = () => {

//     const [postId, setPostId] = useState([]);
//     const [likes, setLikes] = useState([]);
//     const [userId, setUserId] = useState([]);

//     const storage = JSON.parse(localStorage.getItem('User'));
//     let token = "Bearer " +  storage.token;

//             function LikeSubmit () {
//                 try {
//                     const likeData = axios.post(`http://localhost:8080/api/post/:id/like`,
//                     JSON.stringify({
//                         postId: postId,
//                         userId: userId,
//                         likes: 1
//                     }),
//                     {
//                         headers: {
//                             'Content-Type': 'application/json',
//                             'Authorization': token
//                         }
//                     });
//                     document.getElementById("heart").src = "./images/icons/heart-filled.svg";
//                     console.log(likes.length)
//                     setLikes(likeData.data);
//                 } catch (err) {}
//             }

//     return (
//         <button onClick={LikeSubmit}>
//             <img id='heart' src="./images/icons/heart.svg" alt="" /> {likes}
//         </button>
//     );
// };

// export default Likes;
