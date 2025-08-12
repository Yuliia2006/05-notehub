import axios from 'axios';
import type { FetchNotesParams, FetchNotesResponse } from './noteService';

const api = axios.create({
  baseURL: 'https://notehub-public.goit.study/api', 
});

export async function fetchNotes({ page, perPage, search = '' }: FetchNotesParams): Promise<FetchNotesResponse> {
  const { data } = await api.get<FetchNotesResponse>('/api/notes', {
    params: { page, perPage, search },
  });
  return data;
}