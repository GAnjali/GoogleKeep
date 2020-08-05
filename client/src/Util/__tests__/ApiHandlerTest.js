import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';
import {getNotes, addNote} from "../ApiHandler";

describe('Home API Service', () => {
    let mock;
    beforeEach(() => {
        mock = new MockAdapter(axios);
    });
    describe('getNotes', () => {
        it('should return response with status 200 and empty data when getNotes is called', async () => {
            mock.onGet(`http://localhost:3000/notes`).reply(200, {});
            await getNotes().then((response) => {
                expect(response.status).toEqual(200);
                expect(response.data).toEqual({});
            });
        });

        it('should returns response with status 400 when getNotes is called', async () => {
            mock.onGet(`http://localhost:3000/notes`).reply(400);
            await getNotes().then((response) => {
                expect(response.response.status).toEqual(400);
            });
        });
    });

    describe('addNote', () => {
        it('should return response of status 201 with note created when addNote is called', async () => {
            const note = {title: "title", content: "content"};
            mock.onPost(`http://localhost:3000/notes`, note).reply(201, note);
            await addNote(note).then((response) => {
                expect(response.status).toEqual(201);
                expect(response.data).toEqual(note);
            });
        });

        it('should return response of status 400 with note created when addNote is called', async () => {
            const note = {title: "title", content: "content"};
            mock.onPost(`http://localhost:3000/notes`, note).reply(400);
            await addNote(note).then((response) => {
                expect(response.response.status).toEqual(400);
            });
        });
    })
});