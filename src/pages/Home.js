import React, { useEffect, useState } from 'react';
import { db } from "../services/firebase";
import ListCard from "../components/List_card"
import { Divider, Grid, Typography, makeStyles } from '@material-ui/core';
import { font } from "../components/Misc";

const useStyle = makeStyles({
  title: {
    fontSize: font.sm,
    color: 'grey'
  }
})

export default function HomePage() {
  const [state, setState] = useState({
    notes: [],
    folders: [],
    files: []
  })

  useEffect(() => {
    db.ref("emulater@yopmailcom").on("value", snapshot => {
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
      })
      setState({ notes: allNotes, folders: allFolder, files: files });
    });
  }, [])

  const handleClick = (data) => {
    console.log('data', data);
    db.ref(`emulater@yopmailcom/${data.timedtamp * 1000}`)
      .set({
        clicked: true,
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
    <div style={{ padding: '20px' }}>
      <section>
        {/* <h1>Home page</h1> */}
        <div>
          <Grid>
            <Typography align='left' className={classes.title}>
              Folders {state.folders.length}
            </Typography>
            {state.folders.length > 0 && state.folders.map((folder, i) => (
              <div key={i} style={{ display: 'flex' }} onClick={() => {
                handleClick(folder);
              }}>
                <ListCard name={folder.name} time={folder.timedtamp} />
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
                <ListCard name={file.name} time={file.timedtamp} />
              </div>
            ))}
          </Grid>
        </div>
      </section>
    </div>
  )
}
