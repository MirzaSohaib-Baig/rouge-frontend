import React, { useState, useRef, useEffect } from "react";
import axios from "axios";
import "./Home.css";
import FirstMountain from "../../assets/moutain1.png";
import SecondMountain from "../../assets/mountain2.png";
import FirstClouth from "../../assets/clouth1.png";
import SecondClouth from "../../assets/clouth2.png";
import ThirdClouth from "../../assets/clouth3.png";
import FourthClouth from "../../assets/clouth4.png";
import { FaRegThumbsUp, FaRegCommentDots } from "react-icons/fa";
import { MdSend } from "react-icons/md";
import amelia from "../../assets/amelia.png";
import { CiImageOn, CiLocationOn, CiFaceSmile } from "react-icons/ci";
import { PiPaperclipHorizontalThin } from "react-icons/pi";
import man from "../../assets/man.jpg";

const Post = () => {
    const [posts, setPosts] = useState([]);
  const [media, setMedia] = useState([]);
  const [mentions, setMentions] = useState([]);
  const [payments, setPayments] = useState([]);
  const [tags, setTags] = useState([]);
  const author_name = localStorage.getItem("username");
  const fileInputRef = useRef(null);
  const [postData, setPostData] = useState({
    author_name: author_name,
    content: "",
    group: "",
    is_paid: false,
    media: [],
    mentions: [],
    payments: [],
    price: "",
    tags: [],
    visibility: "",
  });

  const handleFileChange = (e) => {
    setMedia([...e.target.files]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

  const formData = new FormData();
  formData.append("author_name", postData.author_name);
  formData.append("content", postData.content);
  formData.append("group", postData.group);
  formData.append("visibility", postData.visibility);
  formData.append("is_paid", postData.is_paid);
  formData.append("price", postData.price);
  media.forEach((file) => formData.append("media", file));
  mentions.forEach((mention) => formData.append("mentions", mention));
  payments.forEach((payment) => formData.append("payments", payment));
  tags.forEach((tag) => formData.append("tags", tag));

    try {
      const res = await axios.post("http://127.0.0.1:8001/social/posts/create/", formData, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
          "Content-Type": "multipart/form-data"
        },
      });
      console.log("Post created:", res.data);
      // setContent("");
      setMedia([]);
    } catch (err) {
      console.error("Error creating post:", err);
    }
    
  };

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const res = await axios.get("http://127.0.0.1:8001/social/posts/", {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });
        setPosts(res.data.data || []);
        console.log("Posts fetched:", res.data.data);
      } catch (err) {
        console.error("Failed to fetch posts", err);
      }
    };
  
    fetchPosts();
  }, [])

  return (
    <main className="main-content">
      <form className="post-input-container" onSubmit={handleSubmit}>
        <div className="post-input">
          <img src={man} alt="User" className="user-avatar" />
          <input
            type="text"
            placeholder="What's on your mind?"
            value={postData.content}
            onChange={(e) => setPostData({ ...postData, content: e.target.value })}
          />
        </div>

        <div className="post-options">
          <div className="post-functions">
            <CiImageOn
              className="post-icon clickable"
              onClick={() => fileInputRef.current.click()}
            />
            <input
              type="file"
              multiple
              onChange={handleFileChange}
              ref={fileInputRef}
              style={{ display: "none" }}
            />
            <PiPaperclipHorizontalThin className="post-icon rotation" />
            <CiLocationOn className="post-icon" />
            <CiFaceSmile className="post-icon" />
          </div>
          <button type="submit" className="post-btn">
            Post
          </button>
        </div>
      </form>



      {/* Feed from backend */}
      {posts && posts.length > 0 ? (
        posts.map((post) => (
          <div className="post" key={post.id}>
            <div className="post-header">
              <img src={man} alt={post.author_name} className="user-avatar" />
              <div>
                <strong>{post.author_name}</strong>
                <div className="time">
                  {new Date(post.created_at).toLocaleString()}
                </div>
              </div>
            </div>
            <p>{post.content}</p>
            {post.media?.length > 0 && (
              <div className="post-images">
                {post.media.map((item) => (
                  <img
                    key={item.id}
                    src={item.file}
                    alt="media"
                    className="post-images"
                  />
                ))}
              </div>
            )}
            <div className="post-actions">
              <div className="post-icons like">
                <span>
                  <FaRegThumbsUp />
                </span>
                <span> Like</span>
              </div>
              <div className="post-icons">
                <span>
                  <FaRegCommentDots />
                </span>
                <span> Comment</span>
              </div>
              <div className="post-icons">
                <span>
                  <MdSend />
                </span>
                <span> Share</span>
              </div>
            </div>
          </div>
        ))
      ) : (
        <></>
      )}
      <div className="post">
        <div className="post-images">
          <img src={FirstMountain} alt="Mountain" className="post-images" />
          <img src={SecondMountain} alt="Mountain" className="post-images" />
        </div>
        <div className="post-actions">
          <div className="post-icons like">
            <span><FaRegThumbsUp /></span><span> Like</span><span className="like-count"> 12</span>
          </div>
          <div className="post-icons">
            <span><FaRegCommentDots /></span><span> Comment</span><span className="count"> 6</span>
          </div>
          <div className="post-icons">
            <span><MdSend /></span><span> Share</span><span className="count"> 2</span>
          </div>
        </div>
      </div>

      <div className="post">
        <div className="post-header">
          <img src={amelia} alt="Amelie" className="user-avatar" />
          <div>
            <strong>Amelie Shiba</strong> created a photo album
            <div className="time">Thursday, 17 August - 10:40 PM</div>
          </div>
        </div>
        <p>
          I’m selling these clothes. Anyone interested? Or shall we do a swap
          evening at mine? 😉
        </p>
        <div className="post-images">
          <img src={FirstClouth} alt="Clothes" className="post-images" />
          <img src={SecondClouth} alt="Clothes" className="post-images" />
          <img src={ThirdClouth} alt="Clothes" className="post-images" />
          <img src={FourthClouth} alt="Clothes" className="post-images" />
        </div>
        <div className="post-actions">
          <div className="post-icons like">
            <span><FaRegThumbsUp /></span><span> Like</span><span className="like-count"> 12</span>
          </div>
          <div className="post-icons">
            <span><FaRegCommentDots /></span><span> Comment</span><span className="count"> 6</span>
          </div>
          <div className="post-icons">
            <span><MdSend /></span><span> Share</span><span className="count"> 2</span>
          </div>
        </div>
      </div>
    </main>

  );
};

export default Post;