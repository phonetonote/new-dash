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

  const getBillingHeading = () =>
    getSortingHeadings().filter(
      (heading) => heading.innerHTML.trim() === "billing"
    )[0];

  const getRelevantHeading = () => {
    const goToBilling = getGoToBilling();
    const topHeading = getTopHeading();
    const billingHeading = getBillingHeading();
    return goToBilling ? billingHeading : topHeading;
  };

  const [activeTitle, setActiveTitle] = useState<string>("");

  useEffect(() => {
    const relevantHeading = getRelevantHeading();
    if (relevantHeading) {
      const newParams = urlParamsWithNewTitle(
        condenseTitle(relevantHeading.innerHTML)
      );
      setActiveTitle(condenseTitle(relevantHeading.innerHTML));

      const newRoute = `${window.location.pathname}?${newParams}`;

      if (newRoute !== router.asPath) {
        router.push(`${newRoute}`, undefined, { shallow: true });
      }
    }
  }, [scrollY]);

  if (getBillingHeading() && getGoToBilling() === true && scrollY === 0) {
    getBillingHeading().scrollIntoView();
  }
  return [activeTitle, setActiveTitle];
};

export default useScrollableArea;
