import React, { Component } from "react";
import Queries from "../../graphql/queries";
import { graphql } from "react-apollo";
import AddVendor from "./AddVendor";
import EditVendor from "./EditVendor";

import Alert from "react-bootstrap/Alert";
import Card from "react-bootstrap/Card";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

class VendorList extends Component {
  displayVendors() {
    var data = this.props.data;
    if (data.loading) {
      return <div>Loading vendors...</div>;
    } else {
      if (data.error) {
        return <Alert variant="error">{data.error.message}</Alert>;
      }

      return data.vendors.map(vendor => {
        return (
          <Col sm={4} key={vendor.id}>
            <Card>
              <Card.Header>
                <Card.Title>{vendor.name}</Card.Title>
                <Card.Subtitle>
                  <a href={vendor.website}>{vendor.website}</a>
                </Card.Subtitle>
              </Card.Header>
              <Card.Body>
                <Card.Text>
                  Seeds: {vendor.seeds.length}
                  <EditVendor vendorId={vendor.id} />
                </Card.Text>
              </Card.Body>
            </Card>
          </Col>
        );
      });
    }
  }
  render() {
    return (
      <>
        <Row id="vendor-list">{this.displayVendors()}</Row>
        <AddVendor />
      </>
    );
  }
}

export default graphql(Queries.allVendors)(VendorList);
