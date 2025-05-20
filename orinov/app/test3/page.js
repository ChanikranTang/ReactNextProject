'use client' //default is server that log in terminal

import {useEffect,useState} from "react"
import {submitForm} from "./action"


async function getSomething() {
  const response = await fetch(
    "https://682afd1fab2b5004cb389453.mockapi.io/blogs"
  );

  if (!response.ok) {
    throw new Error("cannot fetch blog");
  }

  return response.json();
}

export default function Page() {
  // const blogs = await getSomething();
  // console.log("blogs:", JSON.stringify(blogs, null, 2));

  const [blogState,setBlogState] = useState([])

  const initBlog = async() => {
    try{
      const result = await getSomething()
      setBlogState(result)
    }
    catch(error){
      console.log('error',error)
    }
  }

  useEffect(()=>{
    initBlog()
  },[])

  return (
    <>
    <div>
      <h2>hi tt</h2>
      {blogState.map((blog, index) => (
        <div key={{ index }}>
          {blog.id} {blog.name}
        </div>
      ))}
    </div>
    <form action={submitForm}>
        Email<input name="email"></input>
        <button>Submit</button>
      </form>
      </>
  );
}
