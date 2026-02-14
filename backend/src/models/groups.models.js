import mongoose from "mongoose";

const groupsSchema = new mongoose.Schema({

    groupName:{
        type:String,
        required:true
    },

    description:{
        type:String,
        requiredl: true
    },

    icon:{
        url:{
            type:String,
            default:""
        }
    },
    coverImage:{
        url:{
            type:String,
            default:""
        }
    }


},{timestamps:true})

export const Group = mongoose.model("Group", groupsSchema)

