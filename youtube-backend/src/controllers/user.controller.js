import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { User } from "../models/user.model.js";
import { uploadOnCloudinary } from "../utils/cloudinary.js";

const registerUser = asyncHandler(async (req, res) => {
    // PLAN
    // get user details
    // validation - not empty
    // check if user already exits: userName, email
    // check for images, for avatar(required)
    // upload them to cloudinary
    // create user object - create entry in db
    // remove password and refresh token field from response
    // check for user creation
    // return response

    // STEPS LEFT

    // get user details
    const { fullName, email, userName, password } = req.body;
    console.log("fullName: ", fullName);

    // validation - not empty
    // we are checking for all the fields in the array using some() method to check if after trimming, if any field is empty, we return error
    if (
        [fullName, email, userName, password].some(
            (field) => field?.trim() === "",
        )
    ) {
        throw new ApiError(400, "All fields are required");
    }

    // check if user already exits: userName, email
    // User is the mongoose model here
    const existedUser = User.findOne({
        // $ operator helps us use findOne function for both userName and email
        $or: [{ userName }, { email }],
    });
    if(existedUser){
        throw new ApiError(409, "User with email or username already exists");
    }


    // check for images, for avatar(required)
    // multer gives req.files option (we use ? to ensure that it exists)
    const avatarLocalPath = req.files?.avatar[0]?.path;
    const coverImageLocalPath = req.file?.coverImage[0]?.path;
    
    if(!avatarLocalPath){
        throw new ApiError(400, "Avatar file is required");
    }

    // upload them to cloudinary
    const avatar = await uploadOnCloudinary(avatarLocalPath);
    if(coverImageLocalPath){
        const coverImage = await uploadOnCloudinary(coverImageLocalPath);
    }

    if(!avatar){
        throw new ApiError(400, "Avatar file is required");
    }


    // create user object - create entry in db
    const user = await User.create({
        fullName,
        avatar: avatar.url,
        coverImage: coverImage?.url || "",
        email,
        password,
        userName: userName.toLowerCase()
    })
    
    // remove password and refresh token field from response
    // we find the user we just created and then select the fields that are needed using .select() method
    const createdUser = await User.findById(user._id).select(
        "-password -refreshToken"   // this is the syntax that is predefined
    )

    if(!createdUser){
        throw new ApiError(500, "Something went wrong while registering the user");
    }

    // return response
    return res.status(201).json(
        new ApiResponse(200, createdUser, "User registered successfully")
    )

});

export { registerUser };
