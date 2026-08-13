import React from 'react';
import Link from 'next/link';

export default function BlogPage() {
  const blogPosts = [
    { id: 1, title: 'First Blog Post', content: 'This is the content of the first blog post.' },
    { id: 2, title: 'Second Blog Post', content: 'This is the content of the second blog post.' },
  ]
  
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24"> 
    <div>
      <ul>
        {blogPosts.map((blog) => (
          <li className="mb-4" key={blog.id}>
            {/*dynamic routing to blog post page using id*/}
            <Link href={`/blog/${blog.id}`} className="text-blue-500 hover:underline">
              {blog.title}
            </Link>
          </li>
        ))}
        </ul>  </div>

    </main>
    
  );
}