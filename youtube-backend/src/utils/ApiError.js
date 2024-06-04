class ApiError extends Error{
    constructor(
        statusCode,
        message = "Something went wrong",
        errors = [],
        stacc = ""
    ){
        super(message)
        this.statusCode = statusCode
        this.data = null
        this.message = message
        this.success = false
        this.errors = errors
        
        if(stack){
            this.stack = stacc
        }else{
            Error.captureStackTrace(this, this.constructor)
        }
    }
}

export {ApiError}