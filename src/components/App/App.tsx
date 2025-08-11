import { useState } from 'react';
import { useQuery, useMutation, useQueryClient, keepPreviousData, } from '@tanstack/react-query';
import { useDebounce } from 'use-debounce';
import css from './App.module.css';

import SearchBox from '../SearchBox/SearchBox';
import Pagination from '../Pagination/Pagination';
import NoteList from '../NoteList/NoteList';
import Modal from '../Modal/Modal';
import NoteForm from '../NoteForm/NoteForm';

import { fetchNotes, deleteNote, createNote } from '../../services/noteService';
import type { Note } from '../../types/note';

export default function App() {
  const [page, setPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [debouncedSearch] = useDebounce(searchTerm, 300);

  const queryClient = useQueryClient();

  const { data, isLoading, isError } = useQuery({
    queryKey: ['notes', page, debouncedSearch],
    queryFn: () => fetchNotes({ page, perPage: 12, search: debouncedSearch }),
     placeholderData: keepPreviousData,
  });

  const deleteMutation = useMutation({
    mutationFn: deleteNote,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['notes'] });
    },
  });

  const createMutation = useMutation({
    mutationFn: createNote,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['notes'] });
      closeModal();
    },
  });

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  const handleDelete = (id: string) => {
    deleteMutation.mutate(id);
  };

  const handleCreate = (note: Omit<Note, 'id' | 'createdAt'>) => {
    createMutation.mutate(note);
  };

  const notes = data?.results ?? [];
  const totalPages = data?.totalPages ?? 0;

  return (
    <div className={css.app}>
      <header className={css.toolbar}>
        <SearchBox value={searchTerm} onChange={setSearchTerm} />
        {totalPages > 1 && <Pagination pageCount={totalPages} onPageChange={setPage} />}
        <button className={css.button} onClick={openModal}>
          Create note +
        </button>
      </header>

      {isLoading && <p>Loading...</p>}
      {isError && <p>Error loading notes</p>}
      {notes.length > 0 ? (
        <NoteList notes={notes} onDelete={handleDelete} />
      ) : (
        !isLoading && <p>No notes found</p>
      )}

      {isModalOpen && (
        <Modal onClose={closeModal}>
          <NoteForm onSubmit={handleCreate} onCancel={closeModal} />
        </Modal>
      )}
    </div>
  );
}