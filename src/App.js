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
    this.getBooks();
  }

  getBooks = () => {
    var books = localStorage.books;
    if (!books) {
      BooksAPI.getAll().then((books) => {
        localStorage.books = JSON.stringify(books);
        this.setState({ books })
      });
    } else {
      this.setState({ books: JSON.parse(books) })
    }
  }

  updateBook = (editedBook) => {
    BooksAPI.update(editedBook, editedBook.shelf).then(() => {
      var books = this.state.books.map((book) => {
        if (book.id === editedBook.id) {
          book = editedBook;
        }
        return book;
      })
      this.setState({ books });
      localStorage.books = JSON.stringify(books);
    });
  }

  searchBooks = (query) => {
    return BooksAPI.search(query);
  }

  searchBook = (book) => {
    return BooksAPI.get(book.id)
  }

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
