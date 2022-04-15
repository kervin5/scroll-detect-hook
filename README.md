# What is it?

It's a hook to be used in React functional components, that allows you to detect when the document is scrolling and in which direction. This is useful to apply custom styling depending on the scrolling state.

The hook returns an array with 3 elements:

- isScrolling: boolean
- direction: string, this can be "up", "down" or stopped
- speed: number, represents the scrolling speed
- position: number, this is just the Y offset of the document

# How to use?

Simply install the module and import the hook:

```javascript
import useScrollDetector from "scroll-detect-hook";

const Section = () => {
  const { isScrolling, direction, speed, position } = useScrollDetector();
  console.log({ isScrolling, direction, speed, position });
  //   console.log(isScrolling);
  return (
    <div
      style={{
        height: "300vh",
        backgroundColor: isScrolling ? "yellow" : "blue",
      }}
    >
      {isScrolling ? "Yes" : "No"}:{speed}:{direction}
    </div>
  );
};

export default Section;
```

Coming soon: Listen to scrolling of custom elements
