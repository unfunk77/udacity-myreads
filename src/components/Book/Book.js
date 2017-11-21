import React from 'react'
import PropTypes from 'prop-types';
import './Book.css'

class Book extends React.Component {
  static defaultProps= {
    shelf: "none",
    authors: []
  }

  static propTypes = {
    id: PropTypes.string.isRequired,
    shelf: PropTypes.string,
    shelves: PropTypes.array.isRequired,
    imageLinks: PropTypes.object.isRequired,
    title: PropTypes.string.isRequired,
    authors: PropTypes.array,
    changeShelf: PropTypes.func
  }

  changeShelf(event) {
    this.props.changeShelf({
      id: this.props.id,
      shelf: event.target.value
    });
  }

  renderOptions () {
    const options = this.props.shelves.map((shelf) => (
      <option key={shelf.id} value={shelf.id}>{shelf.title}</option>
    ))
    return (
      <div className="book-shelf-changer">
        <select onChange={(event)=>this.props.changeShelf({
          id: this.props.id,
          shelf: event.target.value
        })} defaultValue={this.props.shelf}>
          <option value="none" disabled>Move to...</option>
          {options}
        </select>
      </div>
    )
  }

  renderAuthors () {
    let authors = this.props.authors.map((author,index) => (
      <span key={index}>{author}<br/></span>
    ))
    if(authors.length){
      return authors;
    } else {
      return "Unknown";
    }
  }

  render() {
    const {title,imageLinks,changeShelf} = this.props;
    const thumbSmall = imageLinks.smallThumbnail || "http://via.placeholder.com/128x193/eeeeee/ffffff/?text=n/a";

    return (
      <div className="book">
        <div className="book-top">
          <div className="book-cover" style={{
            backgroundImage: `url(${thumbSmall})`
          }}></div>
          {changeShelf && this.renderOptions()}
        </div>
        <div className="book-title">{title}</div>
        <div className="book-authors">{this.renderAuthors()}</div>
      </div>
    )
  }
}

export default Book;
