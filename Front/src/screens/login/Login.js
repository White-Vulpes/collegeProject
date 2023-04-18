import React, { useRef } from 'react'
import './Login.css'
import Background from '../../components/background/background'
import { FiUser,FiEye } from 'react-icons/fi';
import { MdPassword } from 'react-icons/md';
import { VscBlank } from 'react-icons/vsc';
import cookie from 'react-cookies'

function Login() {

  const ref = useRef(null);

  const fetcher = async (query) => {
    try{
      var result = await fetch("http://localhost:5000/facultyLogin",{method: 'POST',headers: {'content-type':'application/json',},body: JSON.stringify(query)}).then((response) => response.json()).then((user) => { return user;});
      return result;
    }catch(e){
      document.getElementById('errorcodes').innerHTML = e.message;
      document.getElementById('errorcodes').style.display = "block";
      console.log(e);
    }
  }

  const checkValidity = () => {
    if(document.getElementsByClassName('loginUsernameInput')[0].value === "" || document.getElementsByClassName('loginPasswordInput')[0].value === ""){
      document.getElementById('errorcodes').innerHTML = "Empty Fields";
      document.getElementById('errorcodes').style.display = "block";
    }
    else{
      document.getElementById('errorcodes').style.display = "none";
      getDetails();
    }
  }

  const getDetails = async () => {
    const creds = {
      data: {
        username: document.getElementsByClassName('loginUsernameInput')[0].value,
        password: document.getElementsByClassName('loginPasswordInput')[0].value
      }
    }
    let result = await fetcher(creds);
    if(result.errors){
      document.getElementById('errorcodes').innerHTML = result.errors[0].message;
      document.getElementById('errorcodes').style.display = "block";
    }else{
      document.getElementById('errorcodes').innerHTML = "Logged In";
      document.getElementById('errorcodes').style.display = "block";
      document.getElementById('errorcodes').style.color = "green";
      //document.cookie = `{id:${result.data.id},dept:${result.data.dept},faculty:${result.data.faculty_type},name:${result.data.name},phone:${result.data.phone_no},courses:${result.data.courses_handled}} path='/'`;
      cookie.save('id', result.data.id, { path: '/'})
      cookie.save('dept', result.data.dept, { path: '/'})
      cookie.save('faculty', result.data.faculty_type, { path: '/'})
      cookie.save('name', result.data.name, { path: '/'})
      cookie.save('phone', result.data.phone_no, { path: '/'})
      window.location.replace(window.location.href.replace('login','dashFaculty'))
    }
  }

  return (
    <div className='loginContainer'>
        <Background color='black'/>
        <div className='loginFieldsContainer'>
          <div className='loginFields'>
            <p>Hello, <span>Anonymous</span></p>
            <h2>Lets Change the <span style={{fontSize: '30px'}}>Anonymous</span> tag by Loging In</h2>
            <div className='loginInputs'>
              <div style={{display: 'flex', alignItems: 'center', justifyContent: 'center'}}><FiUser color='#6ce5c0' size='32px'/><input className='loginUsernameInput' placeholder='Username'/><VscBlank color='#6ce5c0' size='32px'/></div>
              <div style={{display: 'flex', alignItems: 'center', justifyContent: 'center'}}><MdPassword color='#6ce5c0' size='32px'/><input className='loginPasswordInput' placeholder='Password' type='password' ref={ref}/><FiEye color='#6ce5c0' size='32px' onClick={() => {ref.current.type === 'password' ? ref.current.type = "text" : ref.current.type = "password"}}/></div>
              <div id="errorcodes">error</div>
              <button className='loginButton' onClick={() => {checkValidity();}}>Login</button>
            </div>
          </div>
        </div>
    </div>
  )
}

export default Login