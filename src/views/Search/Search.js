import React from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
import Book from '../../components/Book/Book'

class Search extends React.Component {
  static defaultProps= {
    term: "",
    shelves: [],
    books: [],
  }

  static propTypes= {
    term: PropTypes.string,
    search: PropTypes.func.isRequired,
    shelves: PropTypes.array,
    books: PropTypes.array,
  }

  componentDidMount() {
    if(this.props.term){
      this.props.search(this.props.term)
    }
  }

  render(){
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
            <input type="text" placeholder="Search by title or author" defaultValue={this.props.term} onChange={(event)=>this.props.search(event.target.value)}/>
          </div>
        </div>
        <div className="search-books-results">
          <ol className="books-grid">
          {this.props.books
            //.filter((book) => (book.shelf==="none"))
            .map((book) => (
            <li key={book.id}>
              <Book
                id={book.id}
                imageLinks={book.imageLinks}
                title={book.title}
                authors={book.authors}
                shelf={book.shelf}
                changeShelf={this.props.changeShelf}
                shelves={this.props.shelves}
              />
            </li>
          ))}
          {this.props.term && this.props.books.length===0 &&
            <li>No results</li>
          }
          </ol>
        </div>
      </div>
    )
  }
}

export default Search;
