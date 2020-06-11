const mongoose = require('mongoose');

const RedoFormSchema = new mongoose.Schema({
    name: {
        type: String,
        trim: true,
        required: [true, 'Please fill the name']
    },
    roll: {
        type: Number,
        required: [true, 'Please fill the roll no']
    },
    department: {
        type: String,
        required: [true, 'Please fill the department name']
    },
    batch: {
        type: String,
        required: [true, 'Please fill the batch name']
    },
    status: {
        type: String,
        required: [true, 'Please fill the status']
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
    createdAt: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('RedoForm', RedoFormSchema);
