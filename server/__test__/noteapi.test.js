import app from "./../server";
import request from "supertest";
import pool from "../database/index";

describe("Testing the getNotes API", () => {
    beforeEach(() => {
        return pool.query('START TRANSACTION');
    });
    afterEach(() => {
        return pool.query('ROLLBACK');
    });
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