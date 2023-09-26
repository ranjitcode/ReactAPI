import React, { useState, useContext } from "react";
import Instance from "./api_instance";
import { useNavigate } from "react-router-dom";
import { AppContext } from "../App";

export default function AddPost() {
  const {
    posts,
    setPosts,
    isEditing,
    setEditing,
    updatedPost,
    setUpdatedPost,
  } = useContext(AppContext);
  const [newPost, setNewPost] = useState({ title: "", body: "" });

  const navigate = useNavigate();

  const createPost = async () => {
    try {
      const response = await Instance({
        url: "/posts/",
        method: "post",
        data: newPost,
      });
      setPosts([...posts, response.data]);
      setNewPost({ title: "", body: "" });
      navigate("/");
    } catch (error) {
      console.log("Error creating posts " + error);
    }
  };

  const savePost = async () => {
    try {
      const response = await Instance({
        url: `/posts/${updatedPost.id}`,
        method: "put",
        data: updatedPost,
      });
      setPosts((prevPosts) =>
        prevPosts.map((post) =>
          post.id === updatedPost.id ? response.data : post
        )
      );
      // Clear the editing state and reset the updatedPost state
      setEditing(false);
      setUpdatedPost({ title: "", body: "" });
      navigate("/");
    } catch (error) {
      console.error("Error updating post: ", error);
    }
  };

  return (
    <div>
      {isEditing ? (
        <div>
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
          <input
            placeholder="Body"
            value={updatedPost.body}
            onChange={(e) =>
              setUpdatedPost({ ...updatedPost, body: e.target.value })
            }
          />
          <button onClick={savePost}>Save</button>
        </div>
      ) : (
        <div>
          <label>Title</label>
          <input
            type="text"
            placeholder="Title"
            value={newPost.title}
            onChange={(e) => setNewPost({ ...newPost, title: e.target.value })}
          ></input>
          <label>Body</label>
          <input
            type="text"
            placeholder="Body"
            value={newPost.body}
            onChange={(e) => setNewPost({ ...newPost, body: e.target.value })}
          ></input>
          <button onClick={createPost}>Save</button>
        </div>
      )}
    </div>
  );
}
