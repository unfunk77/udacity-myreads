import React from 'react'
import './Book.css'

const Book = (props) => {
  const {shelves,id,title,imageLinks,authors,changeShelf} = props;
  const thumbSmall = imageLinks.smallThumbnail || "http://via.placeholder.com/128x193/eeeeee/ffffff/?text=n/a";
  const shelf = props.shelf || "none";

  const onChange = (event) => {
    changeShelf({
      id: id,
      shelf: event.target.value
    });
  }

  const renderOptions = () => {
    return (
      <div className="book-shelf-changer">
        <select onChange={onChange} defaultValue={shelf}>
          <option value="none" disabled>Move to...</option>
          {shelves.map(shelf => <option key={shelf.id} value={shelf.id}>{shelf.title}</option>)}
        </select>
      </div>
    )
  }

  const renderAuthors = () => {
    if(authors && authors.length){
      return (
        authors.map((author,index) => (<span key={index}>{author}<br/></span>))
      )
    } else {
      return "Unknown"
    }
  }

  return (
    <div className="book">
      <div className="book-top">
        <div className="book-cover" style={{
          backgroundImage: `url(${thumbSmall})`
        }}></div>
        {changeShelf && renderOptions()}
      </div>
      <div className="book-title">{title}</div>
      <div className="book-authors">{renderAuthors()}</div>
    </div>
  )
}

export default Book;
