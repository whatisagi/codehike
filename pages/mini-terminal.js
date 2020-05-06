import React from "react";
import Head from "next/head";
import { MiniTerminalTransitions } from "@code-hike/mini-terminal";
import { CodeHikeLogo } from "../src/code-hike-logo";
import { useStepsProgress, StepsRange } from "../src/steps-range";
import { ExternalLinkButton, LinkButton } from "../src/button";
import Link from "next/link";
import { useSpring } from "use-spring";

export default function Page() {
  return (
    <div style={{ width: 500, margin: "0 auto 30px" }}>
      <Head>
        <title>Mini Terminal - Code Hike</title>
        <link rel="shortcut icon" type="image/x-icon" href="/favicon.ico" />
      </Head>
      <Header />
      <Demo />
      <div style={{ fontSize: "1.4rem", marginBottom: 48 }}>
        React component for terminal walkthroughs. It transitions smoothly
        between a given list of steps using the <code>progress</code> prop.
      </div>
      <div style={{ display: "flex" }}>
        <ExternalLinkButton
          style={{ flex: 1 }}
          href="https://codesandbox.io/s/gifted-jennings-p4co1?file=/src/App.js"
        >
          {/* <CodeSandboxIcon size="1.4em" style={{ marginRight: "0.5rem" }} /> */}
          Try it
        </ExternalLinkButton>
        <div style={{ width: 12 }} />
        <LinkButton style={{ flex: 1 }} href="mini-terminal/docs">
          {/* <DocsIcon size="1.4em" style={{ marginRight: "0.5rem" }} /> */}
          Docs
        </LinkButton>
        <div style={{ width: 12 }} />
        <ExternalLinkButton
          style={{ flex: 1 }}
          href="https://github.com/code-hike/mini-terminal"
        >
          {/* <GitHubIcon size="1.2em" style={{ marginRight: "0.5rem" }} /> */}
          GitHub
        </ExternalLinkButton>
      </div>
    </div>
  );
}

function Header() {
  const mouseCoords = useMouseCoords();
  const rotate =
    mouseCoords.x === 0 && mouseCoords.y === 0
      ? 0
      : (Math.atan2(mouseCoords.y, mouseCoords.x) * 180) / Math.PI + 90 - 16;

  const [angle] = useSpring(rotate, { mass: 12, stiffness: 50, damping: 10 });

  return (
    <>
      <header
        style={{
          margin: "92px 0 36px 0",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Link href="/">
          <a>
            <CodeHikeLogo
              style={{ height: 104, width: 104, display: "block" }}
              rotate={angle}
              id="compass"
            />
          </a>
        </Link>
        <div style={{ width: 16 }} />
        <div>
          <h1
            style={{
              fontSize: "3.1rem",
              margin: 0,
              fontFamily: `'Code', sans-serif`,
            }}
          >
            Code
          </h1>
          <h1
            style={{
              fontSize: "2.65rem",
              margin: 0,
              fontFamily: `'Hike', cursive`,
            }}
          >
            Hike
          </h1>
        </div>
      </header>
      <h1 style={{ margin: 0, textAlign: "center", fontSize: "2.8rem" }}>
        Mini Terminal
      </h1>
    </>
  );
}

function useMouseCoords() {
  const [coords, setCoords] = React.useState({ x: 0, y: 0 });
  // todo return angle instead of coords
  // set events using react
  React.useEffect(() => {
    const compass = document.getElementById("compass");
    var html = document.documentElement;

    const onMove = (e) => {
      var bound = compass.getBoundingClientRect();
      const top =
        bound.top + bound.height / 2 + window.pageYOffset - html.clientTop;
      const left =
        bound.left + bound.width / 2 + window.pageXOffset - html.clientLeft;

      const x = e.pageX - left;
      const y = e.pageY - top;
      // console.log(e.currentTarget);
      setCoords({ x, y });
    };
    const onLeave = (e) => {
      setCoords({ x: 0, y: 0 });
    };
    compass.addEventListener("mousemove", onMove);
    compass.addEventListener("mouseleave", onLeave);
    return () => {
      compass.removeEventListener("mousemove", onMove);
      compass.removeEventListener("mouseleave", onLeave);
    };
  }, []);
  return coords;
}

function Demo() {
  const [progress, rangeProps] = useStepsProgress({
    stepsCount: steps.length,
    auto: 3000,
  });
  return (
    <div style={{ width: 500, margin: "48px auto 24px" }}>
      <MiniTerminalTransitions
        title="bash"
        height={200}
        progress={progress}
        steps={steps}
      />
      <StepsRange {...rangeProps} />
    </div>
  );
}

const steps = [
  `$ lorem ipsum
dolor sit amet
consectetur adipiscing elit
$ sed do`,
  `$ eiusmod tempor incididunt
ut labore et dolore`,
  `$ magna aliqua
ut enim ad minim veniam
quis nostrud
exercitation ullamco laboris nisi ut aliquip
ex ea commodo consequat
$ duis aute irure dolor
in reprehenderit`,
  `$ in voluptate
velit esse cillum dolore
$ eu fugiat nulla pariatur`,
  `$ excepteur sint occaecat
cupidatat non proident
sunt in culpa qui
officia deserunt
$ mollit anim id est laborum
$ `,
];
