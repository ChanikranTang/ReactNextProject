import {headers} from 'next/headers'
import Link from 'next/link';

async function getSomething() {
  const response = await fetch(
    "https://682afd1fab2b5004cb389453.mockapi.io/blogs"
  );

  if (!response.ok) {
    throw new Error("cannot fetch blog");
  }

  return response.json();
}

export default async function Page(){
    const headerRequest = await headers()
    const user = JSON.parse(headerRequest.get('user'))
    console.log(user)

    const blogs =await getSomething()
    return (
        <div>
            Manage Blog : {user?.email}
            {blogs.map((blog, index) => (
          <div key={{index}}>
            {blog.id} {blog.name}
            <Link href={`/manage/blog/${blog.id}`} className="px-4 bg-blue-400">Go to Edit Blog...</Link>
          </div>
        ))}
        </div>
    )
}