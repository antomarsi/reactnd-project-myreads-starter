import React from 'react';
import PropType from 'prop-types';
import AppBar from '@material-ui/core/AppBar';
import Input from '@material-ui/core/Input';
import Toolbar from '@material-ui/core/Toolbar';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import SearchIcon from '@material-ui/icons/Search';
import { withStyles } from '@material-ui/core/styles';
import BookList from '../Components/BookList';
import { Link } from 'react-router-dom';
import { IconButton, Grid } from '@material-ui/core';
import serializeForm from 'form-serialize';

const styles = theme => ({
	root: {
		flexGrow: 1,
	},
	grow: {
		flexGrow: 1,
  },
  searchForm: {
    width: '100%',
  },
  searchInput: {
    width: '100%',
  }
  });
class SearchPage extends React.Component {
	state = {
    books: []
  };

  static propTypes = {
    onShelfTypeChange: PropType.func.isRequired,
    searchBooks: PropType.func.isRequired
  }
  submitHandler = (event) => {
    event.preventDefault()
    const values = serializeForm(event.target, {hash: true});
    this.props.searchBooks(values.query).then(books => {
      console.log(books)
      books.map(book => {
        for (let index = 0; index < this.props.library.length; index++) {
          const element = this.props.library[index];
          if (book.id === element.id) {
            console.log(book);
            book.shelf = element.shelf;
            break;
          }
        }
        return book;
      });
      this.setState({books})
    }).catch()
  }

	render() {
    const { books } = this.state;
    const { classes, onShelfTypeChange } = this.props;

		return (<div className={classes.root}>
			<AppBar position="static" color="default">
				<Toolbar>
          <IconButton component={Link} to="/">
            <ArrowBackIcon />
          </IconButton>
          <form onSubmit={this.submitHandler} className={classes.searchForm}>
            <Grid container>
            <Grid item xs={11}>
              <Input
                name="query"
                placeholder="Search by title or author name"
                className={classes.searchInput}
              />
            </Grid>
            <Grid item xs={1}>
              <IconButton type="submit">
                <SearchIcon/>
              </IconButton>
              </Grid>
            </Grid>
          </form>
				</Toolbar>
			</AppBar>
      <BookList books={books} onShelfTypeChange={onShelfTypeChange}/>
		</div>);
	}
}

export default withStyles(styles)(SearchPage);
