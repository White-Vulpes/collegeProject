/* eslint-disable */
import React, { useRef } from 'react'
import Background from '../../components/background/background'
import { FiEye, FiUser } from 'react-icons/fi';
import { MdPassword } from 'react-icons/md';
import { VscBlank } from 'react-icons/vsc';
import bcrypt, { hash } from "bcryptjs-react";
import './signup.css'
import cookie from 'react-cookies'

function signup() {

  const passRef = useRef(null);
  const confirmPassRef = useRef(null);

  const removeCookies = () => {
    document.cookie = '';
    console.log(document.cookie);
  }

  const checkValidity = () => {
    if(document.getElementsByClassName('signupUsernameInput')[0].value !== "" && document.getElementsByClassName('signupPasswordInput')[0].value !== ""){
      if(document.getElementsByClassName('signupPasswordInput')[0].value !== document.getElementsByClassName('signupPasswordInput')[1].value){
        document.getElementById('errorcodes').innerHTML = "Passwords do not match";
        document.getElementById('errorcodes').style.display = "block";
        return false;
      }
      else document.getElementById('errorcodes').style.display = "none";
    }
    else{
      document.getElementById('errorcodes').innerHTML = "Empty Fields";
      document.getElementById('errorcodes').style.display = "block";
      return false;
    }
    getSignedUp();
  }

  const fetcher = async (query) => {
    try{
      var result = await fetch("http://localhost:5000/signUp",{method: 'POST',headers: {'content-type':'application/json','x-hasura-admin-secret': 'SimpleLoginPageDuhh'},body: JSON.stringify(query)}).then((response) => response.json()).then((user) => { return user;});
      return result;
    }catch(e){
      document.getElementById('errorcodes').innerHTML = e.message;
      document.getElementById('errorcodes').style.display = "block";
      console.log(e);
    }
  }

  const getSignedUp = async () =>{
    const pass = await bcrypt.hash(document.getElementsByClassName('signupPasswordInput')[0].value, 10).then((hash) => {return hash});
    const data = {
      data: {
        username: document.getElementsByClassName('signupUsernameInput')[0].value,
        password: pass
      }
    }
    const result = await fetcher(data);
    if(result.errors){
      document.getElementById('errorcodes').innerHTML = result.errors[0].message;
      document.getElementById('errorcodes').style.display = "block";
    }else{
      document.getElementById('errorcodes').innerHTML = "Signed Up";
      document.getElementById('errorcodes').style.display = "block";
      document.getElementById('errorcodes').style.color = "green";
      console.log(document.cookie);
      cookie.save('id', result.id, {path: '/'})
      console.log(document.cookie);
      window.location.replace("http://localhost:3000/signupdetails");
    }
  }

  return (
    <div className='signupContainer' onLoad={removeCookies()}>
        <Background color='black'/>
        <div className='signupFieldsContainer'>
          <div className='signupFields'>
            <p>Hello, <span>Anonymous</span></p>
            <h2>Lets Change the <span style={{fontSize: '30px'}}>Anonymous</span> tag by Signing Up</h2>
            <div className='signupInputs'>
              <div style={{display: 'flex', alignItems: 'center', justifyContent: 'center'}}><FiUser color='#6ce5c0' size='32px'/><input className='signupUsernameInput' placeholder='Username'/><VscBlank color='#6ce5c0' size='32px'/></div>
              <div style={{display: 'flex', alignItems: 'center', justifyContent: 'center'}}><MdPassword color='#6ce5c0' size='32px'/><input className='signupPasswordInput' placeholder='Password' type='password' ref={passRef}/><FiEye color='#6ce5c0' size='32px' onClick={() => {passRef.current.type === "password" ? passRef.current.type = 'text' : passRef.current.type = 'password'}}/></div>
              <div style={{display: 'flex', alignItems: 'center', justifyContent: 'center'}}><MdPassword color='#6ce5c0' size='32px'/><input className='signupPasswordInput' placeholder='Confirm Password' type='password' ref={confirmPassRef}/><FiEye color='#6ce5c0' size='32px' onClick={() => {confirmPassRef.current.type === "password" ? confirmPassRef.current.type = 'text' : confirmPassRef.current.type = 'password'}}/></div>
              <div id="errorcodes">error</div>
              <button className='signupButton' onClick={() => {checkValidity();}}>Sign Up</button>
            </div>
          </div>
        </div>
    </div>
  )
}

export default signup