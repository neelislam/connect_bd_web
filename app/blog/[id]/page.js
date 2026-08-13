import React from 'react'
import { notFound } from 'next/navigation';

export default function BlogPage({ params }) {

    const { id } = params;
    if ( id === '3') {
        notFound();
    }
  return (
    <div>
        <h1>Blog Post {id}</h1>
    </div>
  )
}
