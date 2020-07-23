import React, { useEffect, useState } from 'react';
import { db } from "../services/firebase";

export default function HomePage() {
  const [state, setState] = useState({
    notes: [],
    content: ""
  })
  useEffect(() => {
    db.ref("notes").on("value", snapshot => {
      let allNotes = [];
      snapshot.forEach(snap => {
        allNotes.push(snap.val());
      });
      console.log('allNotes', allNotes)
      setState({ notes: allNotes });
    });
  },[])

  const handleChange = (e) => {
    setState({...state, content: e.target.value})
  }

  const createNote = () => {
    const uid = '002';
    const note_id = `note-${Date.now()}`;
    db.ref(`notes/${uid}`)
    .set({
      content: state.content,
      note_id,
      uid
    })
    .then(_ => {
      setState({ content: "" });
    });
  }
  console.log('sttae', state);
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
        <div key={i} style={{display: 'flex'}}>
        <p style={{ padding: `5px 10px`}}>{note.content}</p>{` `}
        <p style={{ padding: `5px 10px`}}>{note.note_id}</p>
        </div>
      ))}
      </div>
        </section>
      </div>
    )

}
