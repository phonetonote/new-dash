export type Subscription = {
  stripe_data: {
    plan: {
      product: {
        name: string;
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
    status: string;
  };
};

export type PTRDuration = "month" | "year";
export type PaidPlan = "standard" | "pro";
export type Plan = PaidPlan | "free" | "enterprise";
