import React from 'react'
import ReactDOM from 'react-dom'
import { HashRouter as Router, Route, browserHistory } from 'react-router-dom';
import App from './containers/App'
import './index.css'

ReactDOM.render(
    <Router history={browserHistory}>
      <Route path="/" component={App} />
    </Router>,
  document.getElementById('root')
)
