/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const getArrete = /* GraphQL */ `
  query GetArrete($id: ID!) {
    getArrete(id: $id) {
      id
      title
      description
      link
      mainCategory
      zipCode
      period {
        start
        end
      }
      createdAt
      updatedAt
    }
  }
`;
export const listArretes = /* GraphQL */ `
  query ListArretes(
    $filter: ModelarreteFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listArretes(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        title
        description
        link
        mainCategory
        zipCode
        period {
          start
          end
        }
        createdAt
        updatedAt
      }
      nextToken
    }
  }
`;
