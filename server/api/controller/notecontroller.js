import ResponseHandler from "../util/responseHandler";
import {getNotes, getNoteById} from "../service/noteservice";

const responseHandler = new ResponseHandler();
const getAllNotes = async (request, response) => {
    try {
        const notes = await getNotes();
        if (notes.length > 0) {
            responseHandler.setSuccess(200, "Notes retrieved", notes);
        } else {
            responseHandler.setSuccess(404, "No notes found");
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
        responseHandler.setError(400, "Please input a valid numeric value");
        return responseHandler.send(response);
    }
    try {
        const note = await getNoteById(id);
        if (note.length > 0)
            responseHandler.setSuccess(200, "Note retrieved!", note);
        else
            responseHandler.setSuccess(404, "Cannot find Note with id: " + id);
        return responseHandler.send(response);
    } catch (error) {
        responseHandler.setError(400, error);
        return responseHandler.send(response);
    }
};

export {getAllNotes, getOneNote};