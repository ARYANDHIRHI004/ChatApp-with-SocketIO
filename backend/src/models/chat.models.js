import mongoose from "mongoose";

const chatSchema = new mongoose.Schema({

    chat:{
        type:String
    },

    sender:{
        type: String,
        required:true
    },
    receiver:{
        type:String,
        required:true
    },
    isGroupChat:{
        type:Boolean,
        default:false
    },
    groupId:{
        type:mongoose.Types.ObjectId,
        ref:"Group",
        default:null
    }

}, { timestamps: true })

export const Chat = mongoose.model("Chat", chatSchema)