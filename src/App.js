import React, { useState, useEffect } from "react";
import Blog from "./components/Blog";
import blogService from "./services/blogs";
import Notification from "./components/Notification";
import loginService from "./services/login";

const App = () => {
  const [blogs, setBlogs] = useState([]);
  const [newBlog, setNewBlog] = useState("");
  const [newTitle, setNewTitle] = useState("");
  const [newAuthor, setNewAuthor] = useState("");
  const [newUrl, setNewUrl] = useState("");
  const [newLikes, setNewLikes] = useState("");
  const [newFilterName, setNewFilterName] = useState("");
  const [showAll, setShowAll] = useState(true);
  const [notifMessage, setNotifMessage] = useState([true, "Read successful"]);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [user, setUser] = useState(null);

  useEffect(() => {
    blogService.getAll().then(blogs => setBlogs(blogs));
  }, []);

  //TODO logout button
  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem("loggedBlogappUser");
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON);
      setUser(user);
      blogService.setToken(user.token);
    }
  }, []);

  //button handlers
  const handleLogin = async event => {
    event.preventDefault();
    try {
      const user = await loginService.login({
        username,
        password
      });
      window.localStorage.setItem("loggedBlogappUser", JSON.stringify(user));
      blogService.setToken(user.token);
      setUser(user);
      setUsername("");
      setPassword("");
    } catch (error) {
      window.localStorage.removeItem("loggedBlogappUser");
      console.log("login error");
      setNotifMessage([false, "Wrong credentials"]);
      // setTimeout(() => {
      //   setNotifMessage(null);
      // }, 5000);
    }
  };

  const handleLogout = event => {
    window.localStorage.removeItem("loggedBlogappUser");
    setUser(null);
  };

  const handleTitleChange = event => setNewTitle(event.target.value);
  const handleAuthorChange = event => setNewAuthor(event.target.value);
  const handleUrlChange = event => setNewUrl(event.target.value);
  const handleLikesChange = event => setNewLikes(event.target.value);

  const handleFilterNameChange = event => {
    setNewFilterName(event.target.value);
    setShowAll(false);
  };

  const addBlog = async event => {
    event.preventDefault();
    const newBlog = {
      title: newTitle,
      author: newAuthor,
      url: newUrl,
      likes: newLikes
    };
    try {
      const response = await blogService.create(newBlog);
      setBlogs(blogs.concat(response));
      setNotifMessage([true, "Create successful"]);
      setNewTitle("");
      setNewAuthor("");
      setNewUrl("");
      setNewLikes("");
    } catch (error) {
      console.log(error);
      setNotifMessage([false, error.message]);
    }
  };

  //filter //add filtering using regex later
  const blogsToShow = showAll
    ? blogs
    : blogs.filter(blog => blog.name === newFilterName);

  const rows = blogsToShow.map(blog => {
    return (
      <div>
        <Blog
          key={blog.title}
          title={blog.title}
          author={blog.author}
          url={blog.url}
          likes={blog.likes}
        />
        <hr></hr>
      </div>
    );
  });

  //forms
  const loginForm = () => (
    <div>
      <h2>Login</h2>
      <form onSubmit={handleLogin}>
        <div>
          username
          <input
            type="text"
            value={username}
            name="Username"
            onChange={({ target }) => setUsername(target.value)}
          />
        </div>
        <div>
          password
          <input
            type="password"
            value={password}
            name="Password"
            onChange={({ target }) => setPassword(target.value)}
          />
        </div>
        <button type="submit">login</button>
      </form>
      <hr></hr>
    </div>
  );
  const blogForm = () => (
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
  );

  return (
    <div>
      <h2>blogs</h2>
      <Notification message={notifMessage} />

      {user === null ? (
        loginForm()
      ) : (
        <div>
          <p>
            {user.name} logged in <button onClick={handleLogout}>Logout</button>
          </p>
          <div>{blogForm()}</div>
          <div>{rows}</div>
        </div>
      )}

      {/* <div>
        Filter:{" "}
        <input value={newFilterName} onChange={handleFilterNameChange} />
      </div> */}
    </div>
  );
};

export default App;
