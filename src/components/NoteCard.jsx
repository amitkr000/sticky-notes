import { useEffect, useRef, useState, useContext } from "react";
import {setNewOffset, autoGrow, setZIndex, bodyParser} from '../utils.js'
import { db } from "../appwrite/databases";
import Spinner from "../icons/spinner.jsx";
import DeleteButton from "./DeleteButton.jsx";
import { NoteContext } from "../context/NoteContext.jsx";

const NoteCard = ({note}) => {
    //let position = JSON.parse(note.position);
    const [position, setPosition] = useState(JSON.parse(note.position));
    const colors = JSON.parse(note.color);
    const body = bodyParser(note.body);

    const saveData = async (key, value) => {
        const payload = { [key]: JSON.stringify(value) };
        try {
            await db.notes.update(note.$id, payload);
        } catch (error) {
            console.error(error);
        }
        setSaving(false);
    };

    const [saving, setSaving] = useState(false);
    const keyUpTimer = useRef(null);

    const handleKeyUp = async () => {
        //1 - Initiate "saving" state
        setSaving(true);
     
        //2 - If we have a timer id, clear it so we can add another two seconds
        if (keyUpTimer.current) {
            clearTimeout(keyUpTimer.current);
        }
     
        //3 - Set timer to trigger save in 2 seconds
        keyUpTimer.current = setTimeout(() => {
            saveData("body", textAreaRef.current.value);
        }, 2000);
    };

    const textAreaRef = useRef(null);

    useEffect(() => {
        autoGrow(textAreaRef);
        setZIndex(cardRef.current);
    }, []);

    let mouseStartPos = { x: 0, y: 0 };
 
    const cardRef = useRef(null);

    const { setSelectedNote } = useContext(NoteContext);
    const mouseDown = (e) => {
        if (e.target.className==="card-header"){
            setZIndex(cardRef.current);
            
            mouseStartPos.x = e.clientX;
            mouseStartPos.y = e.clientY;
        
            document.addEventListener("mousemove", mouseMove);
            document.addEventListener("mouseup", mouseUp);

            setSelectedNote(note);
        }
    };

    const mouseMove = (e) => {
        //1 - Calculate move direction
        let mouseMoveDir = {
            x: mouseStartPos.x - e.clientX,
            y: mouseStartPos.y - e.clientY,
        };
     
        //2 - Update start position for next move.
        mouseStartPos.x = e.clientX;
        mouseStartPos.y = e.clientY;
     
        //3 - Update card top and left position.
        const newPosition = setNewOffset(cardRef.current, mouseMoveDir);
        setPosition(newPosition);
    };

    const mouseUp = () => {
        document.removeEventListener("mousemove", mouseMove);
        document.removeEventListener("mouseup", mouseUp);

        const newPosition = setNewOffset(cardRef.current);
        saveData("position", newPosition);
    };


    return (
        <div className="card" ref={cardRef}
        style={{
            backgroundColor: colors.colorBody,
            left: `${position.x}px`,
            top: `${position.y}px`,
        }}>
            <div
                className="card-header"
                style={{ backgroundColor: colors.colorHeader }} onMouseDown = { mouseDown }
            >
                <DeleteButton noteId={note.$id}/>
                {saving && (
                    <div className="card-saving">
                        <Spinner color={colors.colorText} />
                        <span style={{ color: colors.colorText }}>Saving...</span>
                    </div>)
                }
            </div>
            <div className="card-body">
                <textarea style={{color : colors.colorText}}
                defaultValue={body} ref={textAreaRef}
                onKeyUp={handleKeyUp}
                onInput = {() => {
                    autoGrow(textAreaRef)}} 
                onFocus={() => {
                    setZIndex(cardRef.current);
                    setSelectedNote(note);
                }}>
                </textarea>
            </div>
        </div>
    );
};

export default NoteCard;