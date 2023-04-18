module.exports = {
    signUp: `mutation MyMutation($password: String = "", $username: String = "") {
                insert_faculty_data_faculty_creds_one(object: {password: $password, username: $username}) {
                    id
                }
            }`,
    signUpDetails: `mutation MyMutation($dept: String = "", $doj: date = "", $type: String = "", $id: uuid = "", $name: String = "", $phone: numeric = "", $xp_other: numeric = "", $xp_srm: numeric = "") {
                        insert_faculty_data_faculty_one(object: {dept: $dept, doj_srm: $doj, faculty_type: $type, id: $id, name: $name, phone_no: $phone, xp_other: $xp_other, xp_srm: $xp_srm}) {
                            dept
                            doj_srm
                            faculty_type
                            name
                            phone_no
                            xp_other
                            xp_srm
                            id
                        }
                    }`,
    getLoginDetails: `query MyQuery($username: String = "") {
                        faculty_data_faculty_creds(where: {username: {_eq: $username}}) {
                            password
                            id
                        }
                    }`,

    getUserDetails: `query MyQuery($id: uuid = "") {
                        faculty_data_faculty_by_pk(id: $id) {
                            dept
                            faculty_type
                            name
                            phone_no
                            id
                        }
                    }`,
    getCourses: `query MyQuery {
                    faculty_data_courses {
                        course_code
                        course_title
                        id
                        regulation
                    }
                }`,
    registerCourses: `mutation MyMutation($objects: [faculty_data_courses_registered_insert_input!] = {user_id: "", course_title: "", course_code: ""}) {
                        insert_faculty_data_courses_registered(objects: $objects) {
                            affected_rows
                        }
                    }`,
                
    getRegisteredCourses: `query MyQuery($user_id: uuid = "") {
                            faculty_data_courses_registered(where: {user_id: {_eq: $user_id}}) {
                                course_code
                                course_title
                                is_approved
                            }
                        }`,

}