import React from "react";
import ApolloClient from "apollo-boost";
import { ApolloProvider } from "react-apollo";

import SeedList from "./components/seeds/SeedList";
import VendorList from "./components/vendors/VendorList";

import Container from "react-bootstrap/Container";
import TabContainer from "react-bootstrap/TabContainer";
import Tabs from "react-bootstrap/Tabs";
import Tab from "react-bootstrap/Tab";

import "./css/App.css";
import "./css/Vendor.css";

const client = new ApolloClient({
  uri: "http://localhost:4000/graphql"
});

function App() {
  return (
    <ApolloProvider client={client}>
      <Container className="App">
        <TabContainer>
          <Tabs defaultActiveKey="vendorsTab" id="app-main-tabs">
            <Tab eventKey="dashboard" title="Dashboard" />
            <Tab eventKey="vendorsTab" title="Vendors">
              <VendorList />
            </Tab>
            <Tab eventKey="seedsTab" title="Seeds">
              <SeedList />
            </Tab>
          </Tabs>
        </TabContainer>
      </Container>
    </ApolloProvider>
  );
}

export default App;
