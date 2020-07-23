import React, { useEffect, useState } from 'react';
import { db } from "../services/firebase";

export default function HomePage() {
  const [state, setState] = useState({
    notes: []
    
  })
  const [content, setCont] = useState("");
  useEffect(() => {
    db.ref("emulater@yopmailcom").on("value", snapshot => {
      let allNotes = [];
      
      snapshot.forEach(snap => {
        allNotes.push(snap.val());
      });
      console.log('allNotes', allNotes);
      setState({ notes: allNotes });
    });
  },[])

  const handleChange = (e) => {
    setCont(e.target.value)
  }

  const createNote = () => {
    // const uid = '002';
    // const note_id = `note-${Date.now()}`;
    // db.ref(`notes/${data.timedtamp}`)
    // .set({
      
    // })
    // .then(_ => {
    //   setCont("")
    // });
  }

  const handleClick = (data) => {
    const uid = '002';
    const note_id = `note-${Date.now()}`;
    console.log('data', data);
    db.ref(`emulater@yopmailcom/${data.timedtamp}`)
    .set({
      clicked: true,
      name: data.name,
      path: data.path,
      timedtamp: data.timedtamp,
      type: data.type
    })
    .then(_ => {
      // setCont("")
    });
  }

    return (
      <div>
        <section>
          <h1>Home page</h1>
          <div>
          <input
            onChange={(e) => handleChange(e)}
            value={state.content}
          />
          <button onClick={createNote}>
            Create Note
          </button>
        </div>
        <div>
      {state.notes.length > 0 && state.notes.map((note, i) =>(
        <div key={i} style={{display: 'flex'}} onClick={() => {
          handleClick(note);
        }}>
        <p style={{ padding: `5px 10px`}}>{note.name}</p>{` `}
        <p style={{ padding: `5px 10px`}}>{note.note_id}</p>
        </div>
      ))}
      </div>
        </section>
      </div>
    )

}
