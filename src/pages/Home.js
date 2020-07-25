import React, { useEffect, useState } from 'react';
import { db } from "../services/firebase";
import ListCard from "../components/List_card"
import { Divider, Grid, Typography, makeStyles } from '@material-ui/core';
import { font } from "../components/Misc";
import Header from "../components/Header"

const useStyle = makeStyles({
  root: {
    padding: '20px',
    height: '80vh',
    overflowY: 'auto'
  },
  title: {
    fontSize: font.sm,
    color: 'grey',
    padding: `10px`
  }
})

export default function HomePage() {
  const [state, setState] = useState({
    notes: [],
    folders: [],
    files: []
  });
  const [home, setHome] = useState(false)
  const [refresh, setRefresh] = useState(false)
  const [path, setPath] = useState({});

  useEffect(() => {
    db.ref("oneplus7pro@yopmailcom").on("value", snapshot => {
      let allNotes = [];
      let allFolder = [];
      let files = [];
      snapshot.forEach(snap => {
        allNotes.push(snap.val());
      });
      allNotes.filter(note => {
        if (note.type === 'Dir') {
          allFolder.push(note)
        } else {
          files.push(note)
        }
        return note
      })
      setState({ notes: allNotes, folders: allFolder, files: files });
      if (allNotes.length) {
        if (home)
          setHome(false)
      }
    });
  }, [home])

  const handleClick = (data) => {
    setPath(data);
    db.ref(`oneplus7pro@yopmailcom/${data.timedtamp * 1000}`)
      .set({
        clicked: "0",
        name: data.name,
        path: data.path,
        timedtamp: data.timedtamp,
        type: data.type
      })
      .then(_ => {
      });
  }

  const handleBack = (data) => {
    db.ref(`oneplus7pro@yopmailcom/${path.timedtamp * 1000}`)
      .set({
        clicked: "1",
        name: path.name,
        path: path.path,
        timedtamp: path.timedtamp,
        type: path.type
      })
      .then(_ => {
        setPath(data);
      });
  }

  const handleDownload = (data) => {
    db.ref(`oneplus7pro@yopmailcom/${data.timedtamp * 1000}`)
      .set({
        clicked: "2",
        name: data.name,
        path: data.path,
        timedtamp: data.timedtamp,
        type: data.type
      })
      .then(_ => {
    });
  }

  const handleDelete = (data) => {
    db.ref(`oneplus7pro@yopmailcom/${data.timedtamp * 1000}`)
      .set({
        clicked: "3",
        name: data.name,
        path: data.path,
        timedtamp: data.timedtamp,
        type: data.type
      })
      .then(_ => {
    });
  }

  const classes = useStyle();
  return (
    <>
      <Header
        setHome={(data) => setHome(data)}
        setRefresh={(data) => setRefresh(data)}
      />
      <div className={classes.root}>
        <section>
          <div>
            <Grid item xs={12}>
              <Typography align='left' className={classes.title}>
                Folders {state.folders.length}
              </Typography>
              {state.folders.length > 0 && state.folders.map((folder, i) => (
                <div key={i} style={{ display: 'flex' }} onClick={() => {
                  handleClick(folder);
                }}>
                  <ListCard name={folder.name} data={folder} time={folder.timedtamp} handleDelete={handleDelete} />
                </div>
              ))}
            </Grid>
            <Divider />
            <Grid item xs={12}>
              <Typography align='left' className={classes.title}>
                Files {state.files.length}
              </Typography>
              {state.files.length > 0 && state.files.map((file, i) => (
                <div key={i} style={{ display: 'flex' }} onClick={() => {
                  handleClick(file);
                }}>
                  <ListCard handleDownload={handleDownload} handleDelete={handleDelete} name={file.name} data={file} time={file.timedtamp} />
                </div>
              ))}
            </Grid>
          </div>
        </section>
      </div>
    </>)
}
