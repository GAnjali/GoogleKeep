import ResponseHandler from "./responseHandler";
import {getNotes} from "../service/noteservice";

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

export {getAllNotes};