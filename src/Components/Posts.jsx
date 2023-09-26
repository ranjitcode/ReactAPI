import React, { useContext, useEffect } from "react";
import Post from "./Post";
import Instance from "./api_instance";
import { useErrorBoundary } from "react-error-boundary";
import { Link } from "react-router-dom";
import { AppContext } from "../App";

export default function Posts() {
  // const [Posts, setPosts] = useState([]); //empty array for saving an array list
  const { posts, setPosts } = useContext(AppContext);

  const { showBoundary } = useErrorBoundary();

  useEffect(() => {
    const abortCont = new AbortController(); //we can associate it with axios get method and stop it
    const signal = abortCont.signal;

    const getPosts = async () => {
      try {
        const response = await Instance({
          url: "/posts/",
          method: "get",
          signal, //pass signal to axios request
        });
        setPosts(response.data);
      } catch (error) {
        if (error.name === "CanceledError") {
          //useEffect cleanup function error name
          console.log("cleanupfunction executed");
        } else {
          showBoundary("Error while fetching", error);
        }
      }
    };
    getPosts();
    //cleanup function
    return () => {
      abortCont.abort();
    }; //cancel the request when the component unmounts
  }, []);

  const PostsElements = posts.map((post) => (
    <Post
      key={post.id}
      id={post.id}
      title={post.title}
      body={post.body}
      setPosts={setPosts}
    />
  ));

  return (
    <>
      <button>
        <Link to="/add">Add new Post</Link>
      </button>
      {PostsElements}
    </>
  );
}
