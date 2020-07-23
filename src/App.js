import React, { useEffect, useState } from 'react';
// import logo from './logo.svg';
import './App.css';
import Home from './pages/Home';
import { auth } from './services/firebase';
import Header from "./components/Header";
function App() {
  const [state, setState] = useState({
    authenticated: false,
    loading: true,
  })
  useEffect(() => {
    auth().onAuthStateChanged((user) => {
      if (user) {
        setState({
          authenticated: true,
          loading: false,
        });
      } else {
        setState({
          authenticated: false,
          loading: false,
        });
      }
    })
  }, [])

  return (
    <div className="App">
      <Header />
      <Home />
    </div>
  );
}

export default App;
