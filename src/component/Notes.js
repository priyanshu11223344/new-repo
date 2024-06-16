import React, { useState, useContext, useEffect, useRef } from 'react';
import notescontext from '../context/notes/Notescontext';
import Noteitem from './Noteitem';
import Addnote from './Addnote';
import { useNavigate } from 'react-router-dom';
const Notes = () => {
   let navigate=useNavigate();
  const { note, getallnote, editNote } = useContext(notescontext);
  if(!note){
    console.log("note noet found")
  }
  const [notee, setnote] = useState({ id:"",etitle:"", edescription:"", etag:"" });
  const ref = useRef(null);
  const ref2=useRef(null);

  useEffect(() => {
    const val=  localStorage.getItem('token');
    if(val){
      getallnote();
    }
    else{
      console.log("token in notes not found")
      navigate('/login')
    }
    // eslint-disable-next-line
  }, [getallnote]); 

  const updatenote = (currentnote) => {
    ref.current.click();
    setnote({ id:currentnote._id ,etitle: currentnote.title || "", edescription: currentnote.description || "", etag: currentnote.tag || "" });
  };

  const handleonchange = (event) => {
    setnote({ ...notee, [event.target.name]: event.target.value });
  };

  const onclick = async (e) => {
    e.preventDefault();
    ref2.current.click();
    
    try {
      await editNote(notee.etitle, notee.edescription, notee.etag, notee.id);
      setnote({ id: "", etitle: "", edescription: "", etag: "" });
    } catch (error) {
      console.error('Failed to update note:', error.message);
      // Optionally show an error message to the user
    }
  };

  return (
    <>
      <Addnote />

      <button ref={ref} type="button" className="btn btn-primary d-none" data-bs-toggle="modal" data-bs-target="#exampleModal">
        Launch demo modal
      </button>

      <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="exampleModalLabel">Edit Note</h5>
              <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div className="modal-body">
              <form className='my-10'>
                <div className="mb-3">
                  <label htmlFor="etitle" className="form-label">Title</label>
                  <input type="text" className="form-control" id="etitle" name="etitle" value={notee.etitle} onChange={handleonchange} />
                </div>
                <div className="mb-3">
                  <label htmlFor="edescription" className="form-label">Description</label>
                  <input type="text" className="form-control" id="edescription" name="edescription" value={notee.edescription} onChange={handleonchange} />
                </div>
                <div className="mb-3">
                  <label htmlFor="etag" className="form-label">Tag</label>
                  <input type="text" className="form-control" id="etag" name="etag" value={notee.etag} onChange={handleonchange} />
                </div>
              </form>
            </div>
            <div className="modal-footer">
              <button type="button" className="btn btn-secondary" data-bs-dismiss="modal" ref={ref2}>Close</button>
              <button type="button" className="btn btn-primary" onClick={onclick} >update note</button>
            </div>
          </div>
        </div>
      </div>

      <h1>YOUR NOTES</h1>
      <div className="row">
        { note.map((item) => (
          <Noteitem key={item._id} title={item.title} updatenote={() => updatenote(item)} tag={item.tag} description={item.description} id={item._id} />
        ))}
      </div>
    </>
  );
};

export default Notes;
