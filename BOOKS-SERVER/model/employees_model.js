const mongoose = require('mongoose')
const employees = mongoose.Schema({
    restaurant:{
        type:String,
    },
    designation:{
        type:String,
    },
    employID:{
        type:String,
    },
    staff:{
        type:String,
    },
    employeeType:{
        type:String,
    },
    current_address:{
        type:String,
    },
    email:{
        type:String,
    },
    gender:{
        type:String,
    },
    aadhar_number:{
        type:String,
    },
    pan_number:{
        type:String,
    },
    pf_number:{
        type:String,
        optional: true,
        default: "",
    },
    uan_number:{
        type:String,
        optional: true,
        default: "",
    },
    emergency_contact_person_name:{
        type:String,
    },
    emergency_contact_person_address:{
        type:String,
    },
    phone:{
        type:Number,
    },
    permanent_address:{
        type:String,
    },
    joinDate:{
        type:Date,
    },
    dob:{
        type:Date,
    },
    marital_status:{
        type:String,
    },
    aadhar_image:{
        type:[String],
        // required:true
    },
    pancard_image:{
        type:String,
        // required:true
    },
    esi_number:{
        type:String,
        optional: true,
        default: "",
    },
    blood_group:{
        type:String,
    },
    emergency_contact_person_number:{
        type:Number,
    },
    emergency_contact_person_relation:{
        type:String,
    },
    status:{
        type:Boolean,
        default:false
    },
    restaurantId:{
        type: String,
        ref:"Restaurant"
    }
})

module.exports = mongoose.model("Employees",employees)