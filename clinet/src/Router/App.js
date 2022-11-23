import '../App.css';
import 'semantic-ui-css/semantic.min.css'
import { AuthContext } from '../contexts';
import { useState, useEffect } from 'react';
import Login from '../View/Login';
import List from '../View/List';
import ModalExampleModal from "../View/ChangeList";
import CreateUser from '../View/CreateUser';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import ProtectedRoutes from './ProtectedRoutes';
import { Button, Header, Image, Modal } from "semantic-ui-react";

function App() {
  const [user, setUser] = useState(false);
  return (
  <AuthContext.Provider value={{user, setUser}}>
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/createUser" element={<CreateUser />} />
        <Route element ={<ProtectedRoutes/>}>
          <Route path="/list" element={<List />} />
        </Route>
      </Routes>
    </Router>
  </AuthContext.Provider>
  );
  
}

export default App;
