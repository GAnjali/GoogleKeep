import db from '../../database';

const getAll = async () => {
    try {
        const response = await db.query('SELECT * FROM notes');
        return response.rows;
    } catch (e) {
        return e;
    }
};

const getOne = async (id) => {
    try {
        const response = await db.query('SELECT * FROM notes where id =' + id);
        return response.rows;
    } catch (e) {
        return e;
    }
};

const insert = async (note) => {
    try {
        await db.query(`insert into notes(title,content) values('${note.title}','${note.content}')`);
    } catch (e) {
        return e;
    }
};

const update = async (note) => {
    try {
        const noteToUpdate = await db.query(`select * from notes where id = '${note.id}'`).then((response) => {
            return response.rows;
        });
        if (noteToUpdate.length == 0)
            return null;
        await db.query(`UPDATE notes SET title = '${note.title}',content = '${note.content}' WHERE id = 3`);
        return note;
    } catch (e) {
        return e;
    }
};

const deleteOne = async (note) => {
    try {
        const noteToDelete = await db.query(`select * from notes where id = '${note.id}'`).then((response) => {
            return response.rows;
        });
        if (noteToDelete.length == 0)
            return null;
        await db.query(`DELETE from notes WHERE id = '${note.id}'`);
        return note;
    } catch (e) {
        return e;
    }
};

export {getAll, getOne, insert, update, deleteOne};