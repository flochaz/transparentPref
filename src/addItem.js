import React, { Component } from 'react';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import AddIcon from '@material-ui/icons/Add';
import Button from '@material-ui/core/Button';
import { API, graphqlOperation } from "aws-amplify";
import * as mutations from './graphql/mutations';
import EditIcon from '@material-ui/icons/Edit';


import { withTheme } from "@rjsf/core";
import { Theme as MaterialUITheme } from "@rjsf/material-ui";
const log = (type) => console.log.bind(console, type);

const schema = {
  title: "Nouvel arrêté préfectoral",
  type: "object",
  required: [
    "title",
    "description",
    "link",
    "zipCode"
  ],
  properties: {
    title: { type: "string", title: "Titre", default: "" },
    description: {
      type: "string",
      title: "Description de l'arrêté",
      default: "",
    },
    link: {
      type: "string",
      title: "Lien vers le document officiel",
      format: "uri",
    },
    mainCategory: {
      type: "string",
      title: "Catégorie couverte par l'arrêté",
      oneOf: [
        {
          title: "Port du masque",
          const: "Port du masque",
        },
        {
          title: "Événement culturel et sportif",
          const: "Événement culturel et sportif",
        },
        {
          title: "Lieux d accueil du public",
          const: "Lieux d accueil du public",
        },
        {
          title: "Autre",
          const: "Autre",
        },
      ],
    },
    zipCode: { type: "string", title: "Code postal", default: "" },
    period: {
      title: "Durée",
      description:
        "Sélectionnez la date de début et de fin d'application de l'arrêté",
      type: "object",
      properties: {
        start: {
          type: "string",
          title: "Debut",
          format: "date-time",
        },
        end: {
          type: "string",
          title: "Fin",
          format: "date-time",
        },
      },
    },
  },
};

const uiSchema = {
  category: {
    mainCategory: { "ui:widget": "radio" },
  },
};

class AddItem extends Component {

  state = {
    open: false,
    title: '',
    description: '',
    mainCategory: '',
    zipcode: '',
    periodStart: '',
    periodEnd: ''
  };

  handleClickOpen = () => {
    this.setState({ open: true });
  };

  handleClose = () => {
    this.setState({ open: false });
  };

  handleSubmit = async ({ formData }, e) => {
    this.setState({ open: false });
    
    console.log("Item Details : " + JSON.stringify(formData))
    let result = await API.graphql(graphqlOperation(this.props.currentItem?mutations.updateArrete:mutations.createArrete, {input: formData}));
    if(this.props.currentItem){
        formData['id'] = this.props.currentItem.id
        delete formData.createdAt;
        delete formData.updatedAt;
        this.props.updateItem(formData)

    }else {
        this.props.addItem(result.data.createArrete);
    }
  }


  render() {
    const Form = withTheme(MaterialUITheme);

      return (
      <div style={{display: 'flex', flexWrap: 'wrap'}}>
      <Button variant="fab" mini color="inherit" aria-label="Add" onClick={this.handleClickOpen}>
          {this.props.currentItem?<EditIcon />:<AddIcon />}
      </Button>

        <Dialog
          open={this.state.open}
          onClose={this.handleClose}
          aria-labelledby="form-dialog-title"
        >
          <DialogTitle id="form-dialog-title">Ajouter un nouvel Arrêté</DialogTitle>
          <DialogContent>

          <Form
          schema={schema}
          uiSchema={uiSchema}
          formData={this.props.currentItem}
          onSubmit={this.handleSubmit}
          onError={log("errors")}
        >
            <DialogActions>
            <Button onClick={this.handleClose} color="primary">
              Cancel
            </Button>
            <Button type="submit" color="primary">
            {this.props.currentItem?'Mettre à jour':'Ajouter'}
            </Button>
          </DialogActions>
            </Form>
          </DialogContent>
          
        </Dialog>
      </div>
    );
  }
}

export default AddItem;