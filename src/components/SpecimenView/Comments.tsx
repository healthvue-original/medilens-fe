import { Comment } from "@/services/api/models";
import { Annotation } from "./types";

export default function Comments({
  comments,
  loading,
  onCommentClick,
}: {
  comments: Comment[];
  loading: boolean;
  onCommentClick: (comment: Comment) => void;
}): JSX.Element {
  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="">
      <div className=" text-center p-2 border-b-2 border-secondary">
        Comments
      </div>
      {comments.map((comment) => (
        <div
          onClick={() => onCommentClick(comment)}
          key={comment.id}
          className="p-5 border-b-2 border-secondary cursor-pointer"
        >
          {getCommentText(JSON.parse(comment.comment))}
        </div>
      ))}
      {comments.length == 0 && <div>No Comments</div>}
    </div>
  );
}

function getCommentText(annotation: Annotation): string | undefined {
  if (annotation.body && annotation.body?.length > 0) {
    return annotation.body[0]?.value;
  }
}
