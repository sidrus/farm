import React, { Component } from "react";
import Queries from "../../graphql/queries";
import { graphql } from "react-apollo";

class VendorSelect extends Component {
  renderVendorOptions() {
    const { data } = this.props;
    const { vendors } = data;

    if (data.loading) {
      return <option key={null}>Loading vendors...</option>;
    } else {
      if (!vendors) return;

      return vendors.map(vendor => {
        return (
          <option key={vendor.id} value={vendor.id}>
            {vendor.name}
          </option>
        );
      });
    }
  }

  render() {
    return (
      <select id={this.props.id} name={this.props.name} value={this.props.value} onChange={this.props.onChange} className="form-control">
        {this.renderVendorOptions()}
      </select>
    );
  }
}

export default graphql(Queries.allVendors)(VendorSelect);
