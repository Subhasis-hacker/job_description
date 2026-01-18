import React, { useState, useEffect } from 'react';
import { generateJobDescription, getDrafts, deleteDraft } from './api.jsx';

export default function App() {
  const [jobTitle, setJobTitle] = useState('');
  const [industry, setIndustry] = useState('');
  const [drafts, setDrafts] = useState([]);
  const [generated, setGenerated] = useState(null);

  useEffect(() => {
    fetchDrafts();
  }, []);

  const fetchDrafts = async () => {
    try {
      const data = await getDrafts();
      setDrafts(data);
    } catch (err) {
      console.error(err);
    }
  };

  const handleGenerate = async (e) => {
    e.preventDefault();
    try {
      const data = await generateJobDescription({ job_title: jobTitle, industry });
      setGenerated(data);
      fetchDrafts();
    } catch (err) {
      console.error(err);
    }
  };

  const handleDelete = async (id) => {
    try {
      await deleteDraft(id);
      fetchDrafts();
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div style={{ padding: '2rem', fontFamily: 'sans-serif' }}>
      <h1>Job Description Generator</h1>

      <form onSubmit={handleGenerate} style={{ marginBottom: '2rem' }}>
        <input
          type="text"
          placeholder="Job Title"
          value={jobTitle}
          onChange={(e) => setJobTitle(e.target.value)}
          required
          style={{ marginRight: '1rem' }}
        />
        <input
          type="text"
          placeholder="Industry"
          value={industry}
          onChange={(e) => setIndustry(e.target.value)}
          required
          style={{ marginRight: '1rem' }}
        />
        <button type="submit">Generate</button>
      </form>

      {generated && (
        <div style={{ marginBottom: '2rem' }}>
          <h2>Generated Job Description</h2>
          <pre>{JSON.stringify(generated, null, 2)}</pre>
        </div>
      )}

      <h2>Drafts</h2>
      <ul>
        {drafts.map((draft) => (
          <li key={draft.id} style={{ marginBottom: '1rem' }}>
            <strong>{draft.job_title}</strong> - {draft.industry}{' '}
            <button onClick={() => handleDelete(draft.id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
}
