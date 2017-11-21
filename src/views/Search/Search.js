import React from 'react'
import { Link } from 'react-router-dom'
import { Debounce } from 'react-throttle';
import Book from '../../components/Book/Book'
import './Search.css'

const Search = (props) => {
  const {term, shelves, books, search, changeShelf} = props;

  const onChange = (e) => {
    search(e.target.value);
  }

  return(
    <div className="search-books">
      <div className="search-books-bar">
        <Link to={"/"} className="close-search">Close</Link>
        <div className="search-books-input-wrapper">
          {/*
            NOTES: The search from BooksAPI is limited to a particular set of search terms.
            You can find these search terms here:
            https://github.com/udacity/reactnd-project-myreads-starter/blob/master/SEARCH_TERMS.md

            However, remember that the BooksAPI.search method DOES search by title or author. So, don't worry if
            you don't find a specific author or title. Every search is limited by search terms.
          */}
          <Debounce time="400" handler="onChange">
            <input type="text" placeholder="Search by title or author" defaultValue={term} onChange={onChange}/>
          </Debounce>
        </div>
      </div>
      <div className="search-books-results">
        <ol className="books-grid">
        {books.map((book) => (
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
        ))}
        {term && !books.length &&
          <li>No results</li>
        }
        </ol>
      </div>
    </div>
  )
}

export default Search;
