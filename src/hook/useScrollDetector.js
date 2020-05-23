import { useState, useEffect } from "react";

export default function useScrollDetector() {
  const [position, setPosition] = useState(0);
  const [isScrolling, setIsScrolling] = useState(false);
  const [scrollingElement, setScrollingElement] = useState(null);
  let scrollTimeout = null;

  useEffect(() => {
    if (typeof window !== "undefined") {
      setScrollingElement(window);
    }
  }, []);

  useEffect(() => {
    if (scrollingElement) {
      scrollingElement.addEventListener("scroll", (e) => {
        clearTimeout(scrollTimeout);
        setIsScrolling(true);
        setPosition(scrollingElement.pageYOffset);
        scrollTimeout = setTimeout(function () {
          setIsScrolling(false);
        }, 66);
      });
    }

    return () => {
      if (scrollingElement) {
        scrollingElement.removeEventListener("scroll", (e) => {
          setIsScrolling(false);
          setPosition(0);
        });
      }
    };
  }, [scrollingElement]);

  return [isScrolling, position];
}
