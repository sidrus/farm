import React, { Component } from "react";
import Queries from "../../graphql/queries";
import { graphql } from "react-apollo";
import AddSeed from "./AddSeed";

import Alert from "react-bootstrap/Alert";
import Card from "react-bootstrap/Card";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

class SeedList extends Component {
  displaySeeds() {
    var data = this.props.data;
    if (data.loading) {
      return <div>Loading seeds...</div>;
    } else {
      if (data.error) {
        return <Alert variant="error">{data.error.message}</Alert>;
      }

      console.log(data);

      return data.seeds.map(seed => {
        return (
          <Col sm={4} key={seed.id}>
            <Card>
              <Card.Header>
                <Card.Title>{seed.name}</Card.Title>
                <Card.Subtitle className="mb-2 text-muted">
                  {seed.vendor.name}
                  <br />
                  LotNumber: {seed.lotNumber}
                </Card.Subtitle>
              </Card.Header>
              <Card.Body>Crops: {seed.crops.length}</Card.Body>
            </Card>
          </Col>
        );
      });
    }
  }
  render() {
    return (
      <>
        <Row id="vendor-list">{this.displaySeeds()}</Row>
        <AddSeed />
      </>
    );
  }
}

export default graphql(Queries.allSeeds)(SeedList);
