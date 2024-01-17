var LocalStrategy = require('passport-local').Strategy;
var User = require('../models/user');
var bcrypt = require('bcrypt');

module.exports = function (passport) {

    passport.use('local',new LocalStrategy({
        usernameField : 'email',
        passwordField : 'password',
        passReqToCallback : true 
        }, function (req, username, password, done) {

        User.findOne({email: username}, function (err, user) {
            if (err)
                console.log(err);

            if (!user) {
                req.flash('success', 'No user found!');
                return done(null, false, {message: 'No user found!'});
            }

            bcrypt.compare(password, user.password, function (err, isMatch) {
                if (err)
                    console.log(err);

                if (isMatch) {
                    return done(null, user);
                } else {
                    req.flash('success', 'Wrong password!');
                    return done(null, false, {message: 'Wrong password.'});
                }
            });
        });

    }));

    passport.serializeUser(function (user, done) {
        done(null, user._id);
    });

    passport.deserializeUser(function (id, done) {
        // var sql = `SELECT * FROM customers WHERE customerID = ?;`;
        // db.query(sql, id, (err, user)=>{
        //     done(err, user);
        // })

        User.findById(id, function (err, user) {
            done(err, user);
        });
    });

}