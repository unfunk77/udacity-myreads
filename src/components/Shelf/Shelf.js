import React from 'react'
import './Shelf.css'

const Shelf = (props) => (
  <div className="bookshelf">
    <h2 className="bookshelf-title">{props.title}</h2>
    <div className="bookshelf-books">
      {props.children}
    </div>
  </div>
)

export default Shelf;
