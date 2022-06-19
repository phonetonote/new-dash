import router from "next/router";
import { useState, useEffect, createContext } from "react";
import { HEADING_CLASS } from "../components/headings/DashboardHeading";
import { condenseTitle } from "../components/sidebar/SidebarLink";
import useScrollPosition from "@react-hook/window-scroll";

export const ActiveTitleContext = createContext("");

const useScrollableArea = () => {
  const scrollY = useScrollPosition(30);

  const getExistingParams = () => {
    const existingParams = new URLSearchParams(`${window.location.search}`);
    return Object.fromEntries(existingParams);
  };
  const urlParamsWithNewTitle = (newTitle: string) => {
    const newParams = getExistingParams();
    newParams["title"] = newTitle;

    if (newParams["go_to_billing"] === "yes") {
      newParams["go_to_billing"] = "no";
    }

    if (newParams["go_to_ptn_key"] === "yes") {
      newParams["go_to_ptn_key"] = "no";
    }

    return new URLSearchParams(newParams).toString();
  };

  const getSortingHeadings = () => {
    const headings = [
      ...Array.from(document.getElementsByClassName("cl-title")),
      ...Array.from(document.getElementsByClassName(HEADING_CLASS)),
    ];

    return headings.sort((heading) => {
      return heading.getBoundingClientRect().top;
    });
  };

  const getTopHeading = () => {
    const sortedHeadings = getSortingHeadings();
    const visibleHeadings = sortedHeadings?.filter((heading) => {
      return heading.getBoundingClientRect().top >= 0;
    });

    const topHeading =
      visibleHeadings.length > 0 ? visibleHeadings[0] : sortedHeadings[0];
    return topHeading;
  };

  const getGoToBilling = () =>
    getExistingParams()["go_to_billing"] === "yes" && scrollY === 0;

  const getGoToPtnKey = () =>
    getExistingParams()["go_to_ptn_key"] === "yes" && scrollY === 0;

  const getBillingHeading = () =>
    getSortingHeadings().filter(
      (heading) => heading.innerHTML.trim() === "billing"
    )[0];

  const getPtnKeyHeading = () =>
    getSortingHeadings().filter(
      (heading) => heading.innerHTML.trim() === "ptn key"
    )[0];

  const getRelevantHeading = () => {
    const goToBilling = getGoToBilling();
    if (goToBilling) {
      return getBillingHeading();
    }

    const goToPtnKey = getGoToPtnKey();
    if (goToPtnKey) {
      return getPtnKeyHeading();
    }

    return getTopHeading();
  };

  const [activeTitle, setActiveTitle] = useState<string>("");

  useEffect(() => {
    const relevantHeading = getRelevantHeading();
    if (relevantHeading) {
      const newParams = urlParamsWithNewTitle(
        condenseTitle(relevantHeading.innerHTML)
      );

      const newRoute = `${window.location.pathname}?${newParams}`;

      if (newRoute !== router.asPath) {
        setActiveTitle(condenseTitle(relevantHeading.innerHTML));

        router.push(`${newRoute}`, undefined, { shallow: true });
      }
    }
  }, [scrollY]);

  if (getBillingHeading() && getGoToBilling() === true && scrollY === 0) {
    getBillingHeading().scrollIntoView();
  }

  if (getPtnKeyHeading() && getGoToPtnKey() === true && scrollY === 0) {
    getPtnKeyHeading().scrollIntoView();
  }
  return [activeTitle, setActiveTitle];
};

export default useScrollableArea;
