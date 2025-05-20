async function getSomething(slug) {
  const response = await fetch(
    `https://682afd1fab2b5004cb389453.mockapi.io/blogs/${slug}`
  );

  if (!response.ok) {
    throw new Error("cannot fetch blog");
  }

  return response.json();
}


export default async function Page({params}){
    const blog = await getSomething(params.slug)
    return (
        <div>
            ID: {params.slug}
           <div>
            Name : {blog.name}
           </div>
           <div>
            Avatar : {blog.avatar}
           </div>
        </div>
    )
}