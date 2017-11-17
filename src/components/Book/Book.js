import React from 'react'
import PropTypes from 'prop-types';

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

  render() {
    return (
      <div className="book">
        <div className="book-top">
          <div className="book-cover" style={{
            width: 128,
            height: 193,
            backgroundImage: `url(${this.props.imageLinks.smallThumbnail})`
          }}></div>
          {this.props.changeShelf && this.renderOptions()}
        </div>
        <div className="book-title">{this.props.title}</div>
        <div className="book-authors">{this.props.authors.join(", ")}</div>
      </div>
    )
  }
}

export default Book;
