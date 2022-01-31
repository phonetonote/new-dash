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
    }
    roam_keys(where: { clerk_id: { _eq: $clerkId } }, order_by: { id: desc }) {
      key
    }

    messages_aggregate(
      where: { clerk_id: { _eq: $clerkId }, status: { _eq: 2 } }
    ) {
      aggregate {
        count
      }
    }

    totalCount: filter_to_current_month_aggregate(
      where: { clerk_id: { _eq: $clerkId } }
    ) {
      aggregate {
        count
      }
    }
    smsCount: filter_to_current_month_aggregate(
      where: { clerk_id: { _eq: $clerkId }, sender_type: { _eq: 0 } }
    ) {
      aggregate {
        count
      }
    }
    facebookCount: filter_to_current_month_aggregate(
      where: { clerk_id: { _eq: $clerkId }, sender_type: { _eq: 1 } }
    ) {
      aggregate {
        count
      }
    }

    alfredCount: filter_to_current_month_aggregate(
      where: { clerk_id: { _eq: $clerkId }, sender_type: { _eq: 3 } }
    ) {
      aggregate {
        count
      }
    }
    telegramCount: filter_to_current_month_aggregate(
      where: { clerk_id: { _eq: $clerkId }, sender_type: { _eq: 5 } }
    ) {
      aggregate {
        count
      }
    }
    zapierCount: filter_to_current_month_aggregate(
      where: { clerk_id: { _eq: $clerkId }, sender_type: { _eq: 6 } }
    ) {
      aggregate {
        count
      }
    }
    emailCount: filter_to_current_month_aggregate(
      where: { clerk_id: { _eq: $clerkId }, sender_type: { _eq: 7 } }
    ) {
      aggregate {
        count
      }
    }
  }
`;
