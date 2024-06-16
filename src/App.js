
import './App.css';
import './css/styles.css'
import {
  BrowserRouter as Router,
  Route,Routes
} from "react-router-dom";
import Navbar from './component/navbar';
import Home from './component/Home';
import About from './component/About';
import Notesstate from './context/notes/Notesstate';
import Alert from './component/Alert';
import Login from './component/Login';
import Signup from './component/Signup';
//here react router dom will be set up because jumping of one component to another component will be done from here
function App() {
  return (
    <div>
     <Notesstate>
     <Router>
        <Navbar></Navbar>
        <Alert msg="this is an alert msg"/>
      <Routes>
       <Route path="/home" element={<Home/>}> </Route>
       <Route path="/about" element={<About/>}> </Route>
       <Route path="/login" element={<Login/>}></Route>
       <Route path="/signup" element={<Signup/>}></Route>

      </Routes>
      
      </Router>
     </Notesstate>
    </div>
  );
}

export default App;
