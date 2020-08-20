export default class ResponseHandler {
    constructor() {
        this.statusCode = null;
        this.type = null;
        this.data = null;
        this.message = null;
    }

    static getResponse(response) {
        if (response.status === undefined) {
            this.setError(response.message);
        } else if (response.status === 200 && response.data.status === "success") {
            if (response.data.data !== undefined) {
                this.setSuccess(response.data.message, response.data.data);
            } else {
                this.setSuccess(response.data.message, []);
            }
        } else if (response.status === 400 && response.data.status === "success") {
            this.setError(response.data.message);
        }
        return {
            status: this.type,
            message: this.message,
            data: this.data
        };
    }

    static setSuccess(message, data) {
        this.message = message;
        this.data = data;
        this.type = "success";
    }

    static setError(message) {
        this.message = message;
        this.type = "error";
    }
}