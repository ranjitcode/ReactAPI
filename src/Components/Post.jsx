import React, { useContext } from "react";
import { Link } from "react-router-dom";
import Instance from "./api_instance";
import { AppContext } from "../App";

export default function Post(props) {
  const { setUpdatedPost, setEditing } = useContext(AppContext);
  const setPosts = props.setPosts;
  const handleDelete = async (postId) => {
    try {
      await Instance({
        url: `/posts/${postId}`,
        method: "delete",
        // data:
      });
      setPosts((prevPosts) => prevPosts.filter((post) => post.id !== postId));
    } catch (error) {
      console.error("Error deleting post:", error);
    }
  };

  const handleUpdate = async (postId) => {
    try {
      const response = await Instance({
        url: `/posts/${postId}`,
        method: "get",
      });
      const postToUpdate = response.data;
      setUpdatedPost(postToUpdate);
      setEditing(true);
    } catch (error) {
      console.error("Error updating post for edit: ", error);
    }
  };

  return (
    <>
      <h3>
        {props.id} {props.title}
      </h3>
      <p>{props.body}</p>
      <button onClick={() => handleUpdate(props.id)}>
        <Link to="/add">Update</Link>
      </button>
      <button onClick={() => handleDelete(props.id)}>Delete</button>
    </>
  );
}
