import React from 'react'
import { Route } from 'react-router-dom';
import * as BooksAPI from './BooksAPI'
import IndexPage from './pages/IndexPage';
import SearchPage from './pages/SearchPage';

class BooksApp extends React.Component {
  state = {
    books: []
  }

  componentDidMount = () => {
    BooksAPI.getAll().then((books) => {
      this.setState({ books })
    })
  }

  updateBook = (book) => {
    BooksAPI.update(book, book.shelf);
    BooksAPI.getAll().then((books) => {
      this.setState({ books })
    })
  }

  searchBooks = (query) => {
    return BooksAPI.search(query);
  }

  searchBook = (book) => {
    return BooksAPI.get(book.id)
  }
    /**
     * TODO: Instead of using this state variable to keep track of which page
     * we're on, use the URL in the browser's address bar. This will ensure that
     * users can use the browser's back and forward buttons to navigate between
     * pages, as well as provide a good URL they can bookmark and share.
     */
  render() {
    const { books } = this.state;
    return (
      <div className="app">
        <Route exact path="/search" render={()=>(
          <SearchPage library={books} onShelfTypeChange={this.updateBook} searchBooks={this.searchBooks}/>
        )}/>
        <Route exact path="/" render={()=>(
          <IndexPage books={books} onShelfTypeChange={this.updateBook} />
        )}/>
      </div>
    )
  }
}

export default BooksApp
