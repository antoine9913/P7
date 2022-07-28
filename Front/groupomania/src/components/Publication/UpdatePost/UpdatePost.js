import React, { useEffect, useState } from 'react';
import axios from '../../../api/axios';

import './updatePost.css'

const UpdatePost = (id) => {

  const [posts, setPosts] = useState([]);
  const [attachment, setAttachement] = useState({ preview: '', data: '' })
  const [title, setTitle] = useState('')
  const [content, setContent] = useState('')

  const storage = JSON.parse(localStorage.getItem('User'));
    const token = "Bearer " +  storage.token;
  
    useEffect(() => {
      const fetchPosts = async () => {
          try {
              const postsData = await axios.get(`api/post/${id.id}`, 
              {
                  headers: {
                      'Content-Type': 'application/json',
                      'Authorization': token
                  }
              });
              console.log(postsData.data)
              setPosts(postsData.data)
          } catch (err) {}
      };
      fetchPosts();
  }, [token]);

  const HandleEditPost = async (e) => {

    e.preventDefault()
    const formData = new FormData()
    formData.append('file', attachment.data)
    formData.append('title', title)
    formData.append('content', content)

    axios.put(`api/post/update/${id.id}`, formData, {
                  headers: {
                      'Content-Type': 'application/json'
                  }
    })
    .then(res => {
      console.log(formData)
        console.log(res)
          window.location = '/home';
    })
  }

  const handleFileChange = (e) => {
    const img = {
      preview: URL.createObjectURL(e.target.files[0]),
      data: e.target.files[0],
    }
    setAttachement(img)
  }

  const [isShown, setIsShown] = useState(false);

  const handleClick = event => {
    setIsShown(current => !current);
  };

  return (
                <div className='post-update-container'>
                  <button className='post-update-button' onClick={handleClick}>
                      <img src="../images/icons/edit.svg" alt="editprofil" />
                  </button>  
                      {isShown && (
                    <form className='post-update-form' onSubmit={HandleEditPost}>
                        <div className='post-update-container-attachment'>
                            {attachment.preview && <img className='post-update-preview-attachment' src={attachment.preview} width='100' height='100' />}
                        <input 
                        type="file" 
                        id='attachment'
                        name='file'
                        onChange={handleFileChange}
                        />
                        </div>
                        <div className='post-update-container-Content'>
                          <div className='post-update-title'>
                              <h1>Titre</h1>
                              <input 
                              type="text" 
                              id='title'
                              autoComplete='off'
                              onChange={(e) => setTitle(e.target.value)}
                              placeholder={posts.title}
                              value={title}
                              />
                            </div>
                            <div className='post-update-content'>
                              <h1>Content</h1>
                              <input 
                              type="text" 
                              id='content'
                              autoComplete='off'
                              onChange={(e) => setContent(e.target.value)}
                              placeholder={posts.content}
                              value={content}
                              />
                            </div>
                        </div>
                        <button type='submit' >
                            <img src="../images/icons/send.svg" alt="edit" />
                        </button>
                      </form>
                      )}     
                </div>
  );
};

export default UpdatePost;