import app from "./../server";
import request from "supertest";
import pool from "../database/index";

describe('Test the File endpoints', () => {
    beforeEach(() => {
        return pool.query('START TRANSACTION');
    });
    afterEach(() => {
        return pool.query('ROLLBACK');
    });
    describe("Testing the getNotes API", () => {
        it("should get response as No notes found with status 404 when there are no notes available in db", async () => {
            const res = await request(app).get('/notes');
            expect(res.statusCode).toEqual(404);
            expect(res.body.message).toEqual("No notes found")
        });

        it("should get response as Notes found with status code 200 when you insert note in db", async () => {
            await pool.query("insert into notes(title,content) values('title', 'content')").then(async () => {
                const res = await request(app).get('/notes');
                expect(res.statusCode).toEqual(200);
                expect(res.body.message).toEqual("Notes retrieved");
            })
        });
    });

    describe("Testing the getNotesByID API", () => {
        it("should get response as Note not found with status 404 when there are no note available with given ID", async () => {
            const res = await request(app).get('/notes/1');
            expect(res.statusCode).toEqual(404);
            expect(res.body.message).toEqual("Cannot find Note with id: 1")
        });

        it("should get response as Note found with status code 200 when there exists note with given id", async () => {
            await pool.query("INSERT INTO notes(id,title,content) VALUES(1,'hell','hi') RETURNING *").then(async () => {
                const res = await request(app).get('/notes/1');
                expect(res.statusCode).toEqual(200);
                expect(res.body.message).toEqual("Note retrieved!");
            })
        });

        it("should get response status 400 given invalid id", async () => {
            const res = await request(app).get('/notes/&');
            expect(res.statusCode).toEqual(400);
            expect(res.body.message).toEqual("Please input a valid numeric value");
        });
    });

    describe("Testing the addNote API", () => {
        it("should get response with 201 when called addNote with note", async () => {
            const newNote = {title: 'title', content: 'content'};
            const res = await request(app).post('/notes').send(newNote);
            expect(res.status).toEqual(201);
            expect(res.body.message).toEqual("Note created!");
        });
    });

    describe("Testing the updateNote API", () => {
        it("should get response with 200 when called updateNote with note", async () => {
            const newNote = {id: 1, title: 'title', content: 'content'};
            await pool.query(`INSERT INTO notes(id,title,content) VALUES('${newNote.id}','${newNote.title}','${newNote.content}')`).then(async () => {
                const noteToUpdate = {id: 1, title: 'updateTitle', content: 'updateContent'};
                const res = await request(app).put('/notes/1').send(noteToUpdate);
                expect(res.statusCode).toEqual(200);
                expect(res.body.message).toEqual("Note updated!");
            });
        });

        it("should get response with 404 when called updateNote with id which does not exist in notes", async () => {
            const noteToUpdate = {id: 1, title: 'updateTitle', content: 'updateContent'};
            const res = await request(app).put('/notes/1').send(noteToUpdate);
            expect(res.statusCode).toEqual(404);
            expect(res.body.message).toEqual("Cannot find Note with id: 1");
        });

        it("should get response with 404 when called updateNote with invalid note id as param", async () => {
            const noteToUpdate = {id: 'A', title: 'updateTitle', content: 'updateContent'};
            const res = await request(app).put('/notes/A').send(noteToUpdate);
            expect(res.statusCode).toEqual(400);
            expect(res.body.message).toEqual("Please input a valid numeric value");
        });
    });

    describe("Testing the deleteNote API", () => {
        it("should get response with 200 when called deletedNote with note id", async () => {
            const newNote = {id: 1, title: 'title', content: 'content'};
            await pool.query(`INSERT INTO notes(id,title,content) VALUES('${newNote.id}','${newNote.title}','${newNote.content}')`).then(async () => {
                const res = await request(app).delete('/notes/1');
                expect(res.statusCode).toEqual(200);
                expect(res.body.message).toEqual("Note deleted!");
            });
        });

        it("should get response with 404 when called deleteNote with id which does not exist in Database", async () => {
            const res = await request(app).delete('/notes/1');
            expect(res.statusCode).toEqual(404);
            expect(res.body.message).toEqual("Cannot find Note with id: 1");
        });

        it("should get response with 404 when called deleteNote with invalid note id as param", async () => {
            const res = await request(app).put('/notes/A');
            expect(res.statusCode).toEqual(400);
            expect(res.body.message).toEqual("Please input a valid numeric value");
        });
    });
});