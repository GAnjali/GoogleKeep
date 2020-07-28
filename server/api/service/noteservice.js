import db from '../../database';

const getNotes = async () => {
    try {
        const response = await db.query('SELECT * FROM notes');
        return response.rows;
    } catch (e) {
        return e;
    }
};

export {getNotes};