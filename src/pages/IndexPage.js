import React from 'react';
import sortBy from 'sort-by';
import PropType from 'prop-types';
import AppBar from '@material-ui/core/AppBar';
import Grid from '@material-ui/core/Grid';
import IconButton from '@material-ui/core/IconButton';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import SearchIcon from '@material-ui/icons/Search';
import Divider from '@material-ui/core/Divider';
import { withStyles } from '@material-ui/core/styles';
import BookList from '../Components/BookList';
import { Link } from 'react-router-dom';

const styles = theme => ({
	root: {
		flexGrow: 1,
	},
	grow: {
		flexGrow: 1,
	},
	dividerMargin: {
		marginTop: theme.spacing.unit,
		marginBottom: theme.spacing.unit,
	}
  });
class IndexPage extends React.Component {
	state = {
		bookshelfs: [
			{name: 'Currently Reading', shelf: 'currentlyReading'},
			{name: 'Read', shelf: 'read'},
			{name: 'Want to read', shelf: 'wantToRead'},
		],
	};

	static propTypes = {
		books: PropType.array.isRequired,
		onShelfTypeChange: PropType.func.isRequired
    }

	render() {
		const { classes, books, onShelfTypeChange } = this.props;
		const { bookshelfs } = this.state;

		bookshelfs.map(bookshelf => {
			bookshelf.books = books.filter(book => (book.shelf === bookshelf.shelf))
			return bookshelf;
		});

		return (<div className={classes.root}>
			<AppBar position="static">
				<Toolbar>
					<Typography variant="h4" color="inherit" className={classes.grow}>
						MyReads
					</Typography>
					<div>
            			<IconButton color="inherit" component={Link} to='/search'>
              				<SearchIcon />
            			</IconButton>
          			</div>
				</Toolbar>
			</AppBar>
			{bookshelfs.filter(bookshelf=>bookshelf.books.length > 0).map(bookshelf => (
				<Grid key={bookshelf.id} className={classes.grow}>
					<Grid item xs={12}>
						<Typography variant="h4" color="inherit" align="center" className={classes.grow}>
							{bookshelf.name}
						</Typography>
						<Divider variant="middle" className={classes.dividerMargin}/>
						<BookList books={bookshelf.books} onShelfTypeChange={onShelfTypeChange}/>
					</Grid>
				</Grid>
			))}
		</div>);
	}
}

export default withStyles(styles)(IndexPage);
