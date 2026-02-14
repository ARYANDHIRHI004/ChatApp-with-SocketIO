import mongoose from "mongoose";

const groupMembersSchema = new mongoose.Schema({

    userId:{
        type: mongoose.Types.ObjectId,
        ref: "User"
    },
    group:{
        type:mongoose.Types.ObjectId,
        ref: "Group"
    }

},{timestamps:true})

export const GroupMember = mongoose.model("GroupMember", groupMembersSchema)