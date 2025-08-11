import axios from 'axios';
import type { NoteResponse } from '../types/types';


export async function fetchNotes(page: number, search: string): Promise<NoteResponse > {
  const { data } = await axios.get<NoteResponse>('/api/notes', {
    params: { page, search },
  });
  return data;
}