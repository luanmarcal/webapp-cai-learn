import React, { useEffect } from "react";
import "./FacebookProfile.css";
import { useState } from 'react';

export default function FacebookProfile() {
  const [post, setPost] = useState()
  const [postList, setPostList] = useState([])

  const fetchPosts = async () => {
    try {
      const response = await fetch('http://localhost:4000/posts');
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const data = await response.json();
      console.log(data)

      setPostList(data)
    } catch (error) {
      console.error('Error fetching posts:', error);
    }
  };

  const sendPost = async () => {
    const atual = [...postList]

    const newPost = {
      id: Math.floor(Math.random() * 10000),
      user: 'John Doe',
      post: post,
      date: new Date()
    };

    atual.push(newPost)

    const response = await fetch('http://localhost:4000/posts', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(newPost),
    });
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }

    setPostList(atual)
    setPost('')
  }

  const deletePost = async (id) => {
    const atual = [...postList]
    atual.forEach((p, index) => {
      if (p.id === id) {
        atual.splice(index, 1);
      }
    })

    const response = await fetch('http://localhost:4000/posts', {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ id: id }),
    });
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }

    setPostList(atual)
    setPost('')
  }

  let loadPosts = () => {
    let tags = []

    postList.forEach((value, index) => {
      tags.push(
        <div className="post" key={index}>
          <div className="post-header">
            <div>
              <div className="user-name">{value.user}</div>
              <div className="post-time">{new Date(value.date).toLocaleString()}</div>
            </div>
            <div className="post-options">
              <button className="delete-button" onClick={() => { deletePost(value.id) }}>Delete</button>
            </div>
          </div>
          <p>{value.post}</p>
        </div>
      )
    })

    return tags.reverse()
  }

  const handlePost = (e) => {
    setPost(e.target.value)
  }

  useEffect(() => {
    fetchPosts();
  }, []);

  return (
    <div className="facebook-profile">


      <div className="cover-photo">
        <img
          className="cover-image"
          src="https://picsum.photos/800/200"
          alt="Cover"
        />

        {/* Navigation Bar */}
        <div className="nav-bar">
          <div>Posts</div>
          <div>About</div>
          <div>Friends</div>
          <div>Photos</div>
          <div>More</div>
        </div>

      </div>

      {/* Content Section */}
      <div className="content-section">

        {/* Left Column */}
        <div className="left-column">
          <div className="intro-box">
            <div className="profile-info">
              <img
                src="https://randomuser.me/api/portraits/men/32.jpg"
                alt="Profile"
                className="profile-picture"
              />
              <div className="profile-name">John Doe</div>
            </div>
            <h2>Intro</h2>
            <p>Web Developer at XYZ Company</p>
            <p>Lives in San Francisco, CA</p>
            <p>From New York, NY</p>
          </div>
          <div className="photos-box">
            <h2>Photos</h2>
            <div className="photo-grid">
              <img src="https://picsum.photos/id/1/200/300" alt="Photo1" />
              <img src="https://picsum.photos/id/2/200/300" alt="Photo2" />
              <img src="https://picsum.photos/id/3/200/300" alt="Photo3" />
              <img src="https://picsum.photos/id/4/200/300" alt="Photo4" />
              <img src="https://picsum.photos/id/5/200/300" alt="Photo5" />
              <img src="https://picsum.photos/id/6/200/300" alt="Photo6" />
            </div>
          </div>
        </div>

        {/* Right Column - Posts */}
        <div className="right-column">
          <div className="post-box">
            <textarea placeholder="What's on your mind, John?" onChange={handlePost} value={post}></textarea>
            <button className="buttonPost" onClick={sendPost}>Post</button>
          </div>

          <div className="posts">

            {loadPosts()}

            <div className="post">
              <div className="post-header">
                <div>
                  <div className="user-name">John Doe</div>
                  <div className="post-time">07/04/2025, 12:09:34</div>
                </div>
              </div>
              <p>Had a great day exploring the city!</p>
              <img
                src="https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=800&q=80"
                alt="Post"
              />
            </div>

          </div>
        </div>
      </div>
    </div>
  );
}
