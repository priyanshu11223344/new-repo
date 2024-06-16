import React, { useState } from 'react';
import NotesContext from './Notescontext';

export default function NotesState(props) {
  const host="http://localhost:5000";
      const token =  localStorage.getItem('token');    
 
  
    const Initialnotes=[]
      const [note,setnotes]=useState(Initialnotes)
      
      const getallnote = async () => {
        const url = `${host}/api/notes/fetchnote`;
    
        // Retrieve token from local storage
        const token = localStorage.getItem('token');
        if (!token) {
            console.log('Token not found in local storage');
            return; // Exit the function if token is not found
        }
    
        const response = await fetch(url, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "auth-token": token // Use the retrieved token here
            },
            // Additional parameters if needed
        });
    
        const json = await response.json();
       
        setnotes(json);
    }
    

      const addNote= async (title,description,tag)=>{
        const url=`${host}/api/notes/addnote`;
        // Retrieve token from local storage
        const token = localStorage.getItem('token');
        if (!token) {
            console.log('Token not found in local storage');
            return; // Exit the function if token is not found
        }
        const response = await fetch(url, {
          method: "POST", 
        
          headers: {
            "Content-Type": "application/json",
            "auth-token": token
           
          },
         
          body: JSON.stringify({title,description,tag}),
          //here we send paramters under this which mean title=title description=description etc{} as it is an object 
         
         
        }
       )
       const json=await response.json()
       console.log(json);
       setnotes([...note,json])


      }
      
      const deleteNote=async (id)=>{
        const url=`${host}/api/notes/deletenote/${id}`
        // Retrieve token from local storage
    
        if (!token) {
            console.log('Token not found in local storage');
            return; // Exit the function if token is not found
        }
        const response = await fetch(url, {
          method: "DELETE", 
        
          headers: {
            "Content-Type": "application/json",
            "auth-token": token
           
          },
         
         
          //here we send paramters under this which mean title=title description=description etc{} as it is an object 
         
        })
          const deletednote=note.filter((note)=>{
            return(note._id!==id)
          })
          console.log(response);
          setnotes(deletednote)
      }
      const editNote= async (title,description,tag,id)=>{

        //API CALL TO FIRST FETCH THE DATA AND THEN EDIT A NOTE 
        const url=`${host}/api/notes/updatenote/${id}`
        // Retrieve token from local storage
        const token =  localStorage.getItem('token');
        if (!token) {
            console.log('Token not found in local storage');
            return; // Exit the function if token is not found
        }
        const response = await fetch(url, {
          method: "PUT", 
        
          headers: {
            "Content-Type": "application/json",
            "auth-token": token
           
          },
         
          body: JSON.stringify({title,description,tag}),
         
        })
        const json= await response.json()
        console.log(json);
    
            
            for(let i=0;i<note.length;i++){
              const element=note[i];
              if(element._id===id){
                element.title=title;
                element.description=description;
                element.tag=tag;
              }
            }
      }

    return (
        <NotesContext.Provider value={{ note,addNote,deleteNote,editNote ,getallnote}}>
            {props.children}
        </NotesContext.Provider>
    );
}
