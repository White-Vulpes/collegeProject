import {React, useState, useEffect} from 'react'
import Background from '../../components/background/background'
import './dashFaculty.css'
import cookie from 'react-cookies'
import Select from 'react-select'

let options = []

function DashFaculty() {

useEffect(() => {
    if(cookie.load('faculty') === 'HOD'){
        document.getElementsByClassName('dashHodApprove')[0].style.display = 'block';
    }else{
        document.getElementsByClassName('dashHodApprove')[0].style.display = 'none';
    }
},[]);

const [selectedOptions, setSelectedOptions] = useState([]);

const fetcher = async (query) => {
    try{
        var result = await fetch("http://localhost:5000/getCourses",{method: 'POST',headers: {'content-type':'application/json','x-hasura-admin-secret': 'SimpleLoginPageDuhh'},body: JSON.stringify(query)}).then((response) => response.json()).then((user) => { return user;});
        return result;
    }catch(e){
        console.log(e)
    }
}

const fetcher2 = async (query) => {
    try{
        var result = await fetch("http://localhost:5000/registerCourses",{method: 'POST',headers: {'content-type':'application/json','x-hasura-admin-secret': 'SimpleLoginPageDuhh'},body: JSON.stringify(query)}).then((response) => response.json()).then((user) => { return user;});
        return result;
    }catch(e){
        console.log(e)
    }
}

const fetcher3 = async (query) => {
    try{
        var result = await fetch("http://localhost:5000/getRegisteredCourses",{method: 'POST',headers: {'content-type':'application/json','x-hasura-admin-secret': 'SimpleLoginPageDuhh'},body: JSON.stringify(query)}).then((response) => response.json()).then((user) => { return user;});
        return result;
    }catch(e){
        console.log(e)
    }
}

window.onload = async () => {
    const result = await fetcher({data: {
        user_id: cookie.load('id')
    }});
    let count = result.data.length;
    for (const x of result.data){
        options[count] = {
            user_id: cookie.load('id'),
            course_title: x.course_title,
            course_code: x.course_code,
            value: {
                course_code: x.course_code
            },
            label: x.course_title + '(' + x.regulation + ')',
        }
        count--;
    }
    listCourses();
}

const handleChange = (options) => {
    setSelectedOptions(options);
};

const checkCookies = () => {
    let cook = cookie.loadAll();
    if(cook.id !== undefined){
        // return true;
    }
    else{
        window.location.replace(window.location.href.replace('dashFaculty','login'))
    }
}

const approveCourses = () => {
    window.location = window.location.href.replace('dashFaculty','approveCourses');
}

const listCourses = async () => {
    try{
        const result = await fetcher3({data: {
                user_id: cookie.load('id')
            }
        });
        if(result.errors){
            console.log(result.errors[0].message)
        }else if(result.data === 'No Data Found'){
            document.getElementsByClassName('dashFacultyCourses')[0].innerHTML = 'No Registered Courses'
        }else{
            document.getElementsByClassName('dashFacultyCourses')[0].innerHTML = '';
            for(let x of result.data){
                document.getElementsByClassName('dashFacultyCourses')[0].innerHTML += `<div class='dashFacultyCourseCard'>
                                                                                        <div>
                                                                                            <h1>${x.course_title}</h1>
                                                                                            <p>${x.course_code}</p>
                                                                                            <p>regulation</p>
                                                                                        </div>
                                                                                        <div class='verificationStatus'>
                                                                                            <h2>Status</h2>
                                                                                            <p>${x.is_approved}</p>
                                                                                        </div>
                                                                                    </div>`
            }
        }
    }catch(e){
        console.log(e)
    }
}

const registerCourses = async () => {
    try{
        selectedOptions.map(function(obj) {
                delete obj.label;
                delete obj.value;
                return obj;
            });
        const result = await fetcher2({data: selectedOptions})
        if(result.errors){
            console.log(result.errors[0].message)
        }else if(result.message === 'registered'){
            document.getElementsByClassName('registerButton')[0].innerHTML = 'Registered';
        }
        listCourses();
    }catch(e){
        console.log(e);
    }
}


return (
<div className='mainDashFacultyContainer' onLoad={checkCookies()}>
    <Background/>
    <div className='dashFacultyContainer'>
        <div className='dashFacultyHeader'>
            <p>Dashboard</p>
        </div>
        <div className='dashFacultyRegister'>
            <Select className='dashFacultySelect' menuPortalTarget={document.body} styles={{control: (baseStyles) => ({...baseStyles,backgroundColor: 'var(--secondary)',margin: '10px', minHeight: '45px', paddingLeft: '20px', borderColor: 'black', maxWidth: '428px', minWidth: '250px'}), menuPortal: (base) => ({...base, zIndex: 999}) }} isMulti options={options} onChange={handleChange}/>
            <button onClick={registerCourses} className='registerButton'>Register For Course</button>
        </div>
        <div className='dashFacultyData'>
            <div className='dashFacultyCard'>
                <h2>Name</h2>
                <p>{cookie.load('name')}</p>
            </div>
            <div className='dashFacultyCard'>
                <h2>Phone No.</h2>
                <p>{cookie.load('phone')}</p>
            </div>
            <div className='dashFacultyCard'>
                <h2>Faculty</h2>
                <p>{cookie.load('faculty')}</p>
            </div>
            <div className='dashFacultyCard'>
                <h2>Department</h2>
                <p>{cookie.load('dept')}</p>
            </div>
        </div>
        <div className='dashFacultyCourses' onLoadedData={() => { listCourses() }}>
        </div>
        <div className='dashHodApprove' onClick={() => approveCourses()}>
            Approve Courses
        </div>
    </div>
</div>
)
}

export default DashFaculty