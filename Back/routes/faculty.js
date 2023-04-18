let router = require('express').Router();
let f = require('../helpers/helpers');

router.post('/facultyLogin', f.vaildateFacultyData, f.loginFaculty, f.authorizeUser, f.getUserDetails);
router.post('/signUp', f.vaildateFacultyData, f.signUpFaculty);
router.post('/signUpDetails', f.signUpFacultyData);
router.post('/getCourses', f.getCourses)
router.post('/registerCourses', f.registerCourses);
router.post('/getRegisteredCourses', f.getRegisteredCourses);

module.exports = router;