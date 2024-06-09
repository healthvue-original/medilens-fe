import { CommentModel } from "@/services/api/models";

export default function Comments({
  comments,
  loading,
  onCommentClick,
}: {
  comments: CommentModel[];
  loading: boolean;
  onCommentClick: (comment: CommentModel) => void;
}): JSX.Element {
  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="">
      <div className=" text-center p-2 border-b-2 border-secondary">Comments</div>
      {comments.map((comment) => (
        <div
          onClick={() => onCommentClick(comment)}
          key={comment.id}
          className="p-5 border-b-2 border-secondary cursor-pointer"
        >
          {getCommentText(comment.comment)}
        </div>
      ))}
      {comments.length == 0 && <div>No Comments</div>}
    </div>
  );
}

function getCommentText(annotation): string {
  return annotation.body[0].value;
}
