/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const createArrete = /* GraphQL */ `
  mutation CreateArrete(
    $input: CreateArreteInput!
    $condition: ModelarreteConditionInput
  ) {
    createArrete(input: $input, condition: $condition) {
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
export const updateArrete = /* GraphQL */ `
  mutation UpdateArrete(
    $input: UpdateArreteInput!
    $condition: ModelarreteConditionInput
  ) {
    updateArrete(input: $input, condition: $condition) {
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
export const deleteArrete = /* GraphQL */ `
  mutation DeleteArrete(
    $input: DeleteArreteInput!
    $condition: ModelarreteConditionInput
  ) {
    deleteArrete(input: $input, condition: $condition) {
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
