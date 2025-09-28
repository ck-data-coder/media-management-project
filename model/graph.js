import mongoose from 'mongoose'
const schema=mongoose.Schema;
 
const GraphPlotSchema=new schema({
    email:{
        type: String,
        require: true,
        unique: true
    },
    videosAddData:[{
       
        date:{
            type:String
        }

    }],
    videosUpdateData:[{
       
        date:{
            type:String
        }

    }],
    videosDeleteData:[{
       
        date:{
            type:String
        }

    }],
    categoryAddData:[{
       
        date:{
            type:String
        }

    }]
},
{
    versionKey:false
})
const GraphPlotModel=mongoose.model('graphPlot',GraphPlotSchema);
export default GraphPlotModel;