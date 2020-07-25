import React, { useEffect, useState } from 'react';
import { db, storageRef } from "../services/firebase";
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
  const [history, sethistory] = useState({})
  const [path, setPath] = useState({});

  useEffect(() => {
    db.ref("oneplus7prodeletetest@yopmailcom").on("value", snapshot => {
      let allNotes = [];
      let allFolder = [];
      let files = [];
      snapshot.forEach(snap => {
        // console.log(allNotes);
        allNotes.push({ ...snap.val(), key: snap.key });
      });
      console.log(allNotes);
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
        if (home) {
          setHome(false);
        }
      } else {
        if (Object.keys(history).length) {
          // db.ref(`oneplus7prodeletetest@yopmailcom/${history.timedtamp}`)
          //   .update({
          //     clicked: "0",
          //     name: history.name,
          //     path: history.path,
          //     timedtamp: history.timedtamp,
          //     type: history.type
          //   })
          //   .then(_ => {
          //     sethistory(data);
          //   });
        }
      }
    });
  }, [home])

  const handleClick = (data) => {
    setPath(data);
    db.ref(`oneplus7prodeletetest@yopmailcom/${data.key}`)
      .update({
        clicked: "0",
        name: data.name,
        path: data.path,
        timedtamp: data.timedtamp,
        type: data.type
      })
      .then(_ => {
        sethistory(data);
      });
  }

  const handleBack = (data) => {
    db.ref(`oneplus7prodeletetest@yopmailcom/${path.timedtamp * 1000}`)
      .update({
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
    let a = {
      ...data,
      clicked: "2"
    }
    db.ref(`oneplus7prodeletetest@yopmailcom`).child(data.key)
      .set(a)
      .then(_ => {
        var httpsReference = storageRef.refFromURL('gs://filesystem-46647.appspot.com/filesystem/Screenshot (2).png');
        httpsReference.getDownloadURL().then(function (url) {
          // `url` is the download URL for 'images/stars.jpg'
          console.log(url, 'url');
          // This can be downloaded directly:
          var xhr = new XMLHttpRequest();
          xhr.responseType = 'blob';
          xhr.onload = function (event) {
            var blob = xhr.response;
          };
          xhr.open('GET', url);
          xhr.send();

          // Or inserted into an <img> element:
          // var img = document.getElementById('myimg');
          // img.src = url;
        }).catch(function (error) {
          // Handle any errors
        });
      });
  }

  const handleDelete = (data) => {
    console.log(data, 'delete');
    db.ref(`oneplus7prodeletetest@yopmailcom/${data.key}`)
      .update({
        clicked: "3"
      })
      .then(_ => {
      });
  }
  const bread = () => {
    if (state.folders.length > 0) {
      let arr = state.folders[0].path.split('/');
      arr.splice(-1, 1);
      return arr.join('/');
    }
  }
  const classes = useStyle();
  return (
    <>
      <Header
        setHome={(data) => setHome(data)}
        setRefresh={(data) => setRefresh(data)}
        breadcrumb={bread}
      />
      <div className={classes.root}>
        <section>
          <div>
            <Grid item xs={12}>
              <Typography align='left' className={classes.title}>
                Folders {state.folders.length}
              </Typography>
              {state.folders.length > 0 && state.folders.map((folder, i) => (
                <div key={i} style={{ display: 'flex' }}>
                  <ListCard name={folder.name} data={folder} time={folder.timedtamp} handleDelete={handleDelete} handleClick={handleClick} />
                </div>
              ))}
            </Grid>
            <Divider />
            <Grid item xs={12}>
              <Typography align='left' className={classes.title}>
                Files {state.files.length}
              </Typography>
              {state.files.length > 0 && state.files.map((file, i) => (
                <div key={i} style={{ display: 'flex' }} >
                  <ListCard handleDownload={handleDownload} handleDelete={handleDelete} handleClick={handleClick} name={file.name} data={file} time={file.timedtamp} />
                </div>
              ))}
            </Grid>
          </div>
        </section>
      </div>
    </>)
}
