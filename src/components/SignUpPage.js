import React from 'react';
import PropTypes from 'prop-types';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import FormControl from '@material-ui/core/FormControl';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import withStyles from '@material-ui/core/styles/withStyles';

const styles = theme => ({
  layout: {
    width: 'auto',
    display: 'block', // Fix IE11 issue.
    marginLeft: theme.spacing.unit * 3,
    marginRight: theme.spacing.unit * 3,
    [theme.breakpoints.up(400 + theme.spacing.unit * 3 * 2)]: {
      width: 400,
      marginLeft: 'auto',
      marginRight: 'auto',
    },
  },
  paper: {
    marginTop: theme.spacing.unit * 8,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    padding: `${theme.spacing.unit * 2}px ${theme.spacing.unit * 3}px ${theme.spacing.unit * 3}px`,
  },
  avatar: {
    margin: theme.spacing.unit,
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%', // Fix IE11 issue.
    marginTop: theme.spacing.unit,
  },
  submit: {
    marginTop: theme.spacing.unit * 3,
  },
});

function SignUpPage(props) {
  const { classes } = props;

  const createUserProfile = e => {
    e.preventDefault()
    const name = e.target[0].value
    fetch("http://localhost:3000/users", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json"
      },
      body: JSON.stringify({
        user: {
          name: e.target[0].value,
          email: e.target[1].value,
          password: e.target[2].value,
          address: e.target[4].value,
          city: e.target[5].value,
          state: e.target[6].value,
          zip: e.target[7].value
        }
      })
    })
    .then(resp => resp.json())
    .then(signedUpUser => {
      localStorage.token = signedUpUser.jwt
      props.changeIsSignedUp(name, signedUpUser.user.id)
    })

  }


  return (
    <React.Fragment>
      <CssBaseline />
      <main className={classes.layout}>
        <Paper className={classes.paper}>
          <Typography component="h1" variant="h5">
            Sign up
          </Typography>
          <form className={classes.form} onSubmit={createUserProfile}>
            <FormControl margin="normal" required fullWidth>
              <InputLabel htmlFor="name">Full Name</InputLabel>
              <Input id="name" name="name" autoFocus />
            </FormControl>
            <FormControl margin="normal" required fullWidth>
              <InputLabel htmlFor="email">Email Address</InputLabel>
              <Input id="email" name="email" autoComplete="email" />
            </FormControl>
            <FormControl margin="normal" required fullWidth>
              <InputLabel htmlFor="password">Password</InputLabel>
              <Input
                name="password"
                type="password"
                id="password"
                autoComplete="current-password"
              />
            </FormControl>
            <FormControl margin="normal" required fullWidth>
              <InputLabel htmlFor="password">Confirm Password</InputLabel>
              <Input
                name="password2"
                type="password"
                id="password2"
                autoComplete="current-password"
              />
            </FormControl>
            <FormControl margin="normal" required fullWidth>
              <InputLabel htmlFor="address">Address (House Number with Street)</InputLabel>
              <Input
                name="address"
                type="address"
                id="address"
              />
            </FormControl>
            <FormControl margin="normal" required fullWidth>
              <InputLabel htmlFor="City">City</InputLabel>
              <Input
                name="City"
                type="City"
                id="City"
                autoComplete="current-password"
              />
            </FormControl>
            <FormControl margin="normal" required fullWidth>
              <InputLabel htmlFor="State">State</InputLabel>
              <Input
                name="State"
                type="State"
                id="State"
              />
            </FormControl>
            <FormControl margin="normal" required fullWidth>
              <InputLabel htmlFor="Zip Code">Zip Code</InputLabel>
              <Input
                name="Zip Code"
                type="Zip Code"
                id="Zip Code"
              />
            </FormControl>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              className={classes.submit}
            >
              Sign Up
            </Button>
          </form>
        </Paper>
      </main>
    </React.Fragment>
  );
}

SignUpPage.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(SignUpPage);