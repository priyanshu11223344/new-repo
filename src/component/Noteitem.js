import React from 'react'
import notescontext from '../context/notes/Notescontext'
import { useContext } from 'react'
const Noteitem = (props) => {
  const {deleteNote}=useContext(notescontext)
  const deletenote=()=>{
console.log("note deleted with id :"+ props.id)
    deleteNote(props.id)
      
  }

  return (
    
    <div className='col-md-3'>
      <div className="card my-3 " style={{ width: "18rem" }}>

        <div className="card-body">
           <h5>{props.tag}</h5>
          <div className=' card-title-icon'>
            <h5 className="card-title">{props.title}</h5>
            <div className='icons'>
            <i className="fa-solid fa-trash-can" onClick={deletenote}></i>
            <i className="fa-regular fa-pen-to-square" onClick={()=>{
              props.updatenote(props.note)
            }}></i>
            </div>
          </div>
          <p className="card-text">{props.description}</p>

        </div>
      </div>
    </div>
  )
}

export default Noteitem
