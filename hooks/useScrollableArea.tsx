import router from "next/router";
import { useState, useEffect, createContext } from "react";
import { HEADING_CLASS } from "../components/headings/DashboardHeading";
import { condenseTitle } from "../components/sidebar/SidebarLink";
import useScrollPosition from "@react-hook/window-scroll";

export const ActiveTitleContext = createContext("");

const useScrollableArea = () => {
  const scrollY = useScrollPosition(30);

  const [activeTitle, setActiveTitle] = useState<string>("");

  useEffect(() => {
    const params = new URLSearchParams(`${window.location.search}`);
    const possibleTitle = params.get("title");
    router.push(`${window.location.pathname}#${possibleTitle}`, "", {
      shallow: true,
    });
  }, []);

  useEffect(() => {
    const headings = [
      ...Array.from(document.getElementsByClassName("cl-title")),
      ...Array.from(document.getElementsByClassName(HEADING_CLASS)),
    ];

    const sortedHeadings = headings.sort((heading) => {
      return heading.getBoundingClientRect().top;
    });

    const visibleHeadings = sortedHeadings?.filter((heading) => {
      return heading.getBoundingClientRect().top >= 0;
    });

    const topHeading =
      visibleHeadings.length > 0 ? visibleHeadings[0] : sortedHeadings[0];

    if (topHeading) {
      setActiveTitle(condenseTitle(topHeading.innerHTML));

      const newRoute = `${window.location.pathname}?title=${condenseTitle(
        topHeading.innerHTML
      )}`;

      if (newRoute !== router.asPath) {
        router.push(`${newRoute}`, undefined, { shallow: true });
      }
    }
  }, [scrollY]);

  return [activeTitle, setActiveTitle];
};

export default useScrollableArea;
