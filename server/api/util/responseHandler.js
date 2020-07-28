export default class ResponseHandler {
    constructor() {
        this.statusCode = null;
        this.status = null;
        this.data = null;
        this.message = null;
    }

    setSuccess(statusCode, message, data) {
        this.statusCode = statusCode;
        this.message = message;
        this.data = data;
        this.status = "success";
    }

    setError(statusCode, message) {
        this.statusCode = statusCode;
        this.message = message;
        this.status = "error";
    }

    send(response) {
        if (this.status === "success") {
            const result = {
                status: this.status,
                message: this.message,
                data: this.data
            };
            return response.status(this.statusCode).json(result);
        }
        return response.status(this.statusCode).json({
            status: this.status,
            message: this.message
        });
    }
}