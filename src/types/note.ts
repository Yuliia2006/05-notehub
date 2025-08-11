export type NoteTag = 'work' | 'personal' | 'idea';

export interface Note {
  id: string;
  title: string;
  content: string;
  tag: NoteTag;
  createdAt: string;
}

export interface FetchNotesParams {
  page: number;
  perPage: number;
  search?: string;
}

export interface FetchNotesResponse {
  results: Note[];
  totalPages: number;
  totalNotes: number;
}