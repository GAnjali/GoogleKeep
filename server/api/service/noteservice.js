import db from '../../database';

const getNotes = (request, response) => {
    db.query('SELECT * FROM notes', (error, result) => {
        if (error)
            return error;
        response.status(200).json(result.rows);
    })
};

export default getNotes;