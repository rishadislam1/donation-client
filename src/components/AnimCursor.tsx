import AnimatedCursor from "react-animated-cursor";

const AnimCursor = () => {
  return (
    <div>
      <AnimatedCursor
        innerSize={12}
        outerSize={12}
        color="transparent"
        outerAlpha={1}
        innerScale={1}
        outerScale={5}
        outerStyle={{
          border: "1px solid var(--cursor-color)",
        }}
        innerStyle={{
          backgroundColor: "var(--cursor-color)",
        }}
        clickables={[
          "a",
          'input[type="text"]',
          'input[type="email"]',
          'input[type="number"]',
          'input[type="submit"]',
          'input[type="image"]',
          "label[for]",
          "select",
          "textarea",
          "button",
          ".link",
        ]}
      />
    </div>
  );
};

export default AnimCursor;
