import './App.css';
import Home from './containers/home';
import { Route, Routes, useNavigate } from 'react-router-dom';
import { ProfileManage } from './containers/ProfileManage';


function App() {

    return (
        <Routes>
            <Route exact path=""  element={<Home />}/>
            <Route path="/manageProfile" element={<ProfileManage />} />
        </Routes>
    );
}

export default App;