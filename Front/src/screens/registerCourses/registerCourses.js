import {React} from 'react'
import cookie from 'react-cookies'
import './registerCourses.css'
import Background from '../../components/background/background';

function RegisterCourses() {

let result = {};

const checkCookies = () => {
    cookie.save('id', 'hello');
    let cook = cookie.loadAll();
    if(cook.id !== undefined){
    }
    else{
        window.location.replace(window.location.href.replace('registerCourses','login'))
    }
}

const fetcher = async (query) => {
    try{
        var result = await fetch("http://localhost:5000/getCourses",{method: 'POST',headers: {'content-type':'application/json','x-hasura-admin-secret': 'SimpleLoginPageDuhh'},body: JSON.stringify(query)}).then((response) => response.json()).then((user) => { return user;});
        return result;
    }catch(e){
        console.log(e)
    }
}

const getCourses = async () => {
        if(document.readyState === 'complete'){
            result = await fetcher({})
            for (const x of result.data){
                document.getElementsByClassName('registerCoursesListCOntainer')[0].innerHTML += `<div class='registerCourseCard'>
                                                                                                    <div>
                                                                                                        <h1>${x.course_title}</h1>
                                                                                                        <p>${x.course_code}</p>
                                                                                                        <p>${x.regulation}</p>
                                                                                                    </div>
                                                                                                    <div class='registerButton' value='${x.course_code}'>
                                                                                                        Register For Course +
                                                                                                    </div>
                                                                                                </div>`
            }
        }
    }

window.onload = getCourses;


return (
    <div className='mainRegisterContainer' onLoad={checkCookies()}>
        <Background />
        <div className='registerCoursesListCOntainer'>
        </div>
    </div>
  )
}

export default RegisterCourses