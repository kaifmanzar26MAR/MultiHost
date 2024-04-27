import mongoose, {Schema} from "mongoose";

const productreview=new Schema({
    product_id:{
        type:Schema.Types.ObjectId,
        ref:"Product",
        required:true
    },
    user_id:{
        type:Schema.Types.ObjectId,
        ref:"User",
        required:true
    },
    user_name:{
        type:String,
        required:true
    },
    reviewtext:{
        type:String,
        required:true,

    },
    ratings:{
        type:Number,
        required:true,
        default:5
    }
},
{
    timestamps:true
}
)

export const ProductReview = mongoose.model("ProductReview",productreview);