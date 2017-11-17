import React from 'react'
import PropTypes from 'prop-types'
import './Shelf.css'

class Shelf extends React.Component {
  static propTypes = {
    title: PropTypes.string.isRequired,
  }

  render() {
    return (
      <div className="bookshelf">
        <h2 className="bookshelf-title">{this.props.title}</h2>
        <div className="bookshelf-books">
          {this.props.children}
        </div>
      </div>
    )
  }
}

export default Shelf;
