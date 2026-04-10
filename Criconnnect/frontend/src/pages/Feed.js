import React, { useState } from 'react';
import { usePlayer } from '../context/PlayerContext';
import Button from '../components/Button';

const Feed = () => {
  const { state, addPost } = usePlayer();
  const [content, setContent] = useState('');

  const submit = () => {
    if (!content.trim()) return;
    const post = { id: Date.now(), playerName: 'You', content: content.trim(), time: new Date().toISOString(), likes: 0 };
    addPost(post);
    setContent('');
  };

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">Feed</h1>
      <div className="mb-4 bg-white p-4 rounded shadow">
        <textarea value={content} onChange={(e) => setContent(e.target.value)} className="w-full p-2 border rounded" placeholder="Post a match request or update" rows={3} />
        <div className="mt-2 text-right">
          <Button className="bg-blue-600 text-white" onClick={submit}>Post</Button>
        </div>
      </div>

      <div className="space-y-4">
        {state.posts.map((p) => (
          <div key={p.id} className="bg-white p-4 rounded shadow">
            <div className="flex justify-between items-start">
              <div>
                <div className="font-semibold">{p.playerName}</div>
                <div className="text-sm text-gray-500">{new Date(p.time).toLocaleString()}</div>
              </div>
              <div className="flex items-center space-x-2">
                <button className="text-sm text-gray-600">Like</button>
                <button className="text-sm text-gray-600">Comment</button>
              </div>
            </div>
            <div className="mt-2">{p.content}</div>
          </div>
        ))}
        {state.posts.length === 0 && <div className="text-center text-gray-500">No posts yet</div>}
      </div>
    </div>
  );
};

export default Feed;
