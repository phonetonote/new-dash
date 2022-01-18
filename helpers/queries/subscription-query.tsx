import { gql } from '@apollo/client'

export const subscriptionQuery = gql`
  query SubscriptionData($clerkId: String = "") {
    subscriptions(
      where: { clerk_id: { _eq: $clerkId }, status: { _eq: 1 } }
      limit: 1
      order_by: { id: desc }
    ) {
      id
      nickname
      status
      stripe_data {
        id
        cancelAt
        currentPeriodEnd
        currentPeriodStart
        startDate
        status
        items {
          data {
            id
          }
        }
        plan {
          interval
          product {
            ... on StripeProduct {
              name
            }
          }
          nickname
        }
      }
    }
  }
`
