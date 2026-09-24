import { useState } from "react";
import { useSocial } from "./SocialContext";
import Post from "./Post";

function StatusComposer() {
  const { addPost } = useSocial();
  const [text, setText] = useState("Status: Feeling Blue");

  function handleSubmit(e) {
    e.preventDefault();
    addPost(text);
    setText("");
  }

  return (
    <div className="w3-row-padding">
      <div className="w3-col m12">
        <div className="w3-card w3-round w3-white">
          <form className="w3-container w3-padding" onSubmit={handleSubmit}>
            <h6 className="w3-opacity">Social Media template by w3.css</h6>
            <textarea
              className="w3-border w3-padding status-input"
              value={text}
              onChange={(e) => setText(e.target.value)}
              placeholder="What's on your mind?"
              rows={2}
            />
            <button type="submit" className="w3-button w3-theme">
              <i className="fa fa-pencil"></i>  Post
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default function Feed() {
  const { posts } = useSocial();
  return (
    <div className="w3-col m7">
      <StatusComposer />
      {posts.map((post) => (
        <Post key={post.id} post={post} />
      ))}
    </div>
  );
}
