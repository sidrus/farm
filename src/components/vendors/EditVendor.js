import React, { Component } from "react";
import Queries from "../../graphql/queries";
import { graphql, compose } from "react-apollo";

import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";

class EditVendor extends Component {
  constructor(props, context) {
    super(props, context);

    this.handleShow = this.handleShow.bind(this);
    this.handleHide = this.handleHide.bind(this);
    this.submitForm = this.submitForm.bind(this);
    this.updateValues = this.updateValues.bind(this);

    this.state = {
      name: "",
      website: "",
      show: false
    };
  }

  updateValues(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  handleShow(e) {
    this.setState({ show: true });
  }

  handleHide(e) {
    this.setState({ show: false });
  }

  submitForm(e) {
    e.preventDefault();
    console.log(this.state);
  }

  handleDisplay() {
    if (!this.props.data.loading) {
      var { getVendor } = this.props.data;

      if (!getVendor) {
        console.error(`getVendor: ${getVendor}`);
        return <span>Vendor data not supplied</span>;
      }

      return (
        <>
          <Button type="button" variant="link" onClick={this.handleShow}>
            Edit
          </Button>
          <Modal show={this.state.show} onHide={this.handleHide}>
            <Form>
              <Modal.Header>Editing {getVendor.name}</Modal.Header>
              <Modal.Body>
                <Form.Group>
                  <Form.Label>Name:</Form.Label>
                  <Form.Control type="text" name="name" defaultValue={getVendor.name} onChange={this.updateValues} />
                </Form.Group>
                <Form.Group>
                  <Form.Label>Website:</Form.Label>
                  <Form.Control type="text" name="website" defaultValue={getVendor.website} onChange={this.updateValues} />
                </Form.Group>
                <a href={getVendor.website} rel="noopener noreferrer" target="_blank">
                  Visit website
                </a>
              </Modal.Body>
              <Modal.Footer>
                <Button type="submit" onClick={this.submitForm}>
                  Update
                </Button>
                <Button type="button" onClick={this.handleHide}>
                  Close
                </Button>
                <Button type="button">Delete</Button>
              </Modal.Footer>
            </Form>
          </Modal>
        </>
      );
    }
  }

  render() {
    return <>{this.handleDisplay()}</>;
  }
}

export default compose(
  graphql(Queries.getVendor, {
    options: props => {
      return {
        variables: {
          vendorId: props.vendorId
        }
      };
    }
  }),
  graphql(Queries.updateVendor, {
    options: props => {
      return {
        variables: {
          vendorId: props.vendorId
        }
      };
    }
  })
)(EditVendor);
