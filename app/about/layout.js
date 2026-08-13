import React from 'react'
import Link from 'next/link'
export default function AboutLayout({ children }) {
  return (
    <div>
        <nav className="bg-gray-200 p-4">
          <ul className="flex gap-4">
            <li><Link href="/about">About</Link></li>
            <li><Link href="/about/mission">Mission</Link></li>
            <li><Link href="/about/team">Team</Link></li>
          </ul>
        </nav>
      {children}
    </div>
  )
}

