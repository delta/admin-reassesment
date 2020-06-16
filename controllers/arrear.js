const Arrear = require('../models/Arrear');

const startDate = new Date(process.env.START_DATE)
const endDate = new Date(process.env.END_DATE)

exports.getArrearForm = async (req, res) => {
    try {
        let documents = await Arrear.find({ roll: Number(req.session.user) });
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
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    if (req.body.examType != 'redo') startDate.setDate(startDate.getDate() + 2);
    if (startDate > today || endDate < today) {
        return res.status(400).json({
            success: false,
            error: "Form has been closed"
        });
    }
    try {
        let submit = await Arrear.countDocuments({examType: req.body.examType, roll: Number(req.session.user)});
        if (submit !== 0)
            throw { name: 'CustomError', msg: 'Document already exists' };

        req.body.roll = req.session.user;
        const redoForm = await Arrear.create(req.body);
        return res.status(201).json({
            success: true,
            data: redoForm
        });
    } catch (err) {
        console.log(err)
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
