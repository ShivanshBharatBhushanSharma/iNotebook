import { useState } from "react";
import NoteContext from "./noteContext";

const NoteState = (props) => {
  const host = 'http://localhost:5000';
  const notesInitial = [];

  const [notes, setNotes] = useState(notesInitial);

// Get all Notes
const getNotes = async (title, description, tag) => {
  // API call
  const response = await fetch(`${host}/api/notes/fetchallnotes`, {
    method: "GET", 
    headers: {
      "auth-token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjQ2NWJjODVlZTllNjBjYjM2OGFkM2RlIn0sImlhdCI6MTY4NDUwMDQxMH0.q8RcVjo50Ss6MpA8YUKpKH4A7QiZAbZZN5f3GUIjxqo"
    },
  });
  const json = await response.json();
  setNotes(json);
};

  // Add a Note
  const addNote = async (title, description, tag) => {
    // API call
    const response = await fetch(`${host}/api/notes/addnote`, {
      method: "POST", 
      headers: {
        "Content-Type": "application/json",
        "auth-token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjQ2NWJjODVlZTllNjBjYjM2OGFkM2RlIn0sImlhdCI6MTY4NDUwMDQxMH0.q8RcVjo50Ss6MpA8YUKpKH4A7QiZAbZZN5f3GUIjxqo"
      },
      body: JSON.stringify({title, description, tag}), 
    });
    const json = response.json();
    console.log(json);

    console.log("Adding a new note");
    const note = {
      _id: "646874313449e408f448f325",
      user: "6465bc85ee9e60cb368ad3de",
      title: title,
      description: description,
      tag: tag,
      date: "2023-05-20T07:18:09.181Z",
      __v: 0,
    };
    setNotes(notes.concat(note));
  };

  // Delete a Note
  const deleteNote = async (id) => {
    // API call
    const response = await fetch(`${host}/api/notes/deletenote/${id}`, {
      method: "DELETE", 
      headers: {
        "auth-token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjQ2NWJjODVlZTllNjBjYjM2OGFkM2RlIn0sImlhdCI6MTY4NDUwMDQxMH0.q8RcVjo50Ss6MpA8YUKpKH4A7QiZAbZZN5f3GUIjxqo"
      },
    });
    const json = await response.json();
    console.log(json);
    
    console.log("Deleting the note with id " + id);
    const newNotes = notes.filter((note) => {
      return note._id !== id;
    });
    setNotes(newNotes);
  };

  // Edit a Note
  const editNote = async (id, title, description, tag) => {
    // API Call
    const response = await fetch(`${host}/api/notes/updatenote/${id}`, {
      method: "PUT", 
      headers: {
        "Content-Type": "application/json",
        "auth-token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjQ2NWJjODVlZTllNjBjYjM2OGFkM2RlIn0sImlhdCI6MTY4NDUwMDQxMH0.q8RcVjo50Ss6MpA8YUKpKH4A7QiZAbZZN5f3GUIjxqo"
      },
      body: JSON.stringify({title, description, tag}), 
    });
    const json = response.json();
    console.log(json);
  
    // Logic to edit in client
    for (let index = 0; index < notes.length; index++) {
      const element = notes[index];
      if(element._id === id){
        element.title = title;
        element.description =description;
        element.tag = tag;
      }
    }
  };

  return (
    <NoteContext.Provider
      value={{ notes, setNotes, addNote, deleteNote, editNote, getNotes }}
    >
      {props.children}
    </NoteContext.Provider>
  );
};

export default NoteState;
