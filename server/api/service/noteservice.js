import db from '../../database';

const getNotes = async () => {
    try {
        const response = await db.query('SELECT * FROM notes');
        return response.rows;
    } catch (e) {
        return e;
    }
};

const getNoteById = async (id) => {
    try {
        const response = await db.query('SELECT * FROM notes where id =' + id);
        return response.rows;
    } catch (e) {
        return e;
    }
};

const insertNote = async (note) => {
    try {
       await db.query(`insert into notes(title,content) values('${note.title}','${note.content}')`);
    } catch (e) {
        return e;
    }
};

export {getNotes, getNoteById, insertNote};