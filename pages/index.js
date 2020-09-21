import React from 'react';
import Container from '@material-ui/core/Container';
import Box from '@material-ui/core/Box';
import Copyright from '../src/Copyright';
import { withTheme } from '@rjsf/core';
import { Theme as MaterialUITheme } from '@rjsf/material-ui';


const schema = {
  title: "Nouvel arrêté préfectoral",
  type: "object",
  required: ["title", "description", "link", "zipCode", "zones", "times", "duration"],
  properties: {
    title: {type: "string", title: "Titre", default: ""},
    description: {type: "string", title: "Description de l'arrêté", default: ""},
    link: {type: "string", title: "Lien vers le document officiel", format: "uri"},
    category: {
      "type": "array",
    "title": "Catégorie couverte par l'arrêté",
    "items": {
      "type": "string",
      "enum": [
        "Santé",
        "Sécurité",
        "Catastrophe naturelle",
        "autre"
      ]
    },
    "uniqueItems": true
  },
    zipCode: {type: "string", title: "Code postal", default: ""},
    zones: {
      "type": "array",
      "title": "Zone d'application",
      "items": {
        "type": "string",
        "enum": [
          "Centre ville",
          "transport en commun",
          "lieux public",
          "lieux privé",
          "exterieurs",
          "intérieur",
          "autre"
        ]
      },
      "uniqueItems": true
    },
    applicableDays: {
      "type": "array",
      "title": "Jours d'applications",
      "items": {
        "type": "string",
        "enum": [
          "TOUS",
          "Lundi",
          "Mardi",
          "Mercredi",
          "Jeudi",
          "Vendredi",
          "Samedi",
          "Dimanche"
        ]
      },
    },
    duration: {
      "title": "Durée",
      "description": "Sélectionnez la date de début et de fin d'application",
      "type": "object",
      "properties": {
        "start": {
          "type": "string",
          "format": "date-time"
        },
        "end": {
          "type": "string",
          "format": "date-time"
        }
      }
    }
  }
};

const uiSchema = {
  "zones": {
    "ui:widget": "checkboxes"
  },
}

const log = (type) => console.log.bind(console, type);

export default function Index() {
  const Form = withTheme(MaterialUITheme);

  return (
    <Container maxWidth="sm">
      <Box my={4}>
        <Form
        schema={schema}
        uiSchema={uiSchema}
        onChange={log("changed")}
        onSubmit={log("submitted")}
        onError={log("errors")}
        />
        <Copyright />
      </Box>
    </Container>
  );
}
