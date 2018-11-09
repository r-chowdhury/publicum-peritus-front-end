import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import politicianStyles from "../styles/Politician.css"


const styles = theme => ({
  root: {
    width: '100%',
  },
  heading: {
    fontSize: theme.typography.pxToRem(15),
    fontWeight: theme.typography.fontWeightRegular,
  },
});

class Politician extends React.Component {
  constructor() {
    super()
  }

  upvoteLayout = () => {
    return (
      <div className="upvote" id="upvote">
        <Button variant="fab"  color="primary" aria-label="Add" className={this.props.classes.button} onClick={e => this.props.handleUpvoteButton(this.props.politician, this.props.politician.number_of_likes + 1)}>
          <div className="upvote">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" className="upvote"><path d="M4 12l1.41 1.41L11 7.83V20h2V7.83l5.58 5.59L20 12l-8-8-8 8z" /></svg>
          </div>
        </Button>
      </div>
    )
  }

  downvoteLayout = () => {
    return (
      <div className="downvote" id="downvote">
        <Button variant="fab" color="secondary"  aria-label="Edit" className={ this.props.classes.button} onClick={e => this.props.handleDownvoteButton(this.props.politician, this.props.politician.number_of_likes - 1)} >
          <div className="downvote">
            <svg xmlns="http://www.w3.org/2000/svg" className="downvote" width="24" height="24" viewBox="0 0 24 24"><path fill="#010101" d="M20 12l-1.41-1.41L13 16.17V4h-2v12.17l-5.58-5.59L4 12l8 8 8-8z" /></svg>
          </div>
        </ Button>
      </div> 
    )
  }

  politicianDetails = () => (
    <Typography>
      <Grid container spacing={24}>
        <Grid className='fields' item xs={6}>
          <strong>Address:</strong>
        </Grid>
        <Grid className='attributes' item xs={6}>
          {this.props.politician.address !== "Unknown" ? <a href={this.props.politician.address_url} target="_blank">{this.props.politician.address}</a> : "Unknown"}
        </Grid>
        <Grid className='fields' item xs={6}>
          <strong>Party:</strong>
        </Grid>
        <Grid className='attributes' item xs={6}>
          {this.props.politician.party}
        </Grid>
        <Grid className='fields' item xs={6}>
          <strong>Website:</strong>
        </Grid>
        <Grid className='attributes' item xs={6}>
          {this.props.politician.website !== "Unknown" ? <a href={this.props.politician.website} target="_blank">{this.props.politician.website}</a> : "Unknown"}
        </Grid>
        <Grid className='fields' item xs={6}>
          <strong>Phone Number:</strong>
        </Grid>
        <Grid className='attributes' item xs={6}>
          {this.props.politician.phone_number !== "Unknown" ? this.props.politician.phone_number : "Unknown"}
        </Grid>
      </Grid>
    </Typography>
  )

  render() {
  return (
    <div className={this.props.classes.root}>
      <ExpansionPanel>
        <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
          <Typography className={this.props.classes.heading}>{this.props.politician.name} - {this.props.politician.position} </Typography> 
        </ExpansionPanelSummary>
        <ExpansionPanelDetails>
            <Grid id="button-area" container spacing={12} >
                <Grid container spacing={0} >
                  <Grid item xs={2}>
                    <div id="votes">
                      {this.upvoteLayout()}
                      <h3 id="counter"> {this.props.politician.number_of_likes === null ? 0 : this.props.politician.number_of_likes} </h3>
                      {this.downvoteLayout()}
                    </div>
                  </Grid>
                  <Grid className="picture" item xs={5} >
                    <img src={this.props.politician.photo_url} className="Profile-image" alt="Profile image" height="300" width="auto" />
                  </Grid>
                  <Grid item xs={5}>
                    { this.politicianDetails() }
                  </Grid>
            </Grid>
          </Grid>

        </ExpansionPanelDetails>
      </ExpansionPanel>
    </div>
  )
}
  // Politician.propTypes = {
  //   this.props.classes: PropTypes.object.isRequired,
  // };
}


export default withStyles(styles)(Politician);