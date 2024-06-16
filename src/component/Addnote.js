import React, { useState } from 'react'
import notescontext from '../context/notes/Notescontext'
import { useContext } from 'react'
function Addnote() {
    // now here the values will get update so we will call context api here
    const {addNote}=useContext(notescontext)
    const [notee,setnote]=useState({title:"",description:"",tag:""})

  
    const handleonchange=(event)=>{
          setnote({...notee,[event.target.name]:event.target.value})
    }
    const onclick=(e)=>{
        e.preventDefault();
        addNote(notee.title || "", notee.description || "", notee.tag || ""); // Pass individual fields
          setnote({ title: "", description: "", tag: "" }); // Reset the form after submission
       
    }
  return (
    <div>
      <h1 className="my-10 ">ADD NOTES</h1>
        <form className='my-10'>
          <div className="mb-3">
            <label htmlFor="title" className="form-label">Title</label>
            <input type="text" className="form-control" id="title" name="title" aria-describedby="emailHelp" value={notee.title} onChange={handleonchange}/>
          
          </div>
          <div className="mb-3">
            <label htmlFor="description" className="form-label">Description</label>
            <input type="text" className="form-control" id="description" name="description"  value={notee.description} onChange={handleonchange}/>
          </div>
          <div className="mb-3">
            <label htmlFor="tag" className="form-label">Tag</label>
            <input type="text" className="form-control" id="tag"  name="tag" value={notee.tag}  onChange={handleonchange} />
          </div>
         
          <button type="submit" className="btn btn-primary" onClick={onclick}>ADD NOTE</button>
        </form>
    </div>
  )
}

export default Addnote
