import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { useAPI } from "@/context/APIProvider";
import { CaseModel } from "@/services/api/models";
import { useEffect } from "react";

export default function CaseDetail({
  closeDialog,
  caseObj,
}: {
  closeDialog: () => void;
  caseObj?: CaseModel;
}): JSX.Element {
  const api = useAPI();
  useEffect(() => {
    // api.getPatients
  }, {});
  return (
    <Sheet modal={false} defaultOpen={true} onOpenChange={closeDialog}>
      <SheetContent className="w-[600px]">
        <SheetHeader>
          <SheetTitle>Case : {caseObj?.id}</SheetTitle>
          <SheetDescription>Case Details</SheetDescription>
        </SheetHeader>
      </SheetContent>
    </Sheet>
  );
}
