import React from "react";
import Axios from "axios";
import { useEffect } from "react";

export default function App() {
  const [posts, setPosts] = React.useState([]);
  const [newPost, setNewPost] = React.useState({ title: "", body: "" });

  const [isEditing, setEditing] = React.useState(false);
  const [updatedPost, setUpdatedPost] = React.useState({ title: "", body: "" });

  const getPosts = async () => {
    try {
      const response = await Axios.get(
        "https://jsonplaceholder.typicode.com/posts"
      );
      setPosts(response.data);
    } catch (error) {
      console.error("Error getting posts:", error);
    }
  };

  useEffect(() => {
    getPosts();
  }, []);

  const createPost = async () => {
    try {
      const response = await Axios.post(
        "https://jsonplaceholder.typicode.com/posts",
        newPost
      );

      setPosts((prevPosts) => [...prevPosts, response.data]);

      setNewPost({ title: "", body: "" });
    } catch (error) {
      console.log("Error creating posts " + error);
    }
  };

  const handleUpdate = async (postId) => {
    try {
      const response = await Axios.get(
        `https://jsonplaceholder.typicode.com/posts/${postId}`
      );
      const postToUpdate = response.data;
      setUpdatedPost(postToUpdate);
      setEditing(true);
    } catch (error) {
      console.error("Error updating post for edit: ", error);
    }
  };

  const savePost = async () => {
    try {
      const response = await Axios.put(
        `https://jsonplaceholder.typicode.com/posts/${updatedPost.id}`,
        updatedPost
      );

      setPosts((prevPosts) =>
        prevPosts.map((post) =>
          post.id === updatedPost.id ? response.data : post
        )
      );

      setEditing(false);
      setUpdatedPost({ title: "", body: "" });
    } catch (error) {
      console.error("Error updating post: ", error);
    }
  };

  const handleDelete = async (postId) => {
    try {
      await Axios.delete(
        `https://jsonplaceholder.typicode.com/posts/${postId}`
      );
      setPosts((prevPosts) => prevPosts.filter((post) => post.id !== postId));
    } catch (error) {
      console.error("Error deleting post:", error);
    }
  };

  const postsData = posts.map((obj) => (
    <li key={obj.id}>
      <strong>{obj.id} Title : </strong>
      {obj.title}
      <br />
      <strong>Body : </strong>
      {obj.body}
      <br />
      <button onClick={() => handleUpdate(obj.id)}>Update</button>
      <button onClick={() => handleDelete(obj.id)}>Delete</button>
    </li>
  ));

  return (
    <>
      <h1>JSON Placeholder API Posts</h1>

      <h3>Add New Post</h3>
      <label>Title</label>
      <input
        type="text"
        placeholder="Title"
        value={newPost.title}
        onChange={(e) => setNewPost({ ...newPost, title: e.target.value })}
      />
      <label>Body</label>
      <textarea
        type="text"
        placeholder="Body"
        value={newPost.body}
        onChange={(e) => setNewPost({ ...newPost, body: e.target.value })}
      />
      <button onClick={createPost}>Add Post</button>

      <ul>{postsData} </ul>

      {isEditing && (
        <div>
          <h3>Edit Post</h3>
          <label>Title</label>
          <input
            type="text"
            placeholder="Title"
            value={updatedPost.title}
            onChange={(e) =>
              setUpdatedPost({ ...updatedPost, title: e.target.value })
            }
          />
          <label>Body</label>
          <textarea
            placeholder="Body"
            value={updatedPost.body}
            onChange={(e) =>
              setUpdatedPost({ ...updatedPost, body: e.target.value })
            }
          />
          <button onClick={savePost}>Save</button>
        </div>
      )}
    </>
  );
}
