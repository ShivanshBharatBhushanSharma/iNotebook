import { useState } from "react";
import NoteContext from "./noteContext";

const NoteState = (props) => {
  const notesInitial = [
    {
      _id: "646857f5eeff9ccefe33084b",
      user: "6465bc85ee9e60cb368ad3de",
      title: "My Title",
      description: "Please wake up early",
      tag: "personal",
      date: "2023-05-20T05:17:41.161Z",
      __v: 0,
    },
    {
      _id: "646874313449e408f448f325",
      user: "6465bc85ee9e60cb368ad3de",
      title: "New Note",
      description: "React JS Course Completed",
      tag: "youtube",
      date: "2023-05-20T07:18:09.181Z",
      __v: 0,
    },
  ];

  const [notes, setNotes] = useState(notesInitial);
  return (
    <NoteContext.Provider value={{ notes, setNotes }}>
      {props.children}
    </NoteContext.Provider>
  );
};

export default NoteState;
