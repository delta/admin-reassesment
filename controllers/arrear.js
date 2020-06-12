const Arrear = require('../models/Arrear');

exports.getArrearForm = async (req, res) => {
    return res.status(200).json({
        success: true
    });
}

exports.addArrearForm = async (req, res) => {
    try {
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
        }
        else {
            return res.status(500).json({
                success: false,
                error: 'Server Error'
            });
        }
    }
}