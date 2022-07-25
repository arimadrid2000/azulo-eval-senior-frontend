import { Note } from './notesInterface'

export interface Book {
    id: number,
    name: string,
    notes: Note[],
}