import React from 'react'
import { Link } from 'react-router-dom'
import Book from '../../components/Book/Book'
import Shelf from '../../components/Shelf/Shelf'
import './Home.css'

const Home = (props) => {

  const {shelves, changeShelf, books} = props;

  const renderBooks = (shelf) => {
    return (
      <ol className="books-grid">
        {books.filter((book) => (book.shelf === shelf))
        .map(book =>
          <li key={book.id}>
            <Book
              id={book.id}
              imageLinks={book.imageLinks}
              title={book.title}
              authors={book.authors}
              shelf={book.shelf}
              changeShelf={changeShelf}
              shelves={shelves}
            />
          </li>
        )}
      </ol>
    )
  }

  const renderShelves = () => {
    return (
      shelves.filter((shelf) => (shelf.id !== "none"))
      .map(shelf =>
        <Shelf key={shelf.id} title={shelf.title}>
          {renderBooks(shelf.id)}
        </Shelf>
      )
    )
  }

  return (
    <div className="list-books">
      <div className="list-books-content">
        <div>
          {renderShelves()}
        </div>
      </div>
      <div className="open-search">
        <Link to={"/search"}>Add a book</Link>
      </div>
    </div>
  )

}

export default Home;
