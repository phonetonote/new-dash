import { AggregateCount } from "../components/areas/DashboardArea";
import { Subscription } from "./SubscriptionTypes";

export type AllData = {
  subscriptions: Subscription[];
  totalMonthylMessages: AggregateCount;
  totalCount: AggregateCount;
  smsCount: AggregateCount;
  facebookCount: AggregateCount;
  facebookChannels: AggregateCount;
  alfredCount: AggregateCount;
  telegramCount: AggregateCount;
  zapierCount: AggregateCount;
  chromeCount: AggregateCount;
  emailCount: AggregateCount;
  telegramChannels: AggregateCount;
  roam_keys: {
    key: string;
  }[];
};