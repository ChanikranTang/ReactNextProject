"use client";

import { useState, useEffect } from "react";

async function getSomething(slug) {
  const response = await fetch(
    `https://682afd1fab2b5004cb389453.mockapi.io/blogs/${slug}`
  );

  if (!response.ok) {
    throw new Error("cannot fetch blog");
  }

  return response.json();
}

export default function Page({ params }) {
  const [blogState, setBlogState] = useState({
    name: "",
  });
  const initBlog = async () => {
    try {
      const result = await getSomething(params.slug);
      setBlogState(result);
    } catch (error) {
      console.log("error" + error);
    }
  };

  const handleChangeName = (event) => {
    const { name, value } = event.target;
    setBlogState((prevstate) => ({
      ...prevstate,
      [name]: value,
    }));
  };

  const handleChangeAvatar = (event) => {
    const { name, value } = event.target;
    setBlogState((prevstate) => ({
      ...prevstate,
      [name]: value,
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    console.log("Form Submit", blogState);
    try {
      const response = await fetch(
        `https://682afd1fab2b5004cb389453.mockapi.io/blogs/${params.slug}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(blogState),
        }
      );

      if (!response.ok) {
        throw new Error("Failed to update blog");
      }

      const responseData = await response.json();
      console.log("Updated blog:", responseData);
    } catch (error) {
      console.log("Error: " + error);
    }
  };

  useEffect(() => {
    initBlog();
  }, []);

  return (
    <div>
      ID: {params.slug}
      <form onSubmit={handleSubmit}>
      <div>
        Name :
        <input
          type="text"
          name="name"
          value={blogState.name}
          onChange={handleChangeName}
        />
      </div>
      <div>
        Avatar :
        <input
          type="text"
          name="avatar"
          value={blogState.avatar}
          onChange={handleChangeAvatar}
        />
      </div>
      <button>Update</button>
      </form>
    </div>
  );
}
