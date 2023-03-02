export type Plan =  "standard" | "pro" | "free" | "enterprise";
type StripeStatus = "incomplete" | "incomplete_expired" | "trialing" |
  "active" | "past_due" | "canceled" | "unpaid"

export type Subscription = {
  stripe_data: {
    plan: {
      product: {
        name: Plan;
      };
      nickname: string;
    };
    customer: {
      discount: {
        coupon: {
          id: string;
        };
      };
    };
    status: StripeStatus;
  };
};
