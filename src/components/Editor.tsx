import { useEffect, useState } from "react";
import openseadragon from "openseadragon";
import Annotorious from "@recogito/annotorious-openseadragon";
import "@recogito/annotorious-openseadragon/dist/annotorious.min.css";
import { Specimen } from "./NavBar";
import { addAnnotation, getAnnotations } from "../utils";

export default function Editor({
  specimen,
}: {
  specimen: Specimen;
}): JSX.Element {
  return (
    <div className="editor">
      <div id="osd-container"></div>
    </div>
  );
}
