import React from "react";
import Container from "@material-ui/core/Container";
import Box from "@material-ui/core/Box";
import Copyright from "../src/Copyright";
import AppNavBar from '../src/appNavBar'
import ListItems from '../src/listItems'
import aws_config from "../src/aws-exports";
import Amplify from 'aws-amplify';

Amplify.configure(aws_config);

const log = (type) => console.log.bind(console, type);

export default function Index() {
  return (
    <Container maxWidth="sm">
      <Box my={4}>
      <AppNavBar />
      <ListItems/>
        <Copyright />
      </Box>
    </Container>
  );
}
