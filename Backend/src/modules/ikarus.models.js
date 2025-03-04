import mongoose,{Schema} from "mongoose"

const Ikarus3DSchema=new Schema({
    image3d:{
        type:String, // cloudinary URL
        required:true
    },
    title:{
        type:String, // cloudinary URL
        required:true,
        unique:true
    },
    description:{
        type:String, // cloudinary URL
        required:true
    },

},{timestamps:true});

export const Ikarus=mongoose.model("Ikaurs",Ikarus3DSchema);