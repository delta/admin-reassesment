
const Imap = require('imap');
const { getDeadlineObject } = require('../utils/deadlineUtil');
const logger = require('../config/logger');

exports.getLogin = async (req, res) => {
    try {
        logger.info({ message: "Checking if user is logged in" })
        return res.status(200).json({
            success: true,
            login: req.session.user ? true : false,
            deadline: getDeadlineObject()
        })
    } catch (err) {
        return res.status(500).json({
            success: false,
            error: "Internal Server Error"
        })
    }
}

exports.authenticateUser = async (req, res) => {
    try {
        let username = req.body.username;
        let password = req.body.password;
        
        logger.info({ message: `User ${username} is trying to login` })

        let imap = new Imap({
            user: username,
            password: password,
            host: "webmail.nitt.edu",
            port: "143"
        })

        imap.once('ready', (e) => {
            req.session.user = username;
            imap.end();
            logger.info({ message: `User ${username} successfully logged in` })
            return res.status(201).json({
                success: true,
                user: username
            });
        })

        imap.once('error', function (err) {
            logger.error({ message: `User ${username} failed to login ${JSON.stringify(err)}` })
            return res.status(500).json({
                success: false,
                error: 'Wrong credentials'
            });
        });

        imap.connect();
    } catch (err) {
        logger.error({ message: `Error in logging in using IMAP` })
        return res.status(500).json({
            success: false,
            error: 'Server Error'
        });
    }
}

exports.logoutUser = async (req, res) => {
    try {
        logger.info({ message: `User ${req.session.user} logging out` });
        req.session.user = null;
        // set cookie here
        return res.status(201).json({
            success: true
        });
    } catch (err) {
        logger.error({ message: `Error logging out` });
        return res.status(500).json({
            success: false,
            error: 'Server Error'
        });
    }
}

exports.checkAuth = async (req, res) => {
    return req.session.user ? true : false;
}