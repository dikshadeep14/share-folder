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
const baseRef= `oneplus7prodeletetest@yopmailcom`;

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
    db.ref(baseRef).on("value", snapshot => {
      let allNotes = [];
      let allFolder = [];
      let files = [];
      snapshot.forEach(snap => {
        allNotes.push({ ...snap.val(), key: snap.key });
      });
      // console.log(allNotes);
      allNotes.filter(note => {
        if (note.type === 'Dir') {
          allFolder.push(note)
        } else {
          files.push(note)
        }
        return note
      })
      setState({ notes: allNotes, folders: allFolder, files: files });
    });
  }, [home])

  function forceDownload(url, fileName) {
    var xhr = new XMLHttpRequest();
    xhr.open("GET", url, true);
    xhr.responseType = "blob";
    xhr.onload = function () {
      var urlCreator = window.URL || window.webkitURL;
      var imageUrl = urlCreator.createObjectURL(this.response);
      var tag = document.createElement('a');
      tag.href = imageUrl;
      tag.download = fileName;
      document.body.appendChild(tag);
      tag.click();
      document.body.removeChild(tag);
    }
    xhr.send();
  }
  const handleClick = (data) => {
    setPath(data);
    db.ref(`${baseRef}/${data.key}`)
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

  const handleBack = () => {
    var str = history.path.split("/");
    let path = str.splice(0, str.length - 1).join().replace(/,/g, "/");
    if (state.notes.length) {
      let present = state.notes[0];
      db.ref(`${baseRef}/${present.key}`)
        .update({
          path: path,
        })
        .then(_ => {
          // setPath(data);
          sethistory({ ...present, path: path })
        });
    } else {
      db.ref(`${baseRef}`)
        .push({
          clicked: "1",
          name: history.name,
          path: path,
          timedtamp: history.timedtamp,
          type: history.type
        })
        .then(_ => {
          // setPath(data);
          // console.log(_, 'back', path);
          db.ref(`${baseRef}/${_.key}`)
            .update({
              path: path + '/',
            })
            .then(_ => {
              // setPath(data);
              sethistory({ ...state.notes[0], path: path })
            });
        });
    }
  }

  const handleDownload = (data) => {
    let a = {
      ...data,
      clicked: "2"
    }
    db.ref(baseRef).child(data.key)
      .set(a)
      .then(_ => {
        var httpsReference = storageRef.refFromURL('gs://filesystem-46647.appspot.com/fileSystem/' + data.timedtamp);
        httpsReference.getDownloadURL().then(function (url) {
          // `url` is the download URL for 'images/stars.jpg'
          console.log(url, 'url');
          // This can be downloaded directly:
          // forceDownload(url, 'test')
        }).catch(function (error) {
          // Handle any errors
          console.log('error', error)
        });
      });
  }

  const handleDelete = (data) => {
    db.ref(`${baseRef}/${data.key}`)
      .update({
        clicked: "3"
      })
      .then(_ => {
        sethistory(data);
      }).then(() => {
        handleBack();
      });
  }

  const bread = () => {
    if (state.notes.length > 0) {
      let arr = state.notes[0].path.split('/');
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
        history={history}
        breadcrumb={bread}
        handleBack={handleBack}
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
