import axios from 'axios';
import type { Note, FetchNotesParams, FetchNotesResponse } from '../types/note';

const api = axios.create({
  baseURL: 'https://notehub-public.goit.study/api', 
});

export const fetchNotes = async ({
  page,
  perPage,
  search,
}: FetchNotesParams): Promise<FetchNotesResponse> => {
  const { data } = await api.get<FetchNotesResponse>('/notes', {
    params: { page, perPage, search },
  });
  return data;
};

export const createNote = async (
  note: Omit<Note, 'id' | 'createdAt'>
): Promise<Note> => {
  const { data } = await api.post<Note>('/notes', note);
  return data;
};

export const deleteNote = async (id: string): Promise<void> => {
  await api.delete(`/notes/${id}`);
};
