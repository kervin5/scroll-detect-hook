import { useState, useEffect } from "react";

export default function useScrollDetector() {
  const [position, setPosition] = useState(0);
  const [prevPosition, setPrevPosition] = useState(0);
  const [isScrolling, setIsScrolling] = useState(false);
  const [scrollingElement, setScrollingElement] = useState(null);
  const [direction, setDirection] = useState("stopped");
  const [scrollSpeed, setScrollSpeed] = useState(0);

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
    const checkScrollSpeed = (function (settings) {
      settings = settings || {};

      var lastPos,
        newPos,
        timer,
        delta,
        delay = settings.delay || 100; // in "ms" (higher means lower fidelity )

      function clear() {
        lastPos = null;
        delta = 0;
      }

      clear();

      return function () {
        newPos = scrollingElement.scrollY;
        if (lastPos != null) {
          // && newPos < maxScroll
          delta = newPos - lastPos;
        }
        lastPos = newPos;
        clearTimeout(timer);
        timer = setTimeout(clear, delay);
        return delta;
      };
    })();
    if (scrollingElement) {
      scrollingElement.addEventListener("scroll", (e) => {
        clearTimeout(scrollTimeout);
        setIsScrolling(true);
        setPrevPosition(scrollingElement.pageYOffset);
        setScrollSpeed(Math.abs(checkScrollSpeed()));
        scrollTimeout = setTimeout(function () {
          setIsScrolling(false);
          setDirection("stopped");
          setScrollSpeed(0);
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

  return { isScrolling, direction, scrollSpeed, position };
}
