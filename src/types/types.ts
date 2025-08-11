export type NoteTag = 'work' | 'personal' | 'other';

export interface Note {
  id: string;
  title: string;
  content: string;
  tag: NoteTag;
}

export interface NoteResponse {
  notes: Note[];
  totalPages: number;
}