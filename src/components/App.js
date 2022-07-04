import React, { useEffect, useState } from "react";
import Axios from "axios";
import Header from "./Header";
import Footer from "./Footer";
import Note from "./Note";
import CreateArea from "./CreateArea";

function App() {
  const [notes, setNotes] = useState([]);
  const [userTypes, setUserTypes] = useState([])

  useEffect(() => {
    async function fetchData() {
      const response = await Axios.get('http://localhost:3001/user-types')
      setUserTypes(response.data.userTypes)
    }
    fetchData();
  }, [])



  function addNote(newNote) {
    setNotes((prevNotes) => {
      return [...prevNotes, newNote];
    });
  }

  function deleteNote(id) {
    setNotes((prevNotes) => {
      return prevNotes.filter((noteItem, index) => {
        return index !== id;
      });
    });
  }

  console.log(userTypes)

  return (
    <div>
      <Header />
      <CreateArea onAdd={addNote} />
      {notes.map((noteItem, index) => {
        return (
          <Note
            key={index}
            id={index}
            title={noteItem.title}
            content={noteItem.content}
            onDelete={deleteNote}
          />
        );
      })}
      <Footer />
      {userTypes.map(user => {
        return <div>{user.userType}</div>
      })}
    </div>
  );
}

export default App;
