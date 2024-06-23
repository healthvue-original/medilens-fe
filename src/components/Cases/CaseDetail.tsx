import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";

export default function CaseDetail({
  closeDialog,
}: {
  closeDialog: () => void;
}): JSX.Element {
  return (
    <Sheet modal={false} defaultOpen={true} onOpenChange={closeDialog}>
      <SheetContent className="w-[600px]">
        <SheetHeader>
          <SheetTitle>Are you absolutely sure?</SheetTitle>
          <SheetDescription>
            This action cannot be undone. This will permanently delete your
            account and remove your data from our servers.
          </SheetDescription>
        </SheetHeader>
      </SheetContent>
    </Sheet>
  );
}
