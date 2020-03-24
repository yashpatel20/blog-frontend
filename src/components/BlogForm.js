import React from "react";

const blogForm = (props) => (


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
    <hr></hr>
  </div>
  )
};
