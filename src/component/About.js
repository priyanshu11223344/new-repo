import React from 'react'
import notescontext from '../context/notes/Notescontext'
import { useContext } from 'react'
export default function About() {
  const a=useContext(notescontext)
  return (
    <div>
      <h1>this is {a.name} and in year {a.year}</h1>
    </div>
  )
}

