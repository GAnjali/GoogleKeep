import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';
import getNotes from "../ApiHandler";

describe('Home API Service', () => {
    let mock;
    beforeEach(() => {
        mock = new MockAdapter(axios);
    });
    it('returns data when getNotes is called and response with status 200', async () => {
        mock.onGet(`http://localhost:3000/notes`).reply(200);
        await getNotes().then((response) => {
            expect(response.status).toEqual(200);
        });
    });

    it('returns empty array of data when getNotes is called and response with status 200', async () => {
        mock.onGet(`http://localhost:3000/notes`).reply(200, {});
        await getNotes().then((response) => {
            expect(response.data).toEqual({});
        });
    });

    it('returns error when getNotes is called and response with status 400', async () => {
        mock.onGet(`http://localhost:3000/notes`).reply(400);
        await getNotes().then((response) => {
            expect(response.response.status).toEqual(400);
        });
    });
});