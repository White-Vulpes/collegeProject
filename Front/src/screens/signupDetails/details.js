import React from 'react'
import Background from '../../components/background/background'
import './details.css'
import cookie from 'react-cookies'

function SignupDetails() {

  const checkCookies = () => {
    if(document.cookie === ''){
      window.location.replace('http://localhost:3000/login');
    }
  }

  const getData = () => {
    console.log('getData')
    document.getElementById('errorcodes').style.display = "none";
    for(let x of document.getElementsByClassName('detailsInput')){
      if(x.value === ""){
        return false;
      }
    }
    return {
      data: {
        name: document.getElementsByClassName('detailsInput')[0].value,
        phone: document.getElementsByClassName('detailsInput')[1].value,
        dept: document.getElementsByClassName('detailsInput')[2].value,
        type: document.getElementsByClassName('detailsInput')[3].value,
        doj: document.getElementsByClassName('detailsInput')[4].value,
        xp_srm: document.getElementsByClassName('detailsInput')[5].value,
        xp_other: document.getElementsByClassName('detailsInput')[6].value,
        id: cookie.load('id'),
      }
    }
  }

  const checkValidity = () => {
    let data = getData();
    if(data !== false){
      sendData(data);
    }
    else{
      document.getElementById('errorcodes').innerHTML = "Empty Fields";
      document.getElementById('errorcodes').style.display = "block";
    }
  }

  const fetcher = async (query) => {
    try{
      var result = await fetch("http://localhost:5000/signUpDetails",{method: 'POST',headers: {'content-type':'application/json',},body: JSON.stringify(query)}).then((response) => response.json()).then((user) => { return user;});
      return result;
    }catch(e){
      document.getElementById('errorcodes').innerHTML = e.message;
      document.getElementById('errorcodes').style.display = "block";
      console.log(e);
    }
  }

  const sendData = async (data) => {
    try{
      console.log('sendData')
      let result = await fetcher(data);
      console.log('sendData1')
      if(result.errors){
        document.getElementById('errorcodes').innerHTML = result.errors[0].message;
        document.getElementById('errorcodes').style.display = "block";
      }
      else if(result.data !== null){
        //document.cookie = `id=${result.data.id},dept=${result.data.dept},faculty=${result.data.faculty_type},name=${result.data.name},phone=${result.data.phone_no},courses=${result.data.courses_handled}} path='/'`;
        cookie.save('id', result.data.id, { path: '/'})
        cookie.save('dept', result.data.dept, { path: '/'})
        cookie.save('faculty', result.data.faculty_type, { path: '/'})
        cookie.save('name', result.data.name, { path: '/'})
        cookie.save('phone', result.data.phone_no, { path: '/'})
        window.location.replace(window.location.href.replace('signupdetails','dashFaculty'))
      }
    }catch(e){
      document.getElementById('errorcodes').innerHTML = e.message;
      document.getElementById('errorcodes').style.display = "block";
      console.log(e);
    }
  }

  return (
    <div class='mainDetailsContainer' >
      <Background />
      <div className='detailsContainer' onLoad={checkCookies()}>
          <div className='detailsFields'>
              <p>Hello, <span>Somename</span></p>
              <h2>Lets get to know more about <span style={{fontSize: '30px'}}>You</span></h2>
              <div className='detailsInputs'>
                  <div className='inputTable'>
                    <div className='inputTableRow'>Name </div><input type='text' placeholder='Name' className='detailsInput'/>
                  </div>
                  <div className='inputTable'>
                    <div className='inputTableRow'>Phone No. </div><input type='text' placeholder='Phone Number' className='detailsInput'/>
                  </div>
                  <div className='inputTable'>
                    <div className='inputTableRow'>Department </div><input type='text' placeholder='Department' className='detailsInput'/>
                  </div>
                  <div className='inputTable'>
                    <div className='inputTableRow'>Faculty </div><input type='text' placeholder='Faculty' className='detailsInput'/>
                  </div>
                  {/* <div className='inputTable'>
                    <div className='inputTableRow'>Tutor for Courses </div><Select styles={{control: (baseStyles) => ({...baseStyles,backgroundColor: '#B6EADA',margin: '10px', minHeight: '45px', paddingLeft: '20px', borderColor: 'black', maxWidth: '428px'}),}} isMulti options={options} />
                  </div> */}
                  <div className='inputTable'>
                    <div className='inputTableRow'>Date of Joining SRM </div><input type='date' className='detailsInput'/>
                  </div>
                  <div className='inputTable'>
                    <div className='inputTableRow'>Experience at SRM </div><input type='number' placeholder='In Years' className='detailsInput'/>
                  </div>
                  <div className='inputTable'>
                    <div className='inputTableRow'>Experience at Other Institution </div><input type='number' placeholder='In years' className='detailsInput'/>
                  </div>
                  <div className='inputTable'>
                    <div id="errorcodes">error</div><button className='detailsSubmitButton' onClick={checkValidity}>Submit</button>
                  </div>
              </div>
        </div>
      </div>
    </div>
  )
}

export default SignupDetails