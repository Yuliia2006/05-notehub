import { useEffect, useState } from 'react';
import type { Note } from '../../types/note';
import { fetchNotes } from '../../services/api';


export default function App() {
  const [notes, setNotes] = useState<Note []>([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(false);

  const perPage = 6;

  useEffect(() => {
    const loadNotes = async () => {
      setLoading(true);
      try {
        const data = await fetchNotes({ page, perPage, search: '' });
        setNotes(data.results);
        setTotalPages(data.totalPages);
      } catch (error) {
        console.error('Error fetching notes:', error);
      } finally {
        setLoading(false);
      }
    };
    loadNotes();
  }, [page]);

  return (
    <div style={{ padding: '20px' }}>
      <h1>Notes</h1>

      {loading && <p>Loading...</p>}

      {!loading && notes.length === 0 && <p>No notes found.</p>}

      <div style={{ display: 'grid', gap: '10px', gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))' }}>
        {notes.map(note => (
          <div key={note.id} style={{ border: '1px solid #ccc', padding: '10px', borderRadius: '8px' }}>
            <h3>{note.title}</h3>
            <p>{note.content}</p>
            <small>Tag: {note.tag}</small>
            <br />
            <small>Created: {new Date(note.createdAt).toLocaleString()}</small>
          </div>
        ))}
      </div>

      <div style={{ marginTop: '20px' }}>
        <button onClick={() => setPage(p => p - 1)} disabled={page === 1}>
          Prev
        </button>
        <span style={{ margin: '0 10px' }}>
          Page {page} of {totalPages}
        </span>
        <button onClick={() => setPage(p => p + 1)} disabled={page === totalPages}>
          Next
        </button>
      </div>
    </div>
  );
}