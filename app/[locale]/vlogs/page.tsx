'use client'

import React from 'react'
import { PortableText, PortableTextComponents } from '@portabletext/react'

const components: PortableTextComponents = {
  block: {
    h1: ({ children }) => (
      <h1 className="text-3xl md:text-4xl font-extrabold mt-8 mb-4 text-white">
        {children}
      </h1>
    ),
    h2: ({ children }) => (
      <h2 className="text-2xl md:text-3xl font-bold mt-8 mb-3 text-orange-500">
        {children}
      </h2>
    ),
    h3: ({ children }) => (
      <h3 className="text-xl md:text-2xl font-semibold mt-6 mb-2 text-white">
        {children}
      </h3>
    ),
    normal: ({ children }) => (
      <p className="mb-4 text-neutral-300 leading-relaxed text-base md:text-lg">
        {children}
      </p>
    ),
    blockquote: ({ children }) => (
      <blockquote className="border-l-4 border-orange-500 pl-4 py-2 my-6 italic text-neutral-200 bg-neutral-900/50 rounded-r">
        {children}
      </blockquote>
    ),
  },
  list: {
    bullet: ({ children }) => (
      <ul className="list-disc list-inside mb-4 space-y-2 text-neutral-300 pl-2">
        {children}
      </ul>
    ),
    number: ({ children }) => (
      <ol className="list-decimal list-inside mb-4 space-y-2 text-neutral-300 pl-2">
        {children}
      </ol>
    ),
  },
  listItem: {
    bullet: ({ children }) => <li className="leading-relaxed">{children}</li>,
    number: ({ children }) => <li className="leading-relaxed">{children}</li>,
  },
  marks: {
    strong: ({ children }) => (
      <strong className="font-bold text-white">{children}</strong>
    ),
    em: ({ children }) => <em className="italic text-neutral-200">{children}</em>,
    link: ({ value, children }) => {
      const href = value?.href || '#'
      return (
        <a
          href={href}
          target="_blank"
          rel="noopener noreferrer"
          className="text-orange-400 underline hover:text-orange-300 transition-colors"
        >
          {children}
        </a>
      )
    },
  },
}

export default function VlogContent({ post }: { post: any }) {
  // Extrae el array de bloques dando soporte a "content" o "body"
  const contentData = post?.content || post?.body || []

  if (!contentData || contentData.length === 0) {
    return null
  }

  return (
    <div className="mt-8">
      <PortableText value={contentData} components={components} />
    </div>
  )
}
