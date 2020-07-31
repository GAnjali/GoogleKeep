import express from 'express';
import {getAllNotes, getOneNote, addNote} from './api/controller/notecontroller'

const app = express();
app.use(express.json());
process.env.NODE_ENV = "development";

app.get('/notes', getAllNotes);
app.get('/notes/:id', getOneNote);
app.post('/notes', addNote);

app.listen(3000);

export default app;