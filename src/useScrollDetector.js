import { useState, useEffect } from "react";

export default function useScrollDetector() {
  const [position, setPosition] = useState(0);
  const [prevPosition, setPrevPosition] = useState(0);
  const [isScrolling, setIsScrolling] = useState(false);
  const [scrollingElement, setScrollingElement] = useState(null);
  const [direction, setDirection] = useState("stopped");

  function calculateAndSetDirection(oldPosition, newPosition) {
    if (newPosition > oldPosition) {
      setDirection("down");
    } else if (newPosition < oldPosition) {
      setDirection("up");
    } else {
      setDirection("stopped");
    }
  }

  useEffect(() => {
    if (typeof window !== "undefined") {
      setScrollingElement(window);
    }
  }, []);

  useEffect(() => {
    let scrollTimeout = null;
    if (scrollingElement) {
      scrollingElement.addEventListener("scroll", (e) => {
        clearTimeout(scrollTimeout);
        setIsScrolling(true);
        setPrevPosition(scrollingElement.pageYOffset);
        scrollTimeout = setTimeout(function () {
          setIsScrolling(false);
          setDirection("stopped");
        }, 66);
      });
    }

    return () => {
      if (scrollingElement) {
        scrollingElement.removeEventListener("scroll", (e) => {
          setIsScrolling(false);
          setPosition(0);
          setPrevPosition(0);
          setDirection("stopped");
        });
      }
    };
  }, [scrollingElement]);

  useEffect(() => {
    if (scrollingElement && position !== scrollingElement.pageYOffset) {
      calculateAndSetDirection(position, scrollingElement.pageYOffset);
      setPosition(scrollingElement.pageYOffset);
    }
  }, [isScrolling, prevPosition, position, scrollingElement]);

  return [isScrolling, direction, position];
}
