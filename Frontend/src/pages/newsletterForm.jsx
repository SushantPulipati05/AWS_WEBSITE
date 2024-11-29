import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const NewsletterForm = () => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();

    const newNewsletter = {
      title,
      content,
      imageUrl,
    };

    try {
      const response = await fetch('http://localhost:8000/newsletters/add', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newNewsletter),
      });

      if (response.ok) {
        alert('Newsletter created successfully');
        navigate('/news');
      } else {
        throw new Error('Failed to create newsletter');
      }
    } catch (error) {
      alert('Error: ' + error.message);
    }
  };

  return (
    <div className="wrapper">
      <h2 className="text-2xl font-semibold mb-4">Create New Newsletter</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="title" className="block font-semibold">Title</label>
          <input
            id="title"
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded"
            required
          />
        </div>
        <div>
          <label htmlFor="content" className="block font-semibold">Content</label>
          <textarea
            id="content"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded"
            required
          />
        </div>
        <div>
          <label htmlFor="imageUrl" className="block font-semibold">Image URL (optional)</label>
          <input
            id="imageUrl"
            type="text"
            value={imageUrl}
            onChange={(e) => setImageUrl(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded"
          />
        </div>
        <div>
          <button type="submit" className="px-6 py-2 bg-green-600 text-white rounded-lg">
            Create Newsletter
          </button>
        </div>
      </form>
    </div>
  );
};

export default NewsletterForm;
