const express = require('express');
const router = express.Router();
const userModel = require('../model/mymodel');

// router.get('/', (req, res) => {
//     res.render('index', {
//         title: 'CRUD PAGE'
//     });
// });


router.post('/userForm', (req, res) => {
    var data = new userModel();
    data.firstName = req.body.firstName;
    data.lastName = req.body.lastName;
    data.age = req.body.age;
    data.mobileNumber = req.body.mobileNumber;
    var save = data.save();

    if (save) {
        req.session.message = {
            type: 'success',
            message: "User added successfully"
        }
        res.redirect('/');
    } else {
        console.log('Data not saved');
    }
});

router.get('/', (req, res) => {
    userModel.find().exec((err, users) => {
        if (err) {
            res.json({ message: err.message });
        } else {
            res.render('index',
                {
                    title: 'CRUD PAGE',
                    users: users
                });
        }
    });
});

router.get("/edit/:id", (req, res) => {
    let id = req.params.id;
    userModel.findById(id, (err, users) => {
        if (err) {
            res.redirect('/');
        } else {
            if (users == null) {
                res.redirect('/');
            } else {
                res.render('edit_users', {
                    title: 'EDIT PAGE',
                    users: users
                });
            }
        }
    });
});


router.post('/updateForm/:id', (req, res) => {
    let id = req.params.id;
    userModel.findByIdAndUpdate(id, {
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        age: req.body.age,
        mobileNumber: req.body.mobileNumber
    }, (err, result) => {
        if (err) {
            res.json({ message: err.message, type: 'danger' });
        } else {
            req.session.message = {
                type: 'success',
                message: 'User updated successfully'
            };
            res.redirect('/')
        }
    });
});

router.get('/delete/:id', (req, res) => {
    let id = req.params.id;

    userModel.findByIdAndRemove(id, (err, result) => {
        if (err) {
            res.json({ message: err.message });
        } else {
            req.session.message = {
                type: 'success',
                message: 'User deleted successfully'
            };
            res.redirect('/');
        }
    });
});



module.exports = router;