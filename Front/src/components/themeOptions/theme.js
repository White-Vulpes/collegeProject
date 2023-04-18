import React from 'react'
import { CiDark, CiLight } from 'react-icons/ci'
import './theme.css'

function theme() {

    window.theme = 'dark';
    const changeTheme = () => {
        if(window.theme === 'dark'){
            document.getElementById('themeSelect').style.backgroundColor = 'black';
            document.getElementById('lightMode').style.display = 'none';
            document.getElementById('darkMode').style.display = 'block';
            document.querySelector(':root').style.setProperty('--background', '#FBF8F1');
            document.querySelector(':root').style.setProperty('--secondary', '#54BAB9');
            document.querySelector(':root').style.setProperty('--primary', '#E9DAC1');
            document.querySelector(':root').style.setProperty('--color', '#F7ECDE');
            document.querySelector(':root').style.setProperty('--textColor', '#000000');
            window.theme = 'light';
        }
        else{
            document.getElementById('themeSelect').style.backgroundColor = 'beige';
            document.getElementById('darkMode').style.display = 'none';
            document.getElementById('lightMode').style.display = 'block';
            document.querySelector(':root').style.setProperty('--background', '#082032');
            document.querySelector(':root').style.setProperty('--secondary', '#FF4C29');
            document.querySelector(':root').style.setProperty('--primary', '#334756');
            document.querySelector(':root').style.setProperty('--color', '#2C394B');
            document.querySelector(':root').style.setProperty('--textColor', '#FBF8F1');
            window.theme = 'dark';
        }
    }

    return (
        <div className='themeSelector' id='themeSelect' onClick={changeTheme}>
            <CiDark color='beige' id='darkMode'/>
            <CiLight color='black'id='lightMode'/>
        </div>
    )
}

export default theme