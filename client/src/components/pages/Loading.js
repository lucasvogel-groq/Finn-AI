import React from "react";
import Loader from "../Loader.js";
import { HeroHighlight } from "../Hero-Highlight.js";

function Loading() {
  return (
    <HeroHighlight>
      <Loader></Loader>
    </HeroHighlight>
  );
}

export default Loading;
