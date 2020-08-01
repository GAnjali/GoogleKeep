import ResponseHandler from "../util/responseHandler";
import {getAll, getOne, insert, update, deleteOne} from "../service/noteservice";

const responseHandler = new ResponseHandler();
const getAllNotes = async (request, response) => {
    try {
        const notes = await getAll();
        if (notes.length > 0) {
            responseHandler.setSuccess(200, "Notes retrieved!", notes);
        } else {
            responseHandler.setSuccess(404, "Notes not found!");
        }
        return responseHandler.send(response);
    } catch (error) {
        responseHandler.setError(400, error);
        return responseHandler.send(response);
    }
};

const getOneNote = async (request, response) => {
    const {id} = request.params;
    if (!Number(id)) {
        responseHandler.setError(400, "Invalid note ID!");
        return responseHandler.send(response);
    }
    try {
        const note = await getOne(id);
        if (note.length > 0)
            responseHandler.setSuccess(200, "Note retrieved!", note);
        else
            responseHandler.setSuccess(404, "Note not found with id: " + id);
        return responseHandler.send(response);
    } catch (error) {
        responseHandler.setError(400, error);
        return responseHandler.send(response);
    }
};

const addNote = async (request, response) => {
    const note = {title: request.body.title, content: request.body.content};
    try {
        await insert(note).then(() => {
            responseHandler.setSuccess(201, "Note created!", note);
        });
        return responseHandler.send(response);
    } catch (error) {
        responseHandler.setError(400, error);
        return responseHandler.send(response);
    }
};

const updateNote = async (request, response) => {
    const note = {id: request.params.id, title: request.body.title, content: request.body.content};
    if (!Number(note.id)) {
        responseHandler.setError(400, "Invalid note ID!");
        return responseHandler.send(response);
    }
    try {
        const updatedFile = await update(note);
        if (updatedFile == null)
            responseHandler.setSuccess(404, "Note not found with id: " + note.id);
        else
            responseHandler.setSuccess(200, "Note updated!", note);
        return responseHandler.send(response);
    } catch (error) {
        responseHandler.setError(400, error);
        return responseHandler.send(response);
    }
};

const deleteNote = async (request, response) => {
    const note = {id: request.params.id, title: request.body.title, content: request.body.content};
    if (!Number(note.id)) {
        responseHandler.setError(400, "Invalid note ID!");
        return responseHandler.send(response);
    }
    try {
        const deletedNote = await deleteOne(note);
        if (deletedNote == null)
            responseHandler.setSuccess(404, "Note not found with id: " + note.id);
        else
            responseHandler.setSuccess(200, "Note deleted!");
        return responseHandler.send(response);
    } catch (error) {
        responseHandler.setError(400, error);
        return responseHandler.send(response);
    }
};

export {getAllNotes, getOneNote, addNote, updateNote, deleteNote};