import React, { useState, useEffect, useRef } from "react";

const useScrollElement = () => {
  const elementRef = useRef(null);

  const [scrollPosition, setScrollPosition] = useState(0);

  const handleScroll = () => {
    const scrollWindowPosition = window.scrollY;

    if (elementRef?.current) {
      const elementTop = elementRef.current.getBoundingClientRect().top;
      const elementHeight = elementRef.current.getBoundingClientRect().height;

      const scrollCalculation =
        (elementHeight - elementTop) / elementHeight / 2;
      const scrollPercentage = Math.max(0, Math.min(scrollCalculation, 1));

      setScrollPosition({
        scrollWindow: scrollWindowPosition,
        scrollContainer: scrollPercentage,
      });
    } else {
      setScrollPosition({
        scrollWindow: scrollWindowPosition,
        scrollContainer: 0,
      });
    }
  };
  useEffect(() => {
    handleScroll();
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);
  return { elementRef, scrollPosition };
};

export default useScrollElement;
