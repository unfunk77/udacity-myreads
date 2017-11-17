import React from 'react'
import PropTypes from 'prop-types'
import { Route } from 'react-router-dom'
import Home from '../views/Home/Home'
import Search from '../views/Search/Search'
import * as BooksAPI from '../lib/BooksAPI'
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
      loading: false
    };
  }

  componentDidMount(){
    this.getBooks();
  }

  getBooks = () => {
    this.loading();
    BooksAPI.getAll().then((books)=>{
      this.setState({books});
      this.searchBooks(this.state.term);
    })
  }

  searchBooks = (term) => {
    let results = [];
    if(term){
      this.loading();
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
        this.setState({results,term,loading: false});
      })
    } else {
      this.setState({results,term,loading: false});
    }

  }

  changeShelf = (book) => {
    this.loading();
    BooksAPI.update(book,book.shelf).then((response)=>{
      this.getBooks();
    })
  }

  navigateTo = (link) => {
    this.props.history.push(link);
  }

  loading = () => {
    if(!this.state.loading){
      this.setState({loading: true});
    }
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
        <header>
          <div className="list-books-title">
            <h1>MyReads</h1>
          </div>
        </header>
        <main>
          <Route exact path="/" component={this.HomeView} />
          <Route exact path="/search" component={this.SearchView}/>
          <Route exact path="/search/:term" component={this.SearchView}/>
        </main>
        {this.state.loading &&
        <div className="preloader"></div>
        }
      </div>
    )
  }
}

export default App
