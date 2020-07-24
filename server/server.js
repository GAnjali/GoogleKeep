import express from 'express';

const app = express();
app.get('', (request, response) => {
    response.send("Welcome to Google-Keep")
});

app.listen(3000, () => {
});

export default app;