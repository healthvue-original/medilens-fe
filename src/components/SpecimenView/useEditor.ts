import { useEffect, useState } from "react";
import OpenSeadragon from "openseadragon";
import Annotorious from "@recogito/annotorious-openseadragon";
import "@recogito/annotorious-openseadragon/dist/annotorious.min.css";
import { useAPI } from "@/context/APIProvider";
import { CommentModel, SpecimenModel } from "@/services/api/models";
import { API_HOST } from "@/services/api/utils";
import CustomWidget from "./CustomWidget";

const baseURL = import.meta.env.BASE_URL;

export default function useEditor({
  containerId = "osd-container",
  specimens,
}: {
  containerId?: string;
  specimens: SpecimenModel[];
}) {
  const api = useAPI();

  const [viewer, setViewer] = useState<OpenSeadragon.Viewer | null>(null);
  const [annotorious, setAnnotorious] = useState(null);

  const [currentSpecimen, setCurrentSpecimen] = useState<SpecimenModel>(
    specimens[0]
  );

  const [commentLoading, setCommentLoading] = useState(false);
  const [comments, setComments] = useState<CommentModel[]>([]);

  const getComments = async (specimen: SpecimenModel) => {
    setCommentLoading(true);
    const commentList = await api.getComments({
      entity: "specimen",
      entity_id: specimen.job_id,
    });

    setComments(commentList);
    setCommentLoading(false);
  };

  useEffect(() => {
    if (currentSpecimen) {
      getComments(currentSpecimen);
    }
  }, [currentSpecimen]);

  const onCommentClick = (comment) => {
    annotorious.panTo(comment.comment);
    annotorious.selectAnnotation(comment.comment);
  };

  const addComment = async (annotation) => {
    await api.addComment({
      entity: "specimen",
      entity_id: currentSpecimen.job_id,
      comment: JSON.stringify(annotation),
      parent_id: 0,
    });
    getComments(currentSpecimen);
    // addAnnotation({ annotation, specimenId: currentSpecimen.name });
    // setComments((comments) => [...comments, annotation]);
  };

  const updateComment = async (annotation) => {
    const replies = annotation.body.slice(1);
  };

  // window.viewer = viewer;
  // window.annotorious = annotorious;

  useEffect(() => {
    if (!currentSpecimen) {
      return;
    }
    viewer?.destroy?.();
    annotorious?.destroy?.();

    const osdViewer = OpenSeadragon({
      id: containerId,
      prefixUrl: `${baseURL}osd/images/`,
      tileSources: "http://localhost:8081/output/sample-specimen.dzi",
      // `${API_HOST}/cases/${currentSpecimen.case_id}/specimens/${currentSpecimen.id}/dzi?key=sample-specimen.dzi.dzi` ??
      // currentSpecimen.file_path,
      maxZoomLevel: 500,
    });
    setViewer(osdViewer);

    const anno = Annotorious(osdViewer);

    anno.setAuthInfo({
      id: `${API_HOST}/navin`,
      displayName: "Navin",
    });
    setAnnotorious(anno);
  }, [currentSpecimen]);

  useEffect(() => {
    if (!annotorious || commentLoading) return;

    // const annotations = getAnnotations({ specimenId: currentSpecimen.name });

    // const annotations = comments.map((cmt) => JSON.parse(cmt.comment));

    // console.log(annotations);
    comments.forEach((comment) => annotorious.addAnnotation(comment.comment));

    annotorious.on("createAnnotation", addComment);
    annotorious.on("updateAnnotation", updateComment);
  }, [annotorious, commentLoading]);

  return {
    currentSpecimen,
    setCurrentSpecimen,
    commentLoading,
    // onSpecimenSelect,
    viewer,
    annotorious,
    comments,
    onCommentClick,
  };
}
