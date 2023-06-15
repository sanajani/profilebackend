import express from 'express'
const userMessagerouter = express.Router();
import {getUserMessageController} from '../controller/getUserMessageController.js'

userMessagerouter.post('/sendemail',getUserMessageController)


export {userMessagerouter}