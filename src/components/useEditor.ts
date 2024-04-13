import { useEffect, useState } from "react";
import openseadragon from "openseadragon";
import Annotorious from "@recogito/annotorious-openseadragon";
import "@recogito/annotorious-openseadragon/dist/annotorious.min.css";
import { getAnnotations, addAnnotation } from "../utils";
import { Specimen } from "./NavBar";

window.openseadragon = openseadragon;

export default function useEditor({
  containerId,
  specimensList,
}: {
  containerId: string;
  specimensList: Array<Specimen>;
}) {
  const [currentSpecimen, setCurrentSpecimen] = useState(specimensList[0]);

  const [viewer, setViewer] = useState(null);
  const [annotorious, setAnnotorious] = useState(null);

  const [comments, setComments] = useState([]);

  const onSpecimenSelect = (specimen: Specimen) => {
    setCurrentSpecimen(specimen);
  };

  const onCommentClick = (comment) => {
    annotorious.panTo(comment);
    // annotorious.fitBounds(comment, true);
    // const rect = new openseadragon.Rect(1285, 392);
    // viewer.viewport.fitBounds(rect);
  };

  const addComment = (annotation) => {
    addAnnotation({ annotation, specimenId: currentSpecimen.name });
    setComments((comments) => [...comments, annotation]);
  };

  useEffect(() => {
    const cmts = getAnnotations({ specimenId: currentSpecimen.name });
    setComments(cmts);
  }, [currentSpecimen]);

  window.viewer = viewer;
  window.annotorious = annotorious;

  useEffect(() => {
    viewer?.destroy?.();
    annotorious?.destroy?.();

    const osdViewer = openseadragon({
      id: containerId,
      prefixUrl: "/osd/images/",
      tileSources: currentSpecimen.src,
      annotationTools: true,
      maxZoomLevel: 500,
    });
    setViewer(osdViewer);

    const anno = Annotorious(osdViewer);
    setAnnotorious(anno);
  }, [currentSpecimen]);

  useEffect(() => {
    if (!annotorious) return;

    const annotations = getAnnotations({ specimenId: currentSpecimen.name });

    annotations.forEach((annotation) => annotorious.addAnnotation(annotation));

    annotorious.on("createAnnotation", addComment);
  }, [annotorious]);

  return {
    currentSpecimen,
    onSpecimenSelect,
    viewer,
    annotorious,
    comments,
    onCommentClick,
  };
}
