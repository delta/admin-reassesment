
const jwt = require('jsonwebtoken');

exports.authenticateUser = async (req, res) => {
    try {
        let username = req.body.username;
        let password = req.body.password;

        // get user details here
        req.session.user = "106116008";
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