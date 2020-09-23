import React, { Component } from 'react';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogTitle from '@material-ui/core/DialogTitle';
import DeleteIcon from '@material-ui/icons/Delete';
import Button from '@material-ui/core/Button';
import { API, graphqlOperation } from "aws-amplify";
import * as mutations from './graphql/mutations';


class DeleteItem extends Component {

  state = {
    open: false
  };

  handleClickOpen = () => {
    console.log("Current Item: " + this.props.currentItem.title)
    this.setState({ open: true });
  };

  handleClose = () => {
    this.setState({ open: false });
  };

  handleDelete = () => {
    this.setState({ open: false });
    var itemDetails = {
      id: this.props.currentItem.id,
    }
    API.graphql(graphqlOperation(mutations.deleteArrete, { input: itemDetails }))
    this.props.deleteItem(this.props.currentItem)

    // window.location.reload()
  };

  render() {
      return (
      <div style={{display: 'flex', flexWrap: 'wrap'}}>
      <Button size='small' color="inherit" aria-label="Delete" onClick={this.handleClickOpen}>
        <DeleteIcon />
      </Button>
        <Dialog
          open={this.state.open}
          onClose={this.handleClose}
          aria-labelledby="form-dialog-title"
        >
          <DialogTitle id="form-dialog-title">Êtes vous sur de vouloir supprimer l'arrêté {this.props.currentItem.title}?</DialogTitle>
          <DialogActions>
            <Button onClick={this.handleClose} color="primary">
              Annuler
            </Button>
            <Button onClick={this.handleDelete} color="primary">
              Supprimer
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    );
  }
}

export default DeleteItem;
