import React, { useContext } from 'react'
import notescontext from '../context/notes/Notescontext'
import Noteitem from './Noteitem';
import Notes from './Notes';
export default function Home() {
  
  const {note,setnotes}=useContext(notescontext);

  if (!note) {
    return <div>Loading...</div>; // Handle the case where notes might be undefined
}
  return (
    <div>
      <div className="container my-7">
        
        
        
       <div className='notes-section'>
       <Notes ></Notes>
       
       </div>
      </div>
    </div>
  )
}
