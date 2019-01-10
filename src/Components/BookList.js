import React from 'react';
import PropType from 'prop-types';
import BookDetail from './BookDetail';
import Grid from '@material-ui/core/Grid';
import { withStyles } from '@material-ui/core/styles';

const styles = theme => ({
	root: {
		padding: theme.spacing.unit,
		flexGrow: 1,
	},
	grow: {
		flexGrow: 1,
	},
  });
class BookList extends React.Component {
	static propTypes = {
		books: PropType.array.isRequired,
		onShelfTypeChange: PropType.func.isRequired
    }

	render() {
		const { classes, books, onShelfTypeChange } = this.props;
	
		return (
		<Grid container justify="center" className={classes.grow} spacing={16}>
			{books.map(book => (
				<Grid item xs={3} lg={2} xl={1} key={book.id}>
					<BookDetail book={book} onShelfTypeChange={onShelfTypeChange} />
				</Grid>
			))}
		</Grid>);
	}
}

export default withStyles(styles)(BookList);
