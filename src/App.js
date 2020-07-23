import React, { useEffect, useState } from 'react';
import { CircularProgress } from "@material-ui/core";
import './App.css';
import Home from './pages/Home';
import { auth } from './services/firebase';
import Header from "./components/Header";
function App() {
  const [state, setState] = useState({
    authenticated: false,
    loading: true,
  })
  const [home, setHome] = useState(false)
  const [refresh, setRefresh] = useState(false)

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
      {state.loading ? <CircularProgress /> :
        <>
          <Header
            setHome={(data) => setHome(data)}
            setRefresh={(data) => setRefresh(data)}
          />
          <Home
            setHome={(data) => setHome(data)}
            setRefresh={(data) => setRefresh(data)}
            home={home}
            refresh={refresh}
          />
        </>
      }

    </div>
  );
}

export default App;
