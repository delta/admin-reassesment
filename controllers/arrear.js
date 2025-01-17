const Arrear = require('../models/Arrear');
const { getDeadlineObject } = require('../utils/deadlineUtil');
const moment = require('moment');
const logger = require('../config/logger');

exports.getArrearForm = async (req, res) => {
    try {
        logger.info({ message: `User ${req.session.user} fetching form details` })
        let documents = await Arrear.find({ roll: Number(req.session.user) });
        logger.info({ message: `User ${req.session.user} successfully fetched form details` })
        let formTypes = ['reassesment', 'redo', 'formative-assesment'];
        let formFilled = {};
        formTypes.forEach(form => formFilled[form] = false);
        documents.forEach(document => formFilled[document.examType] = true);
        return res.status(200).json({
            success: true,
            data: formFilled
        });
    } catch (err) {
        logger.error({ message: `Error fetching form details` })
        return res.status(500).json({
            success: false,
            error: 'Server Error'
        });
    }
}

exports.addArrearForm = async (req, res) => {
    let deadline = getDeadlineObject(req.body.examType);

    let current = moment().utcOffset(330);
    let startDate =  moment(deadline.startDate, 'YYYY-MM-DD').utcOffset(330);
    let endDate =  moment(deadline.endDate, 'YYYY-MM-DD').utcOffset(330);

    try {
        if (startDate >= current || endDate <= current)
            throw { name: 'CustomError', msg: 'Form is currently closed' };

        let submit = await Arrear.countDocuments({ examType: req.body.examType, roll: Number(req.session.user) });
        if (submit !== 0)
            throw { name: 'CustomError', msg: 'Document already exists' };

        req.body.roll = req.session.user;
        const redoForm = await Arrear.create(req.body);
        logger.info({ message: `User ${req.session.user} successfully submitted form` })

        return res.status(201).json({
            success: true,
            data: redoForm
        });
    } catch (err) {
        logger.info({ message: `User ${req.session.user} failed submission ${JSON.stringify(err)}` })
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
