import React from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
import Book from '../../components/Book/Book'
import Shelf from '../../components/Shelf/Shelf'
import './Home.css'

class Home extends React.Component {

  static defaultProps = {
    shelves: [],
    books: []
  }

  static propTypes = {
    shelves: PropTypes.array,
    books: PropTypes.array,
    changeShelf: PropTypes.func
  }

  renderBooks = (shelf) => {
    const {shelves, changeShelf} = this.props;
    const books = this.props.books
    .filter((book) => (book.shelf === shelf))
    .map((book) => (
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
    ))
    return (
      <ol className="books-grid">
        {books}
      </ol>
    )
  }


  renderShelves = () => {
    const target = this;
    const shelves = this.props.shelves
    .filter((shelf) => (shelf.id !== "none"))
    .map(shelf =>
      <Shelf key={shelf.id} title={shelf.title}>
        {target.renderBooks(shelf.id)}
      </Shelf>
    )
    return shelves
  }

  render() {
    return (
      <div className="list-books">
        <div className="list-books-content">
          <div>
            {this.renderShelves()}
          </div>
        </div>
        <div className="open-search">
          <Link to={"/search"}>Add a book</Link>
        </div>
      </div>
    )
  }
}

export default Home;
