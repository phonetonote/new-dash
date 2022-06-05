import Link from "next/link";
import React, { ReactChild } from "react";
import { MyLink } from "../components/MyLink";

export const MESSAGE_ENUM: {
  [k: string]: {
    enumInt: number;
    desc: ReactChild;
  };
} = {
  sms: {
    enumInt: 0,
    desc: "we texted you from a 310 number. text it back messages, and they'll appear in your installed clients",
  },
  facebook: {
    enumInt: 1,
    desc: (
      <div>
        <a href="http://m.me/phonetoroam">
          send us your ptn key on facebook messenger
        </a>
        , then you can start sending us messages
      </div>
    ),
  },
  alfred: {
    enumInt: 3,
    desc: (
      <div>
        <a href="https://ptn.gumroad.com/l/ptn-alfred">download alfredtonote</a>{" "}
        and edit the script to include your ptn_key.
      </div>
    ),
  },
  telegram: {
    enumInt: 5,
    desc: (
      <div>
        send your ptn_key to our{" "}
        <a href="https://telegram.me/phonetoroam_bot">telegram bot</a>, then
        start sending it messages
      </div>
    ),
  },
  zapier: {
    enumInt: 6,
    desc: (
      <div>
        get started{" "}
        <MyLink href="/pages/integrations">with our zapier integration</MyLink>{" "}
        to pipe other data to your notes. you will need your ptn_key to get
        started. it might still be referred to as phonetoroam and your roam_key
        over there.
      </div>
    ),
  },
  email: {
    enumInt: 7,
    desc: (
      <div>
        email or forward mail to <em>hello@inbound.phonetonote.com</em> to sync
        your emails into your notes
      </div>
    ),
  },
};
