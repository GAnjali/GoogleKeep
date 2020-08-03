//Query constants
export const GET_ALL_NOTES = 'SELECT * FROM notes';
export const GET_ONE_NOTE = 'SELECT * FROM notes WHERE id = %d';
export const INSERT_NOTE = 'INSERT INTO notes(title,content) VALUES (%s,%s)';
export const UPDATE_NOTE = 'UPDATE notes SET title = %s,content = %s WHERE id = %d';
export const DELETE_NOTE = 'DELETE FROM notes WHERE id = %d';
//API response message constants
export const NOTES_RETRIEVED = "Notes retrieved!";
export const NOTES_NOT_FOUND = "Notes not found!";
export const INVALID_NOTE_ID = "Invalid note ID!";
export const NOTE_RETRIEVED = "Note retrieved!";
export const NOTE_NOT_FOUND_WITH_ID = "Note not found with id: %d";
export const NOTE_CREATED = "Note created!";
export const NOTE_UPDATED = "Note updated!";
export const NOTE_DELETED = "Note deleted!";
