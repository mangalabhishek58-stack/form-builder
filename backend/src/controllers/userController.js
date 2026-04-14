const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken');
const UserModel = require('../models/User');
const FolderModel = require('../models/Folder');

function handleLogin() {
    return async (req, res, next) => {

        try {
            const { email, password } = req.body;
            // email = email.toLowerCase()
            // throw new Error('Login Error')
            const existingUser = await UserModel.findOne({ email: email });
            if (!existingUser) {
                return res.status(400).json({
                    status: 'Failed',
                    message: 'User Not Found',
                });
            }
            const passwordMatch = await bcrypt.compare(password, existingUser.password);
            if (!passwordMatch) {
                return res.status(400).json({
                    status: 'Failed',
                    message: 'Incorrect Password',
                });

            }
            const jwToken = jwt.sign({ id: existingUser._id }, process.env.JWT_Private_Key);
            res.status(200).json({
                status: 'Success',
                message: 'Login successfully',
                userToken: jwToken
            });
        } catch (err) {
            next("Error Logging In", err);
        }
    };
}

function registerUser() {
    return async (req, res, next) => {
        try {
            const { userName, email , password } = req.body;
            // throw new Error('creating Register Page Error')
            const existingUser = await UserModel.findOne({ email: email });
            if (existingUser) {
                return res.status(400).json({
                    message: "User already Exist Please use another Email "
                });
            }
            const hashedPassword = await bcrypt.hash(password, 10);
            
            const newUser = new UserModel({
                userName,
                email,
                password: hashedPassword
            });
            const newFolder = new FolderModel({
                folderName: 'Default',
                // index:0,
                userId : newUser
            }) 
            newUser.folders.push(newFolder)
            await newFolder.save();
            await newUser.save();
            const jwToken = jwt.sign({ id : newUser._id }, process.env.JWT_Private_Key);
            res.status(201).json({
                status: 'Success',
                message: 'User created successfully',
                userToken: jwToken
            });

        } catch (error) {
            next("Error For Creating User", error);
        }
    };
}

function getUser(){
    return async (req , res , next) =>{
        try {
            const userDetails = await UserModel.findById(req.user_id);
            if(userDetails){
                res.status(200).json({
                    status: 'Success',
                    message: 'User Found' ,
                    user : userDetails
                })
            }
            else{
                res.status(400).json({
                    status: 'Failed',
                    message: 'User not Found'
                });
            }
        } catch (error) {
            console.log(error)
            next('Error For Fetching user' , error)
        }
    }
}

function upadteUserDetail(){
    return async (req , res , next) =>{
        try{
            const userId = req.user_id ;
            const { userName, email , oldPassword , newPassword } = req.body;
            const existingUser = await UserModel.findById(userId)
            if(!existingUser){
                return res.status(404).json({
                    status: 'Failed',
                    message: 'User Not found',
                });
            }
            const passwordMatch = await bcrypt.compare(oldPassword, existingUser.password);
            if (!passwordMatch) {
                return res.status(400).json({
                    status: 'Failed',
                    message: 'Enter Correct Password',
                });

            }
            const hashedPassword = await bcrypt.hash(newPassword, 10);
            const newUser = await UserModel.findByIdAndUpdate( userId , {
                userName,
                email,
                password: hashedPassword
            });
            // console.log(newJob)
            // await newJob.save();
            res.status(201).json({
                status: 'Success',
                message: 'User updated successfully',
                userId: newUser._id
            });
        }catch(error){
            next("Error in Updating User" , error)
        }
    }

}

module.exports = {
    handleLogin ,
    registerUser ,
    getUser ,
    upadteUserDetail
}