import React, {Component, Fragment} from 'react';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import FormControl from '@material-ui/core/FormControl';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import withStyles from '@material-ui/core/styles/withStyles';
import { API_URL, GMAPS_API_KEY } from "../constants.js"
import Script from 'react-load-script'


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

class SignUpPage extends Component {
  constructor(props) {
    super(props);

    this.state = {
      fullAddress: ""
    };
  }

  createUserProfile = e => {
    e.preventDefault()
    const name = e.target[0].value
    fetch(`${API_URL}/users`, {
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
          fullAddress: this.state.fullAddress,
        }
      })
    })
    .then(resp => resp.json())
    .then(signedUpUser => {
      localStorage.token = signedUpUser.jwt
      this.props.changeIsSignedUp(name, signedUpUser.user.id)
    })

  }

  handleScriptLoad = () => {
    // Declare Options For Autocomplete
    var options = { types: ["address"] };

    this.autocomplete = new google.maps.places.Autocomplete(
      document.getElementById('address'),
      options,
    );
    // Initialize Google Autocomplete
    /*global google*/
    // Fire Event when a suggested name is selected
    this.autocomplete.addListener('place_changed',
      this.handlePlaceSelect);
  }

  handlePlaceSelect = () => {

    // Extract City From Address Object
    let addressObject = this.autocomplete.getPlace();
    let addressArray = addressObject.formatted_address.split(" ");
    addressArray.splice(addressArray.length-1, 1)
    let formattedAddress = addressArray.join(" ")
    // Check if address is valid
    if (formattedAddress) {
      // Set State
      this.setState(
        {
          fullAddress: formattedAddress
        }
      );
    }
  }


  render() {
  return (
    <Fragment>
      <Script
        url={`https://maps.googleapis.com/maps/api/js?key=${GMAPS_API_KEY}&libraries=places`}
        onLoad={this.handleScriptLoad}
      />
      <CssBaseline />
      <main className={this.props.classes.layout}>
        <Paper className={this.props.classes.paper}>
          <Typography component="h1" variant="h5">
            Sign up
          </Typography>
          <form className={this.props.classes.form} onSubmit={this.createUserProfile}>
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
              />
            </FormControl>
            <FormControl margin="normal" required fullWidth>
              <InputLabel htmlFor="password">Confirm Password</InputLabel>
              <Input
                name="password2"
                type="password"
                id="password2"
              />
            </FormControl>
            <FormControl id="autocomplete" margin="normal" required fullWidth>
              <InputLabel htmlFor="address">Address (House Number with Street)</InputLabel>
              <Input
                name="address"
                type="address"
                id="address"
              />
            </FormControl>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              className={this.props.classes.submit}
            >
              Sign Up
            </Button>
          </form>
        </Paper>
      </main>
    </Fragment>
  );
  }
}


export default withStyles(styles)(SignUpPage);
