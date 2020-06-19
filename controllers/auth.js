
const Imap = require('imap');
const { getDeadlineObject } = require('../utils/deadlineUtil');

exports.getLogin = async (req, res) => {
    try {
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
        let imap = new Imap({
            user: username,
            password: password,
            host: "webmail.nitt.edu",
            port: "143"
        })

        imap.once('ready', (e) => {
            req.session.user = username;
            return res.status(201).json({
                success: true,
                user: username
            });
        })

        imap.once('error', function (err) {
            console.log("err", err);
            return res.status(500).json({
                success: false,
                error: 'Wrong credentials'
            });
        });

        imap.connect();
    } catch (err) {
        return res.status(500).json({
            success: false,
            error: 'Server Error'
        });
    }
}

exports.logoutUser = async (req, res) => {
    try {
        req.session.user = null;
        // set cookie here
        return res.status(201).json({
            success: true
        });
    } catch (err) {
        return res.status(500).json({
            success: false,
            error: 'Server Error'
        });
    }
}

exports.checkAuth = async (req, res) => {
    return req.session.user ? true : false;
}