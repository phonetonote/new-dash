import { gql } from "@apollo/client";

export const dashboardQuery = gql`
  query DashboardData($clerkId: String = "") {
    subscriptions(
      where: { clerk_id: { _eq: $clerkId } }
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
        customer {
          ... on StripeCustomer {
            discount {
              coupon {
                id
              }
            }
          }
        }
      }
    }

    totalMonthylMessages: filter_to_current_month_aggregate(
      where: { clerk_id: { _eq: $clerkId } }
    ) {
      aggregate {
        count
      }
    }

    roam_keys(where: { clerk_id: { _eq: $clerkId } }, order_by: { id: desc }) {
      key
    }

    totalCount: messages_aggregate(
      where: { clerk_id: { _eq: $clerkId }, status: { _eq: 2 } }
    ) {
      aggregate {
        count
      }
    }
    smsCount: messages_aggregate(
      where: { clerk_id: { _eq: $clerkId }, sender_type: { _eq: 0 } }
    ) {
      aggregate {
        count
      }
    }
    facebookCount: messages_aggregate(
      where: { clerk_id: { _eq: $clerkId }, sender_type: { _eq: 1 } }
    ) {
      aggregate {
        count
      }
    }
    alfredCount: messages_aggregate(
      where: { clerk_id: { _eq: $clerkId }, sender_type: { _eq: 3 } }
    ) {
      aggregate {
        count
      }
    }
    telegramCount: messages_aggregate(
      where: { clerk_id: { _eq: $clerkId }, sender_type: { _eq: 5 } }
    ) {
      aggregate {
        count
      }
    }
    zapierCount: messages_aggregate(
      where: { clerk_id: { _eq: $clerkId }, sender_type: { _eq: 6 } }
    ) {
      aggregate {
        count
      }
    }
    chromeCount: messages_aggregate(
      where: { clerk_id: { _eq: $clerkId }, sender_type: { _eq: 8 } }
    ) {
      aggregate {
        count
      }
    }
    emailCount: messages_aggregate(
      where: { clerk_id: { _eq: $clerkId }, sender_type: { _eq: 7 } }
    ) {
      aggregate {
        count
      }
    }
    facebookChannels: facebooks_aggregate(
      where: { clerk_id: { _eq: $clerkId } }
    ) {
      aggregate {
        count
      }
    }

    telegramChannels: local_telegrams_aggregate(
      where: { clerk_id: { _eq: $clerkId } }
    ) {
      aggregate {
        count
      }
    }
  }
`;
