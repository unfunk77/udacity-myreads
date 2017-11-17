import React from 'react'
import PropTypes from 'prop-types';
import { Route } from 'react-router-dom'
import Home from './views/Home/Home'
import Search from './views/Search/Search'
import * as BooksAPI from './BooksAPI'
import './App.css'

class App extends React.Component {

  static defaultProps = {
    shelves: [{
      title: "Currently Reading",
      id: "currentlyReading"
    },{
      title: "Want to Read",
      id: "wantToRead"
    },{
      title: "Read",
      id: "read"
    },{
      title: "None",
      id: "none"
    }],
  }

  static propTypes = {
    shelves: PropTypes.array,
  }

  constructor(props) {
    super(props);
    this.state = {
      term: "",
      books: [],
      results: [],
    };
  }

  componentDidMount(){
    this.getBooks();
  }

  getBooks = () => {
    BooksAPI.getAll().then((books)=>{
      this.setState({books});
      this.searchBooks(this.state.term);
    })
  }

  searchBooks = (term) => {
    let results = [];
    if(term){
      BooksAPI.search(term).then((response)=>{
        const books = this.state.books;
        if(response){
          results = response.error ? [] : response;
          results.map((item,index)=>{
            const book = books.filter((book)=>(book.id === item.id));
            results[index].shelf = book[0] ? book[0].shelf : "none";
            return item
          })
        }
        this.setState({results,term});
      })
    } else {
      this.setState({results,term});
    }

  }

  changeShelf = (book) => {
    BooksAPI.update(book,book.shelf).then((response)=>{
      this.getBooks();
    })
  }

  navigateTo = (link) => {
    this.props.history.push(link);
  }

  HomeView = (props) => {
    return (
      <Home
        books={this.state.books}
        shelves={this.props.shelves}
        changeShelf={this.changeShelf}
      />
    )
  }

  SearchView = (props) => {
    let term = props.match.params.term || this.state.term;
    return (
      <Search
        term={term}
        search={this.searchBooks}
        navigateTo={this.navigateTo}
        books={this.state.results}
        shelves={this.props.shelves}
        changeShelf={this.changeShelf}
      />
    )
  }

  render() {
    return (
      <div className="app">
        <Route exact path="/" component={this.HomeView} />
        <Route exact path="/search" component={this.SearchView}/>
        <Route exact path="/search/:term" component={this.SearchView}/>
      </div>
    )
  }
}

export default App
