import db from '../../database';
import {DELETE_NOTE, GET_ALL_NOTES, GET_ONE_NOTE, INSERT_NOTE, UPDATE_NOTE} from "../util/ServerConstants";
import util from 'util';

const getAll = async () => {
    try {
        const response = await db.query(GET_ALL_NOTES);
        return response.rows;
    } catch (e) {
        return e;
    }
};

const getOne = async (id) => {
    try {
        const response = await db.query(util.format(GET_ONE_NOTE, id));
        return response.rows;
    } catch (e) {
        return e;
    }
};

const insert = async (note) => {
    try {
        await db.query(util.format(INSERT_NOTE, note.title, note.content));
    } catch (e) {
        return e;
    }
};

const update = async (note) => {
    try {
        const noteToUpdate = await db.query(util.format(GET_ONE_NOTE, note.id)).then((response) => {
            return response.rows;
        });
        if (noteToUpdate.length == 0)
            return null;
        await db.query(util.format(UPDATE_NOTE, note.title, note.content, note.id));
        return note;
    } catch (e) {
        return e;
    }
};

const deleteOne = async (note) => {
    try {
        const noteToDelete = await db.query(util.format(GET_ONE_NOTE, note.id)).then((response) => {
            return response.rows;
        });
        if (noteToDelete.length == 0)
            return null;
        await db.query(util.format(DELETE_NOTE, note.id));
        return note;
    } catch (e) {
        return e;
    }
};

export {getAll, getOne, insert, update, deleteOne};