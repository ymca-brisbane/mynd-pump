import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';

class Session extends React.Component {
  state = { expanded: false };

  handleExpandClick = () => {
    this.setState(state => ({ expanded: !state.expanded }));
  };

  render() {
    const session = this.props.session 
    const { classes } = this.props;

    return (
      <Card className={classes.card}>
        <CardHeader
          title={session && session.date}
          subheader={session && session.title && session.time}
        />
        <CardContent>
          <Typography variant="body2">
            {session && session.description}
          </Typography>
          <br />
          <Button component={Link} to="/pre-survey">
            Check-in
          </Button>
          <Button component={Link} to="/post-survey">
            Check-out
          </Button>
        </CardContent>
      </Card>
    );
  }
}

Session.propTypes = {
  title: PropTypes.string,
  description: PropTypes.string,
//   date:
//   time: 
}

const styles = theme => ({
    card: {
      width: 400,
      margin: 15
    },
    media: {
      height: 0,
      paddingTop: '56.25%',
    },
    actions: {
      display: 'flex',
    },
    expand: {
      transform: 'rotate(0deg)',
      marginLeft: 'auto',
      transition: theme.transitions.create('transform', {
        duration: theme.transitions.duration.shortest,
      }),
    },
    expandOpen: {
      transform: 'rotate(180deg)',
    }
  });

export default withStyles(styles)(Session);