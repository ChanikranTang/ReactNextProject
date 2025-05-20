async function getSomething() {
  const response = await fetch(
    "https://682afd1fab2b5004cb389453.mockapi.io/blogs"
  );

  if (!response.ok) {
    throw new Error("cannot fetch blog");
  }

  return response.json();
}

export default async function Page() {
  const blogs = await getSomething();
  console.log("blogs:", JSON.stringify(blogs, null, 2));

  return (
    <>
      <div>
        <h2>Hi from test page</h2>
        {blogs.map((blog, index) => (
          <div key={{ index }}>
            {blog.id} {blog.name}
          </div>
        ))}
      </div>
    </>
  );
}
