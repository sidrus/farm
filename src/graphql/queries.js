import { gql } from "apollo-boost";

const Queries = {
  addVendor: gql`
    mutation($vendor: VendorInput!) {
      addVendor(vendor: $vendor) {
        id
        name
        website
      }
    }
  `,
  updateVendor: gql`
    mutation($vendorId: ID!, $name: String!, $website: String) {
      updateVendor(id: $vendorId, name: $name, website: $website) {
        id
        name
        website
      }
    }
  `,
  getVendor: gql`
    query($vendorId: ID!) {
      getVendor(id: $vendorId) {
        name
        id
        website
      }
    }
  `,
  allVendors: gql`
    query {
      vendors {
        id
        name
        website
        seeds {
          name
          id
        }
      }
    }
  `,
  allSeeds: gql`
    query {
      seeds {
        id
        name
        lotNumber
        vendor {
          name
          id
          website
        }
        crops {
          lotNumber
          plantedOn
        }
      }
    }
  `,
  addSeed: gql`
    mutation createSeed($seed: SeedInput!) {
      createSeed(seed: $seed) {
        name
        vendor {
          name
        }
      }
    }
  `
};

export default Queries;
