// implementation using promises

const asyncHandler =  (requestHandler) => {
    (req,res,next) => {
        Promise.resolve(requestHandler(req,res,next))
        .catch((err) => next(err))
    }
}

export {asyncHandler}

// implementation using try-catch block

// const asyncHandler = (fn) => async (req,res,next) => {
//     try {
        
//     } catch (error) {
//         res.status(error.status || 500).json({
//             success: false,
//             message: error.message,
//         })
//     }
// }
// export {asyncHandler}

