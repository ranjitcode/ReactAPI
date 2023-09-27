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
    disableButton,
    setDisableButton,
  } = useContext(AppContext);
  const [newPost, setNewPost] = useState({ title: "", body: "" });

  const navigate = useNavigate();

  const createPost = async () => {
    setDisableButton(true);
    try {
      if (!newPost.title || !newPost.body) {
        alert("Please fill in both Title and Body fields.");
        setDisableButton(false);
        return;
      }
      const response = await Instance({
        url: "/posts/",
        method: "post",
        data: newPost,
      });
      setPosts([...posts, response.data]);
      setNewPost({ title: "", body: "" });
      setDisableButton(false);
      alert("post successfully created, click ok to proceed");
      navigate("/");
    } catch (error) {
      console.log("Error creating posts " + error);
      setDisableButton(false);
      alert("error creating new post, click ok to try again");
    }
  };

  const savePost = async () => {
    setDisableButton(true);
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
      setDisableButton(false);
      setUpdatedPost({ title: "", body: "" });
      alert("post successfully updated, click ok to proceed");
      navigate("/");
    } catch (error) {
      console.error("Error updating post: ", error);
      setDisableButton(false);
      alert("error updating post, click ok to try again");
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
          <button onClick={savePost} disabled={disableButton}>
            {disableButton ? "Saving" : "Save"}
          </button>
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
          <button onClick={createPost} disabled={disableButton}>
            {disableButton ? "Saving" : "Save"}
          </button>
        </div>
      )}
    </div>
  );
}
