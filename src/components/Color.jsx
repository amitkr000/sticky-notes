import { useContext } from "react";
import { NoteContext } from "../context/NoteContext";
import { db } from "../appwrite/databases";

const Color = ({ color }) => {
    const {notes, setNotes, selectedNote} = useContext(NoteContext)

    const changeColor = () => {
        console.log("Selected color:", color);

        try {
            const currentNoteIndex = notes.findIndex(
                (note) => note.$id === selectedNote.$id
            );
     
            const updatedNote = {
                ...notes[currentNoteIndex],
                color: JSON.stringify(color),
            };
     
            const newNotes = [...notes];
            newNotes[currentNoteIndex] = updatedNote;
            setNotes(newNotes);
     
            db.notes.update(selectedNote.$id, {
                color: JSON.stringify(color),
            });
        } catch (error) {
            alert("You must select a note before changing colors");
        }
    };
 
    return (
        <div
            onClick={changeColor}
            className="color"
            style={{ backgroundColor: color.colorHeader }}
        ></div>
    );
};

export default Color;