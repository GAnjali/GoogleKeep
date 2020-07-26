import express from 'express';
import getNotes from './api/service/noteservice'

const app = express();
app.get('', (request, response) => {
    response.send("Welcome to Google-Keep")
});
app.get('/notes', getNotes);

app.listen(3000, () => {
});

export default app;