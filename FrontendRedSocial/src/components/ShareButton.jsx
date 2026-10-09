import { useEffect, useRef, useState } from "react";
import { useSocial } from "./SocialContext";

export default function ShareButton({ post }) {
  const { toggleShare } = useSocial();
  const [open, setOpen] = useState(false);
  const [message, setMessage] = useState("");
  const ref = useRef(null);
  const link = `${window.location.origin}${window.location.pathname}#${post.id}`;

  // close the menu when clicking outside of it
  useEffect(() => {
    if (!open) return;
    function handleClick(e) {
      if (ref.current && !ref.current.contains(e.target)) setOpen(false);
    }
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, [open]);

  // hide the feedback message after a moment
  useEffect(() => {
    if (!message) return;
    const timer = setTimeout(() => setMessage(""), 2000);
    return () => clearTimeout(timer);
  }, [message]);

  function shareToFeed() {
    toggleShare(post.id);
    setMessage(post.shared ? "Share removed" : "Shared to your feed");
    setOpen(false);
  }

  async function copyLink() {
    try {
      await navigator.clipboard.writeText(link);
      setMessage("Link copied!");
    } catch {
      setMessage("Could not copy the link");
    }
    setOpen(false);
  }

  async function shareExternal() {
    setOpen(false);
    try {
      await navigator.share({ title: `Post by ${post.author.name}`, text: post.text, url: link });
    } catch {
      // user cancelled the share dialog
    }
  }

  return (
    <div ref={ref} className="w3-dropdown-click share-button">
      <button
        type="button"
        className={`w3-button ${post.shared ? "w3-theme-d4" : "w3-theme-d3"}`}
        onClick={() => setOpen(!open)}
        aria-expanded={open}
      >
        <i className="fa fa-share"></i>  {post.shared ? "Shared" : "Share"} ({post.shares ?? 0})
      </button>
      <div className={`w3-dropdown-content w3-bar-block w3-card-4 ${open ? "w3-show" : ""}`} style={{ minWidth: 200 }}>
        <button type="button" className="w3-bar-item w3-button" onClick={shareToFeed}>
          <i className="fa fa-retweet fa-fw w3-margin-right"></i>
          {post.shared ? "Undo share" : "Share to my feed"}
        </button>
        <button type="button" className="w3-bar-item w3-button" onClick={copyLink}>
          <i className="fa fa-link fa-fw w3-margin-right"></i>Copy link
        </button>
        {typeof navigator.share === "function" && (
          <button type="button" className="w3-bar-item w3-button" onClick={shareExternal}>
            <i className="fa fa-external-link fa-fw w3-margin-right"></i>Share via...
          </button>
        )}
      </div>
      {message && <span className="w3-small w3-opacity share-message">{message}</span>}
    </div>
  );
}
