import React, { Component } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Modal from "react-bootstrap/Modal";
import { graphql, compose } from "react-apollo";
import Queries from "../../graphql/queries";
import VendorSelect from "../vendors/VendorSelect";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

class AddSeed extends Component {
  constructor(props, context) {
    super(props, context);

    // bind the this context to member functions
    this.updateValues = this.updateValues.bind(this);
    this.handleHide = this.handleHide.bind(this);
    this.handleShow = this.handleShow.bind(this);
    this.updatePurchaseDate = this.updatePurchaseDate.bind(this);
    this.updateGermDate = this.updateGermDate.bind(this);
    this.submitForm = this.submitForm.bind(this);

    // initialize the state properties
    this.state = {
      seed: {
        id: "",
        name: "",
        vendor: "",
        purchasedOn: "",
        orderNumber: "",
        lotNumber: "",
        size: "",
        origin: "",
        germPercent: 0,
        hardPercent: 0,
        totalPercent: 0,
        germDate: "",
        upc: ""
      },
      show: false
    };
  }
  // updates component state variables
  updateValues(e) {
    if (e.target && e.target.id) {
      let { seed } = this.state;

      seed[e.target.id] = e.target.value;

      this.setState({ seed: seed });
    } else {
      console.warn(`Got unprocessable event args in AddSeed.updateValues: ${e}`);
    }
  }

  async updatePurchaseDate(val) {
    const d = new Date(val);
    let { seed } = this.state;
    seed.purchasedOn = d.toISOString();
    await this.setState({ seed: seed });
  }

  async updateGermDate(val) {
    const d = new Date(val);
    let { seed } = this.state;
    seed.germDate = d.toISOString();
    await this.setState({ seed: seed });
  }

  handleShow(e) {
    this.setState({ show: true });
  }

  handleHide(e) {
    //TODO: clear out the input values
    this.setState({ show: false });
  }

  // data submission
  async submitForm(e) {
    e.preventDefault();

    let { seed } = this.state;

    // coerce the vendor to the right structure
    if (!seed.vendor) {
      seed.vendor = document.querySelector("#vendor").value;
    }

    // ensure the state objects are properly cast
    seed.germPercent = parseInt(seed.germPercent);
    seed.hardPercent = parseInt(seed.hardPercent);
    seed.totalPercent = parseInt(seed.totalPercent);

    console.log(seed);

    if (!this.validateInput()) return;
    this.props.addSeed({
      variables: {
        seed: seed
      },
      refetchQueries: [{ query: Queries.allSeeds }]
    });

    this.handleHide();
  }

  validateInput() {
    // prevent empty data
    if (!this.state.seed.name) {
      console.error(`[Seed Validation]: Seed name invalid. Received: '${this.state.seed.name}'`);
      return false;
    }
    if (!this.state.seed.vendor) {
      console.error(`[Seed Validation]: Seed vendor invalid. Received: '${this.state.seed.vendor}'`);
      return false;
    }

    return true;
  }

  render() {
    return (
      <>
        <Button type="button" variant="success" onClick={this.handleShow}>
          Add Seed
        </Button>
        <Modal show={this.state.show} onHide={this.handleHide}>
          <Form id="add-seed" onSubmit={this.submitForm.bind(this)}>
            <Modal.Header closeButton>
              <h3>Add Seed</h3>
            </Modal.Header>
            <Modal.Body>
              <Form.Group as={Row}>
                <Form.Label column sm={3}>
                  Seed Name
                </Form.Label>
                <Col sm={9}>
                  <Form.Control type="text" value={this.state.seed.name} id="name" onChange={this.updateValues} />
                </Col>
              </Form.Group>
              <Form.Group as={Row}>
                <Form.Label column sm={3}>
                  Seed Vendor
                </Form.Label>
                <Col sm={9}>
                  <VendorSelect value={this.state.seed.vendor} id="vendor" onChange={this.updateValues} />
                </Col>
              </Form.Group>
              <Form.Group as={Row}>
                <Form.Label column sm={3}>
                  Purchased
                </Form.Label>
                <Col sm={9}>
                  <DatePicker value={this.state.seed.purchasedOn} onChange={this.updatePurchaseDate} className="form-control" />
                </Col>
              </Form.Group>
              <Form.Group as={Row}>
                <Form.Label column sm={3}>
                  PO Number
                </Form.Label>
                <Col sm={9}>
                  <Form.Control type="text" id="orderNumber" value={this.state.seed.orderNumber} onChange={this.updateValues} />
                </Col>
              </Form.Group>
              <Form.Group as={Row}>
                <Form.Label column sm={3}>
                  Lot Number
                </Form.Label>
                <Col sm={9}>
                  <Form.Control type="text" id="lotNumber" value={this.state.seed.lotNumber} onChange={this.updateValues} />
                </Col>
              </Form.Group>
              <Form.Group as={Row}>
                <Form.Label column sm={3}>
                  Size
                </Form.Label>
                <Col sm={9}>
                  <Form.Control type="text" id="size" value={this.state.seed.size} onChange={this.updateValues} />
                </Col>
              </Form.Group>
              <Form.Group as={Row}>
                <Form.Label column sm={3}>
                  Origin
                </Form.Label>
                <Col sm={9}>
                  <Form.Control type="text" id="origin" value={this.state.seed.origin} onChange={this.updateValues} />
                </Col>
              </Form.Group>
              <Form.Group as={Row}>
                <Form.Label column sm={3}>
                  Germ %
                </Form.Label>
                <Col sm={3}>
                  <input type="number" className="form-control" id="germPercent" value={this.state.seed.germPercent} onChange={this.updateValues} />
                  <Form.Text>Germ</Form.Text>
                </Col>
                <Col sm={3}>
                  <input type="number" className="form-control" id="hardPercent" value={this.state.seed.hardPercent} onChange={this.updateValues} />
                  <Form.Text>Hard</Form.Text>
                </Col>
                <Col sm={3}>
                  <input type="number" className="form-control" id="totalPercent" value={this.state.seed.totalPercent} onChange={this.updateValues} />
                  <Form.Text>Total</Form.Text>
                </Col>
              </Form.Group>
              <Form.Group as={Row}>
                <Form.Label column sm={3}>
                  Germ Date
                </Form.Label>
                <Col sm={9}>
                  <DatePicker
                    value={this.state.seed.germDate}
                    dateFormat="MM/yyyy"
                    showMonthYearPicker
                    onChange={this.updateGermDate}
                    className="form-control"
                  />
                </Col>
              </Form.Group>
              <Form.Group as={Row}>
                <Form.Label column sm={3}>
                  UPC
                </Form.Label>
                <Col sm={9}>
                  <Form.Control type="text" id="upc" value={this.state.seed.upc} onChange={this.updateValues} />
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

export default compose(graphql(Queries.addSeed, { name: "addSeed" }))(AddSeed);
