import axios from "axios";

const getNotes = async () => {
    try {
        return await axios.get("http://localhost:3000/notes");
    } catch (err) {
        return err;
    }
};

const addNote = async (note) => {
    try {
        return await axios.post("http://localhost:3000/notes", note);
    } catch (err) {
        return err;
    }
};

const updateNote = async (note) => {
    try {
        return await axios.put("http://localhost:3000/notes/" + note.id, note);
    } catch (err) {
        return err;
    }
};

const deleteNote = async (noteId) => {
    try {
        return await axios.delete("http://localhost:3000/notes/" + noteId);
    } catch (err) {
        return err;
    }
};

export {getNotes, addNote, updateNote, deleteNote};