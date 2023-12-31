import React, { createContext, useState } from "react";
import Posts from "./Components/Posts";
import Fallback from "./Components/Fallback";
import { ErrorBoundary } from "react-error-boundary";
import { Routes, Route } from "react-router-dom";
import AddPost from "./Components/AddPost";

export const AppContext = createContext();
export default function App() {
  const [posts, setPosts] = useState([]); //empty array for saving an array list
  const [isEditing, setEditing] = useState(false);
  const [updatedPost, setUpdatedPost] = useState({ title: "", body: "" });
  const [disableButton, setDisableButton] = useState(false);

  const errorHandler = (error, errorInfo) => {
    console.log("logging", error, errorInfo);
  };
  return (
    <>
      <ErrorBoundary FallbackComponent={Fallback} onError={errorHandler}>
        <AppContext.Provider
          value={{
            posts,
            setPosts,
            isEditing,
            setEditing,
            updatedPost,
            setUpdatedPost,
            disableButton,
            setDisableButton,
          }}
        >
          <Routes>
            <Route path="/" element={<Posts />} />
            <Route path="/add" element={<AddPost />} />
          </Routes>
        </AppContext.Provider>
      </ErrorBoundary>
    </>
  );
}
