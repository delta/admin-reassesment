const Arrear = require('../models/Arrear');

exports.getArrearForm = async (req, res) => {
    try {
        let documents = await Arrear.find({roll: '213'});
        let formTypes = ['reassesment', 'redo', 'formative-assesment'];
        let formFilled = {};
        formTypes.forEach(form => formFilled[form] = false);
        documents.forEach(document => formFilled[document.examType] = true);
        return res.status(200).json({
            success: true,
            data: formFilled
        });
    } catch (err) {
        return res.status(500).json({
            success: false,
            error: 'Server Error'
        });
    }
}

exports.addArrearForm = async (req, res) => {
    try {
        let submit = await Arrear.countDocuments({roll: req.body.roll, type: req.body.type});
        if(submit !== 0)
            throw {name: 'CustomError', msg: 'Document already exists'};

        const redoForm = await Arrear.create(req.body);
        return res.status(201).json({
            success: true,
            data: redoForm
        });
    } catch (err) {
        if (err.name === 'ValidationError') {
            const messages = Object.values(err.errors).map(val => val.message);
            return res.status(400).json({
                success: false,
                error: messages
            });
        } else if (err.name === 'CustomError') {
            return res.status(400).json({
                success: false,
                error: err.msg
            });
        }
        else {
            return res.status(500).json({
                success: false,
                error: 'Server Error'
            });
        }
    }
}
