import React, { useState } from "react";

const BlogForm = ({ createBlog }) => {
  const [newBlog, setNewBlog] = useState(null);
  const [newTitle, setNewTitle] = useState("");
  const [newAuthor, setNewAuthor] = useState("");
  const [newUrl, setNewUrl] = useState("");
  const [newLikes, setNewLikes] = useState("");

  const handleTitleChange = event => setNewTitle(event.target.value);
  const handleAuthorChange = event => setNewAuthor(event.target.value);
  const handleUrlChange = event => setNewUrl(event.target.value);
  const handleLikesChange = event => setNewLikes(event.target.value);

  const addBlog = event => {
    event.preventDefault();
    const newBlog = {
      title: newTitle,
      author: newAuthor,
      url: newUrl,
      likes: newLikes
    };
    createBlog(newBlog);
    setNewTitle("");
    setNewAuthor("");
    setNewUrl("");
    setNewLikes("");
    setNewBlog(null);
  };

  return (
    <div>
      <h2>Add a new</h2>
      <form onSubmit={addBlog}>
        <div>
          title: <input value={newTitle} onChange={handleTitleChange} />
        </div>
        <div>
          author: <input value={newAuthor} onChange={handleAuthorChange} />
        </div>
        <div>
          url: <input value={newUrl} onChange={handleUrlChange} />
        </div>
        <div>
          likes: <input value={newLikes} onChange={handleLikesChange} />
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
    </div>
  );
};

export default BlogForm;
