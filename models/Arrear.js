const mongoose = require('mongoose');

const ArrearSchema = new mongoose.Schema({
    name: {
        type: String,
        trim: true,
        required: [true, 'Please fill the name']
    },
    roll: {
        type: Number,
        required: [true, 'Please fill the roll no']
    },
    phone: {
        type: Number
    },
    course: {
        type: String,
        enum: ['UG', 'PG'],
        default: 'UG'
    },
    department: {
        type: String
    },
    batch: {
        type: String,
        required: [true, 'Please fill the batch name']
    },
    status: {
        type: String,
        required: [true, 'Please fill the status']
    },
    semester: {
        type: Number
    },
    subject: [{
        dept: {
            type: String,
            trim: true,
            required: [true, 'Please fill subject department']
        },
        subjectCode: {
            type: String,
            trim: true,
            required: [true, 'Please fill subject code']
        },
        subjectName: {
            type: String,
            trim: true,
            required: [true, 'Please fill subject name']
        }
    }],
    examType: {
        type: String,
        enum: ['reassesment', 'redo', 'formative-assesment']
    },
    feeDetails: {
        type: String,
        trim: true,
        required: [true, 'Please fill fee details']
    },
    feeSubjectNo: {
        type: Number,
        required: [true, 'Please fill the fee subject no']
    },
    feeTotal: {
        type: Number,
        required: [true, 'Please fill fee total']
    },
    specialisation: {
        type: String,
        trim: true,
        default: '',
    },
    degree: {
        type: String,
        default: 'B.Tech',
        trim: true,
        enum: ['M.Tech', 'M.Arch', 'M.Sc', 'MBA', 'MCA', 'B.Tech']
    },
    feeSbiRef: {
        type: String,
        trim: true,
        required: [true, 'Please fill fee sbi ref']
    },
    feeBankRef: {
        type: String,
        trim: true,
        required: [true, 'Please fill fee bank ref']
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
});

module.exports = mongoose.model('Arrear', ArrearSchema);
