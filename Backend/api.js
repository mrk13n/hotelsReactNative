const db = require('./database');
const bcrypt = require('bcrypt');
const saltRounds  = 10;
const Hotels = db.Hotels;
const Rooms = db.Rooms;
const Users = db.Users;

exports.checkLogin = (req, res) => {
    let auth = false;
    let user = undefined;
    if (req.session.user) {
        auth = true;
        user = req.session.user;
    }
    res.send({
        auth: auth,
        user: user
    })
};

exports.registration = (req, res) => {
    const firstName = req.body.firstName;
    const lastName = req.body.lastName;
    const secondName = req.body.secondName;
    const email = req.body.email;
    const password = req.body.password;
    const balance = 0;

    Users.findOne(
        {
            email: email
        },
        (err, user) => {
            if (err) res.send(err);
            if (user) {
                res.send({
                    isExist: true
                });
            } else {
                bcrypt.genSalt(saltRounds, (err, salt) => {
                    bcrypt.hash(password, salt, (err, hash) => {
                        const newUser = new Users({
                            firstName: firstName,
                            lastName: lastName,
                            secondName: secondName,
                            email: email,
                            password: hash,
                            balance: balance
                        });

                        newUser.save((err, user) => {
                            if (err) res.send(err);
                            req.session.user = {
                                firstName: user.firstName,
                                lastName: user.lastName,
                                balance: user.balance
                            };
                            res.send({
                                newUser: true,
                                user: req.session.user
                            });
                        });
                    });
                });
            }
        }
    );
};

exports.login = (req, res) => {
    const email = req.body.email;
    const password = req.body.password;

    Users.findOne(
        {
            email: email
        },
        async (err, user) => {
            if (err) res.send(err);
            if (user) {
                const checkPassword = await bcrypt.compare(password, user.password);
                if (checkPassword) {
                    req.session.user = {
                        firstName: user.firstName,
                        lastName: user.lastName,
                        balance: user.balance
                    };
                    res.send({
                        success: true,
                        user: req.session.user
                    });
                } else {
                    res.send({
                        incorrectPassword: true
                    });
                }
            } else {
                res.send({
                    notFound: true
                });
            }
        }
    );
};

exports.logout = (req, res) => {
    req.session.destroy((err) => {
        if (err) res.send(err);
        res.send({
            end: true
        });
    });
};