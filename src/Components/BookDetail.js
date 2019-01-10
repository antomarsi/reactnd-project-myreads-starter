import React from 'react';
import PropType from 'prop-types';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import { withStyles } from '@material-ui/core/styles';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore'
import { MenuList, Radio, MenuItem, Popper, Paper, ClickAwayListener, Grow, IconButton } from '@material-ui/core';

const styles = theme => ({
    card: {
        maxWidth: 400,
    },
    actions: {
        display: 'flex',
    },
    actionIcon: {
        marginLeft: 'auto',
    }
})

class BookDetail extends React.Component {
    state = {
        open: false
    }

    static propTypes = {
        book: PropType.object.isRequired,
        onShelfTypeChange: PropType.func.isRequired
    }
    

    handleToggle = () => {
        this.setState({open: !this.state.open});
    }
    handleClose = (event) => {
        this.setState({open: false});
    }

    render() {
        const { classes, onShelfTypeChange, book } = this.props;
        const { open } = this.state;
        const shelfTypes = [
            {name: "Currently Reading", value: "currentlyReading"},
            {name: "Want to Read", value: "wantToRead"},
            {name: "Read", value: "read"},
            {name: "None", value: undefined},
        ]
        return (
        <Card className={classes.card}>
            <CardMedia
            justify="center"
                component="img"
                align="center"
                alt={book.title}
                className={classes.media}
                image={book.imageLinks.thumbnail}
                title={book.title}
            />
            <CardContent>
                <Typography component="p">
                    {book.title}
                </Typography>
                {book.authors && book.authors.map((author, idx) => (
                    <Typography key={idx} variant="caption" component="p">{author}</Typography>
                ))}
            </CardContent>
            <CardActions className={classes.actions}>
                <IconButton
                    color="primary"
                    aria-label="Select shelf"
                    aria-haspopup="true"
                    aria-owns={open ? 'menu-list-grow' : undefined}
                    onClick={this.handleToggle}
                    className={classes.actionIcon}>
                    <ExpandMoreIcon/>
                </IconButton>
                <Popper open={open} transition disablePortal>
                {({ TransitionProps, placement }) => (
                    <Grow
                    {...TransitionProps}
                    id="menu-list-grow"
                    style={{ transformOrigin: placement === 'bottom' ? 'center top' : 'center bottom' }}
                    >
                  <Paper>
                        <ClickAwayListener onClickAway={this.handleClose}>
                        <MenuList>
                            {shelfTypes.map((shelfType, index) => (
                                <MenuItem key={index} onClick={()=>{
                                        book.shelf = shelfType.value;
                                        onShelfTypeChange(book)
                                    }}>
                                    <Radio
                                        checked={book.shelf === shelfType.value}
                                        value={shelfType.value}
                                        name="shelf-type"
                                        aria-label="Shelf type"
                                    />
                                    {shelfType.name}
                                </MenuItem>
                            ))}
                        </MenuList>
                        </ClickAwayListener>
                        </Paper>  
                    </Grow>
                )}
                </Popper>
            </CardActions>
        </Card>
        )
    }
}

export default withStyles(styles)(BookDetail);