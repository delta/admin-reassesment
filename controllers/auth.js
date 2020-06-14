
const jwt = require('jsonwebtoken');
const Imap = require('imap');

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

        imap.on('ready', (e) => {
            req.session.user = username;
            return res.status(201).json({
                success: true
            });
        })

        imap.once('error', function(err) {
            console.log(err);
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
        res.session.user = null;
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