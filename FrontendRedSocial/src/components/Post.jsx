import { useState } from "react";
import { useSocial } from "./SocialContext";
import ShareButton from "./ShareButton";
import { Link } from "react-router-dom";
import ImageCarousel from "./ImageCarousel";

function CommentForm({ onSubmit, placeholder }) {
  const [text, setText] = useState("");
  function handleSubmit(e) {
    e.preventDefault();
    onSubmit(text);
    setText("");
  }
  return (
    <form className="comment-form" onSubmit={handleSubmit}>
      <input
        className="w3-input w3-border w3-round"
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder={placeholder}
      />
      <button type="submit" className="w3-button w3-theme w3-round">
        <i className="fa fa-send"></i>
      </button>
    </form>
  );
}

function Comment({ postId, comment, parentId = null }) {
  const { likeComment, addComment, isDarkMode } = useSocial();
  const [replying, setReplying] = useState(false);

  return (
    <div className="comment">
      <img src={comment.avatar} alt="" className="w3-circle" />
      <div className="comment-body">
        <div className={`w3-round comment-bubble ${isDarkMode ? "w3-dark-grey" : "w3-light-grey"}`}>
          <b>{comment.author}</b>
          <p>{comment.text}</p>
        </div>
        <div className="comment-actions w3-small">
          <button
            type="button"
            className={comment.liked ? "w3-text-theme" : "w3-opacity"}
            onClick={() => likeComment(postId, comment.id, parentId)}
          >
            <i className="fa fa-thumbs-up"></i> {comment.likes}
          </button>
          {!parentId && (
            <button type="button" className="w3-opacity" onClick={() => setReplying(!replying)}>
              Reply
            </button>
          )}
        </div>
        {comment.replies?.map((reply) => (
          <Comment key={reply.id} postId={postId} comment={reply} parentId={comment.id} />
        ))}
        {replying && (
          <CommentForm
            placeholder={`Reply to ${comment.author}...`}
            onSubmit={(text) => {
              addComment(postId, text, comment.id);
              setReplying(false);
            }}
          />
        )}
      </div>
    </div>
  );
}

export default function Post({ post }) {
  const { toggleLike, addComment, isDarkMode } = useSocial();
  const [showComments, setShowComments] = useState(false);

  return (
    <div id={post.id} className={`w3-container w3-card w3-round w3-margin ${isDarkMode ? "w3-black" : "w3-white"}`}>
      <br />
      <img src={post.author.avatar} alt="Avatar" className="w3-left w3-circle w3-margin-right" style={{ width: 60 }} />
      <span className="w3-right w3-opacity">
        <Link to={`/post/${post.id}`} className="w3-hover-text-theme" style={{ textDecoration: "none" }}>{post.createdAt}</Link>
      </span>
      <h4>
        <Link to={`/perfil/${post.author.id}`} style={{ textDecoration: "none" }}>{post.author.name}</Link>
      </h4>
      <br />
      <hr className="w3-clear" />
      {post.title && <p>{post.title}</p>}
      {post.featuredImage && (
        <img src={post.featuredImage.src} alt={post.featuredImage.alt} style={{ width: "100%" }} className="w3-margin-bottom" />
      )}
      {post.text && <p>{post.text}</p>}
      
      {/* Lógica condicional para las imágenes */}
      {post.images?.length === 1 && (
        <img 
          src={post.images[0].src} 
          alt={post.images[0].alt} 
          style={{ width: "100%" }} 
          className="w3-margin-bottom" 
        />
      )}
      
      {post.images?.length > 1 && (
        <ImageCarousel images={post.images} />
      )}

      <div className="post-actions w3-margin-bottom">
        <button
          type="button"
          className={`w3-button ${post.liked ? "w3-theme-d4" : "w3-theme-d1"}`}
          onClick={() => toggleLike(post.id)}
        >
          <i className="fa fa-thumbs-up"></i>  {post.liked ? "Liked" : "Like"} ({post.likes})
        </button>
        <button
          type="button"
          className="w3-button w3-theme-d2"
          onClick={() => setShowComments(!showComments)}
        >
          <i className="fa fa-comment"></i>  Comment ({post.comments.length})
        </button>
        <ShareButton post={post} />
      </div>

      {showComments && (
        <div className="w3-margin-bottom">
          {post.comments.map((comment) => (
            <Comment key={comment.id} postId={post.id} comment={comment} />
          ))}
          <CommentForm placeholder="Write a comment..." onSubmit={(text) => addComment(post.id, text)} />
        </div>
      )}
    </div>
  );
}
