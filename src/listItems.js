import React, { Component } from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import AddItem from "./addItem";
import DeleteItem from "./deleteItem";
import { API, graphqlOperation } from "aws-amplify";
import * as queries from "./graphql/queries";
import AppNavBar from "./appNavBar";

import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";

const styles = {
  card: {
    minWidth: 275,
  },
  bullet: {
    display: "inline-block",
    margin: "0 2px",
    transform: "scale(0.8)",
  },
  title: {
    fontSize: 14,
  },
  pos: {
    marginBottom: 12,
  },
  root: {
    display: "flex",
    flexWrap: "wrap",
    justifyContent: "inherit",
    padding: "10px",
  },
};

class ListItems extends Component {
  state = {
    items: [],
  };

  componentDidMount = () => {
    this.getItems();
  };

  getItems = () => {
    API.graphql(graphqlOperation(queries.listArretes)).then((data) =>
      this.setState({ items: data.data?.listArretes.items })
    );
  };

  updateItem = (updatedItem) => {
    let newItems = [];
    for (let indexItem in this.state.items) {
      let item = this.state.items[indexItem];
      if (item.id === updatedItem.id) {
        newItems.push(updatedItem);
      } else {
        newItems.push(item);
      }
    }
    this.setState({ items: newItems });
  };
  addItem = (newItem) => {
    this.setState({ items: [...this.state.items, newItem] });
  };

  deleteItem = (updatedItem) => {
    let newItems = [];
    for (let indexItem in this.state.items) {
      let item = this.state.items[indexItem];
      if (item.id !== updatedItem.id) {
        newItems.push(item);
      }
    }
    this.setState({ items: newItems });
  };

  render() {
    const { classes } = this.props;
    const { items } = this.state;
    console.log(items);
    return (
      <div className={classes.root}>
        <AppNavBar addItem={this.addItem} />

        <TableContainer component={Paper}>
          <Table className={classes.table} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell align="right">Titre</TableCell>
                <TableCell align="right">description</TableCell>
                <TableCell align="right">link</TableCell>
                <TableCell align="right">Editer</TableCell>
                <TableCell align="right">Supprimer</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {items?.map((row) => (
                <TableRow key={row.name}>

                  <TableCell align="right">{row.title}</TableCell>
                  <TableCell align="right">{row.description}</TableCell>
                  <TableCell align="right">{row.link}</TableCell>
                  <TableCell align="right">
                    <AddItem currentItem={row} updateItem={this.updateItem} />
                  </TableCell>
                  <TableCell align="right">
                    <DeleteItem
                      currentItem={row}
                      deleteItem={this.deleteItem}
                    />
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </div>
    );
  }
}

ListItems.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(ListItems);
