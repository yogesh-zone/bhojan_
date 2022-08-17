class ErrorHandler extends Error{
    constructor(message,statusCode){
        console.log(message);
        super(message);
        this.message = message;
        this.statusCode = statusCode;

        Error.captureStackTrace(this,this.constructor);
    }
}

module.exports = ErrorHandler;