class ExtendedError extends Error {
    constructor(status, msg) {
        super(msg);
        this.msg = msg;
        this.status = status;
    }
}

module.exports = ExtendedError;
