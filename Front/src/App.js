import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Login from './screens/login/Login'
import Signup from './screens/signup/signup';
import SignupDetails from './screens/signupDetails/details';
import Theme from './components/themeOptions/theme';
import Dashboard from './screens/dashboard/dashboard';
import DashFaculty from './screens/dashFaculty/dashFaculty';
import RegisterCourses from './screens/registerCourses/registerCourses';
import './App.css';

function App() {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="/login" element={ <Login /> } />
          <Route path="/signup" element={ <Signup /> } />
          <Route path='/signupdetails' element={ <SignupDetails />} />
          <Route path='/dashboard' element={ <Dashboard />} />
          <Route path='/dashFaculty' element={ <DashFaculty/> } />
          <Route path='/registerCourses' element={ <RegisterCourses/> } />
          {/* TODO Remove SIgnupDetails Route */}
        </Routes>
      </BrowserRouter>
      <Theme />
    </div>
  );
}

export default App;
