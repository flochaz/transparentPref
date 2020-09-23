import React from "react";
import Container from "@material-ui/core/Container";
import Box from "@material-ui/core/Box";
import { withTheme } from "@rjsf/core";
import { Theme as MaterialUITheme } from "@rjsf/material-ui";
import TimeWidget from "../src/TimeWidget";

const widgets = { time: TimeWidget };

const schema = {
  title: "Nouvel arrêté préfectoral",
  type: "object",
  required: [
    "title",
    "description",
    "link",
    "zipCode",
    "zones",
    "times",
    "duration",
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
    zipCode: { type: "number", title: "Code postal", default: "" },
    // zones: {
    //   "type": "array",
    //   "title": "Zone d'application",
    //   "items": {
    //     "type": "string",
    //     "enum": [
    //       "Centre ville",
    //       "transport en commun",
    //       "lieux public",
    //       "lieux privé",
    //       "exterieurs",
    //       "intérieur",
    //       "autre"
    //     ]
    //   },
    //   "uniqueItems": true
    // },
    // hours: {
    //   "type": "object",
    //   "title": "Heures d'applications",
    //   properties: {
    //     "start": {
    //       "type": "string",
    //       "title": "Debut",
    //       "format": "time"
    //     },
    //     "end": {
    //       "type": "string",
    //       "title": "Fin",
    //       "format": "time"
    //     }
    //     }
    // },
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
  hours: {
    "ui:widget": "time",
  },
};

const log = (type) => console.log.bind(console, type);

export default function Index() {
  const Form = withTheme(MaterialUITheme);

  return (
    <Container maxWidth="sm">
      <Box my={4}>
        <Form
          widgets={widgets}
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
