export default function Comments({
  comments,
  onCommentClick,
}: {
  comments: Array<any>;
  onCommentClick: (comment: any) => void;
}): JSX.Element {
  return (
    <div className="app-comments">
      {comments.map((comment) => (
        <div
          key={comment.id}
          onClick={() => onCommentClick(comment)}
          className="app-comment"
        >
          {getCommentText(comment)}
        </div>
      ))}
    </div>
  );
}

function getCommentText(annotation): string {
  return annotation.body[0].value;
}
