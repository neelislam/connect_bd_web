import React from 'react'
import Link from 'next/link'
export default function BlogLayout({ children }) {
  return (
    <div>
        <nav className="bg-gray-200 p-4">
          <ul className="flex gap-4">
            <li><Link href="/blog">Blog</Link></li>
            <li><Link href="/blog/posts">Posts</Link></li>
          </ul>
        </nav>
      {children}
    </div>
  )
}

