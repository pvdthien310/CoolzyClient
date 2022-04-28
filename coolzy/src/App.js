import logo from './logo.svg';
import './App.css';
import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import accountApi from './api/accountAPI';
import JWTApi from './api/jwtAPI';

function App() {
  const [emailUser, setEmailUser] = useState("")
  const [passwordUser, setPasswordUser] = useState("")
  const dispatch = useDispatch()
  const LoadData = async () => {
    const data = await accountApi.getAll()
    console.log(data)
  }
  const Login = async () => {
    const data = await JWTApi.login(emailUser,passwordUser)
    console.log(data)
  }
  useEffect(async () => {
    try {
      LoadData()
    } catch (err) {
      console.log(err)
    }
  }, [])

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >

          Learn React
        </a>
        <input onChange={(e) => setEmailUser(e.target.value)}></input>
        <input onChange={(e) => setPasswordUser(e.target.value)}></input>
        <button onClick={Login}>Login</button>
        <button onClick={LoadData}>Clock To Reset Data</button>
      </header>
    </div>
  );
}

export default App;
