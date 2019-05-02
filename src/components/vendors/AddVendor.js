import React, { Component } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Modal from "react-bootstrap/Modal";
import { graphql, compose } from "react-apollo";
import Queries from "../../graphql/queries";

class AddVendor extends Component {
  constructor(props, context) {
    super(props, context);

    // bind the this context to member functions
    this.updateValues = this.updateValues.bind(this);
    this.handleHide = this.handleHide.bind(this);
    this.handleShow = this.handleShow.bind(this);
    //this.submitForm = this.submitForm.bind(this);

    // initialize the state properties
    this.state = {
      name: "",
      website: "",
      show: false
    };
  }

  // updates component state variables
  updateValues(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  handleShow(e) {
    console.log("Showing modal dialog");
    this.setState({ show: true });
  }

  handleHide(e) {
    //TODO: clear out the input values
    console.log("Hiding modal dialog");
    this.setState({ show: false });
  }

  // data submission
  submitForm(e) {
    e.preventDefault();

    // prevent empty data
    if (!this.state.name) return;

    this.props.addVendor({
      variables: {
        name: this.state.name,
        website: this.state.website
      },
      refetchQueries: [{ query: Queries.allVendors }]
    });

    this.handleHide();
  }

  render() {
    return (
      <>
        <Button type="button" variant="success" onClick={this.handleShow}>
          Add Vendor
        </Button>
        <Modal show={this.state.show} onHide={this.handleHide}>
          <Form id="add-vendor" onSubmit={this.submitForm.bind(this)}>
            <Modal.Header closeButton>
              <h3>Add Vendor</h3>
            </Modal.Header>
            <Modal.Body>
              <Form.Group as={Row}>
                <Form.Label column sm={2}>
                  Vendor Name:
                </Form.Label>
                <Col sm={10}>
                  <Form.Control type="text" name="name" onChange={this.updateValues} />
                </Col>
              </Form.Group>
              <Form.Group as={Row}>
                <Form.Label column sm={2}>
                  Vendor Website:
                </Form.Label>
                <Col sm={10}>
                  <Form.Control type="text" name="website" onChange={this.updateValues} />
                </Col>
              </Form.Group>
            </Modal.Body>
            <Modal.Footer>
              <Button type="submit">Submit</Button>
              <Button type="button" onClick={this.handleHide}>
                Cancel
              </Button>
            </Modal.Footer>
          </Form>
        </Modal>
      </>
    );
  }
}

export default compose(graphql(Queries.addVendor, { name: "addVendor" }))(AddVendor);
