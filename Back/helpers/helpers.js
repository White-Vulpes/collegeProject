let q = require('../queries/queries');
let f = require('../utils/utils')
let bcrypt = require('bcrypt');

module.exports = {
    getFacultyData: (req, res, next) => {

    },

    vaildateFacultyData: (req, res, next) => {
        try{
            if(req.body.data.username !== null && req.body.data.password !== null){
                if(req.body.data.username.includes('@srmist.edu.in')) next();
                else res.status(400).json({
                    errors: [{
                        message: 'invalid username'
                    }]
                })
            }
            else{
                res.status(400).json({
                    errors: [{
                        message: 'empty fields'
                    }]
                })
            }
        }catch(e){
            res.status(500).json({ 
                errors: [{
                    message: 'internal server error'
                }]
            })
        }
    },

    loginFaculty: async (req, res, next) => {
        console.log("reached Login");
        try{
            let result = await f.fetcher(q.getLoginDetails, { username: req.body.data.username });
            if(result.errors){
                res.status(400).json({
                    errors: [{
                        message: errors[0].message
                    }]
                })
                return
            }
            if(result.data.faculty_data_faculty_creds.length > 0){
                req.body.creds = result.data.faculty_data_faculty_creds[0];
                next();
            }
            else{
                res.status(400).json({
                    errors: [{
                        message: 'Please Sign Up First'
                    }]
                })
            }
        }catch(e){
            res.status(500).json({
                errors: [{
                    message: e.message
                }]
            })
        }
    },

    authorizeUser: async (req, res, next) => {
        try{
            let credsPass = req.body.data.password === req.body.creds.password;
            if(credsPass === true) res.status(200).json({message: 'success'});
            else{
                res.status(400).json({
                    errors: [{
                        message: 'Wrong Credentials'
                    }]
                })
            }

        }catch(e){
            res.status(500).json({
                errors: [{
                    message: e.message
                }]
            })
        }
    },

    getUserDetails: async (req, res) => {
        try{
            const result = await f.fetcher(q.getUserDetails, {id : req.body.creds.id});
            if(result.errors){
                res.status(500).json({
                    errors: [{
                        message: errors[0].message
                    }]
                })
                return
            }
            if(result.data.faculty_data_faculty_by_pk !== null){
                res.status(200).json({
                    data: result.data.faculty_data_faculty_by_pk
                })
            }else{
                res.status(400).json({
                    errors: [{
                        message: 'No Details Given During Sign Up'
                    }]
                })
            }
        }catch(e){
            res.status(500).json({
                errors: [{
                    message: e.message
                }]
            })
        }
    },

    signUpFaculty: async (req, res) => {
        try{
            let variables = {
                password: req.body.data.password,
                username: req.body.data.username
            }
            const result = await f.fetcher(q.signUp, variables);
            if(result.errors) {
                res.status(400).json({
                    errors: [{
                        message: result.errors[0].message
                    }]
                })
                return
            }
            if(result.data !== null){
                res.status(200).json({
                    id: result.data.insert_faculty_data_faculty_creds_one.id
                })
            }
            else res.status(400).json({
                errors: [{
                    message: "some error"
                }]
            })
        }catch(e){
            res.status(500).json({
                errors: [{
                    message: e.message
                }]
            })
        }
    },

    signUpFacultyData: async (req, res) => {
        try{
            let result = await f.fetcher(q.signUpDetails, req.body.data);
            if(result.errors){
                res.status(400).json({
                    errors:[{
                        message: result.errors[0].message
                    }]
                })
            }
            if(result.data){
                res.status(200).json({
                    data: result.data.insert_faculty_data_faculty_one
                })
            }
        }catch(e){
            res.status(500).json({
                errors: [{
                    message: 'Internal Server Error'
                }]
            })
        }
    },

    getCourses: async (req, res) => {
        try{
            let result = await f.fetcher(q.getCourses, {});
            if(result.errors){
                res.status(400).json({
                    errors:[{
                        message: result.errors[0].message
                    }]
                })
            }
            if(result.data){
                res.status(200).json({
                    data: result.data.faculty_data_courses
                })
            }
        }catch(e){
            res.status(500).json({
                errors: [{
                    message: 'Internal Server Error'
                }]
            })
        }
    },

    registerCourses: async (req, res) => {
        try{
            const result = await f.fetcher(q.registerCourses,{objects: req.body.data});
            if(result.errors){
                res.status(400).json({
                    errors: [{
                        message: result.errors[0].message
                    }]
                })
            }
            else if(result.data.insert_faculty_data_courses_registered.affected_rows > 0){
                res.status(200).json({
                    message: 'registered'
                })
            }else{
                res.status(400).json({
                    errors: [{
                        message: 'some error'
                    }]
                })
            }
        }catch(e){
            res.status(500).json({
                errors: [{
                    message: e.message
                }]
            })
        }
    },
    getRegisteredCourses: async (req, res) => {
        try{
            console.log(req.body.data);
            const result = await f.fetcher(q.getRegisteredCourses, req.body.data)
            if(result.errors){
                res.status(500).json({
                    errors: [{
                        message: result.errors[0].message
                    }]
                })
            }else if(result.data.faculty_data_courses_registered.length > 0){
                res.status(200).json({
                    data: result.data.faculty_data_courses_registered
                })
            }else{
                res.status(200).json({
                        data: 'No Data Found'
                    })
            }
        }catch(e){
            res.status(500).json({
                errors: [{
                    message: e.message
                }]
            })
        }
    }
}