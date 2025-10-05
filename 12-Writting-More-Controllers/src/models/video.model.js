import mongoose, {Schema} from 'mongoose';
import mongooseAgregatePaginate from "mongoose-aggregate-paginate-v2";

const videoSchema = new Schema(
    {
        videoFile : {
            type: String,    //cloudinary url
            required : true
        },
        thumbnail : {
            type: String,     //Cloudinary uri
            required: true
        },
        title : {
            type: String,     
            required: true
        },
        description : {
            type: String,     
            required: true
        },
        duration : {
            type: Number,     //from cloudinary uri
            required: true
        },
        views :{
            type: Number,
            default: 0
        },
        isPublished : {
            type: Boolean,
            default: true
        },
        isPublished : {
            type: Schema.Types.ObjectId,
            ref: "User"
        }

    },
    {
        timestamps : true
    }
)

videoSchema.plugin(mongooseAgregatePaginate);

export const Video = mongoose.model("Video", videoSchema)