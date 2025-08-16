import css from './NoteList.module.css';
import type { Note } from '../../types/note';
import { deleteNote } from '../../services/noteService';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import type { AxiosError } from 'axios';

interface NoteListProps {
  notes?: Note[];
}

export default function NoteList({ notes = [] }: NoteListProps) {
  const queryClient = useQueryClient();

  const deleteMutation = useMutation<Note, AxiosError, string>({
    mutationFn: deleteNote,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["notes"] });
    },
    onError: (error: AxiosError) => {
      console.error("Error deleting note:", error.response?.data || error.message);
    },
  });

  if (!notes.length) return null;
  
   return (
    <>
      <ul className={css.list}>
        {notes.map((note) => (
          <li key={note.id} className={css.listItem}>
            <h2 className={css.title}>{note.title}</h2>
            <p className={css.content}>{note.content}</p>
            <div className={css.footer}>
              <span className={css.tag}>{note.tag}</span>
              <div className={css.actions}>
                <button
                  className={`${css.button} ${css.delete} `}
                  onClick={() => deleteMutation.mutate(note.id)}
                >
                  Delete
                </button>
              </div>
            </div>
          </li>
        ))}
      </ul>
    </>
  );
}