import ResponseHandler from "../util/responseHandler";
import {getAll, getOne, insert, update, deleteOne} from "../service/noteservice";
import {
    INVALID_NOTE_ID, NOTE_CREATED, NOTE_DELETED,
    NOTE_NOT_FOUND_WITH_ID,
    NOTE_RETRIEVED, NOTE_UPDATED,
    NOTES_NOT_FOUND,
    NOTES_RETRIEVED
} from "../util/ServerConstants";
import util from 'util';

const responseHandler = new ResponseHandler();
const getAllNotes = async (request, response) => {
    try {
        const notes = await getAll();
        if (notes.length > 0) {
            responseHandler.setSuccess(200, NOTES_RETRIEVED, notes);
        } else {
            responseHandler.setSuccess(404, NOTES_NOT_FOUND);
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
        responseHandler.setError(400, INVALID_NOTE_ID);
        return responseHandler.send(response);
    }
    try {
        const note = await getOne(id);
        if (note.length > 0)
            responseHandler.setSuccess(200, NOTE_RETRIEVED, note);
        else
            responseHandler.setSuccess(404, util.format(NOTE_NOT_FOUND_WITH_ID, id));
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
            responseHandler.setSuccess(201, NOTE_CREATED, note);
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
        responseHandler.setError(400, INVALID_NOTE_ID);
        return responseHandler.send(response);
    }
    try {
        const updatedFile = await update(note);
        if (updatedFile == null)
            responseHandler.setSuccess(404, util.format(NOTE_NOT_FOUND_WITH_ID, note.id));
        else
            responseHandler.setSuccess(200, NOTE_UPDATED, note);
        return responseHandler.send(response);
    } catch (error) {
        responseHandler.setError(400, error);
        return responseHandler.send(response);
    }
};

const deleteNote = async (request, response) => {
    const note = {id: request.params.id, title: request.body.title, content: request.body.content};
    if (!Number(note.id)) {
        responseHandler.setError(400, INVALID_NOTE_ID);
        return responseHandler.send(response);
    }
    try {
        const deletedNote = await deleteOne(note);
        if (deletedNote == null)
            responseHandler.setSuccess(404, util.format(NOTE_NOT_FOUND_WITH_ID, note.id));
        else
            responseHandler.setSuccess(200, NOTE_DELETED);
        return responseHandler.send(response);
    } catch (error) {
        responseHandler.setError(400, error);
        return responseHandler.send(response);
    }
};

export {getAllNotes, getOneNote, addNote, updateNote, deleteNote};