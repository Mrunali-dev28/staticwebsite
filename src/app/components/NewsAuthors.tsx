import React from 'react';
import { NewsAuthor } from '@/lib/contentstack';

interface NewsAuthorsProps {
  newsAuthors: NewsAuthor[];
}

export default function NewsAuthors({ newsAuthors }: NewsAuthorsProps) {
  if (!newsAuthors || newsAuthors.length === 0) {
    return (
      <section className="mb-16">
        <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">
          👥 Our Team
        </h2>
        <div className="text-center py-8">
          <div className="text-gray-400 text-6xl mb-4">👥</div>
          <p className="text-gray-500 text-lg">
            No authors available at the moment
          </p>
        </div>
      </section>
    );
  }

  return (
    <section className="mb-16">
      <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">
        👥 Our Team
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {newsAuthors.map((author) => (
          <article 
            key={author.uid} 
            className="bg-white p-6 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300"
          >
            <div className="text-center">
              {author.file && (
                <div className="mb-4">
                  <img 
                    src={author.file.url} 
                    alt={author.file.filename}
                    className="w-24 h-24 rounded-full object-cover mx-auto border-4 border-blue-100"
                  />
                </div>
              )}
              <h3 className="text-xl font-bold text-gray-900 mb-2">
                {author.title}
              </h3>
              {author.rich_text_editor && (
                <p className="text-gray-600 text-sm leading-relaxed">
                  {author.rich_text_editor}
                </p>
              )}
              <div className="mt-4">
                <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                  News Author
                </span>
              </div>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
} 