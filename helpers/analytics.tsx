import mixpanel from "mixpanel-browser";
mixpanel.init(`${process.env.NEXT_PUBLIC_MIXPANEL_TOKEN}`);

const env_check = process.env.NODE_ENV === "development";

const Analytics = {
  identify: (id: string) => {
    if (env_check) mixpanel.identify(id);
  },
  alias: (id: string) => {
    if (env_check) mixpanel.alias(id);
  },
  track: (name: string, props?: object) => {
    if (env_check) mixpanel.track(name, props);
  },
  people: {
    set: (props: object) => {
      if (env_check) mixpanel.people.set(props);
    },
  },
};

export default Analytics;
