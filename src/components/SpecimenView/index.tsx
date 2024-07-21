import { Specimen } from "@/services/api/models";
import { Label } from "../ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import Comments from "./Comments";
import useEditor from "./useEditor";

export default function SpecimenView({
  specimens,
}: {
  specimens: Specimen[];
}): JSX.Element {
  const {
    commentLoading,
    comments,
    onCommentClick,
    setCurrentSpecimen,
    currentSpecimen,
  } = useEditor({ specimens });

  if (!currentSpecimen) {
    return <div>No Specimens</div>;
  }

  return (
    <div className="h-full flex">
      <div className="h-full flex flex-col flex-1">
        <div className="flex gap-2 items-center p-4">
          <Label htmlFor="job_id">Choose Specimen</Label>
          <Select
            name="job_id"
            onValueChange={(val) =>
              setCurrentSpecimen(
                specimens.find((specimen) => String(specimen.job_id) === val) ??
                  currentSpecimen
              )
            }
          >
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder={currentSpecimen?.job_id ?? "---"} />
            </SelectTrigger>
            <SelectContent onChange={console.log}>
              {specimens?.map((specimen) => (
                <SelectItem
                  key={specimen.job_id}
                  value={String(specimen.job_id)}
                >
                  {specimen.job_id}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          Press Shift + Click and Drag to mark comments
        </div>

        <div id="osd-container" className="flex-1 p-10"></div>
      </div>
      <div className="w-[300px] border-l-2 border-secondary">
        <Comments
          comments={comments}
          loading={commentLoading}
          onCommentClick={onCommentClick}
        />
      </div>
    </div>
  );
}
