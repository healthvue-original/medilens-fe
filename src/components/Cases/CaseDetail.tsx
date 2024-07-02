import { Separator } from "@/components/ui/separator";
import { RxClock } from "react-icons/rx";
import { BsPersonLinesFill } from "react-icons/bs";
import { CgGenderFemale, CgGenderMale } from "react-icons/cg";
import { LuCake } from "react-icons/lu";
import { FaPhoneAlt } from "react-icons/fa";
import { MdOutlineContactMail } from "react-icons/md";
import { TbReportMedical } from "react-icons/tb";
import { PiExportBold } from "react-icons/pi";

import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { CaseModel, PatientModel } from "@/services/api/models";
import { LiaFileMedicalAltSolid } from "react-icons/lia";
import { Textarea } from "@/components/ui/textarea";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { dateFormatter } from "@/lib/utils";
import { Link, useRevalidator } from "react-router-dom";
import { api } from "@/services/api";

const GenderIcon: Record<string, JSX.Element> = {
  male: <CgGenderMale size={20} />,
  female: <CgGenderFemale />,
};

export default function CaseDetail({
  closeDialog,
  caseObj,
}: {
  closeDialog: () => void;
  caseObj?: CaseModel;
}): JSX.Element {
  const preventCloseOnRowClick = (e: PointerEvent) => {
    const target = e.target as Node;
    const table = document.querySelector("table");
    if (!table) {
      return;
    }
    if (table.contains(target)) {
      e.preventDefault();
    }
  };

  if (!caseObj || !caseObj.patient) {
    return <></>;
  }

  return (
    <Sheet modal={false} defaultOpen={true} onOpenChange={closeDialog}>
      <SheetContent
        // @ts-expect-error - no idea what the error is
        onPointerDownOutside={preventCloseOnRowClick}
        className="w-[800px] overflow-y-auto"
      >
        <div className="h-full flex flex-col">
          <SheetHeader className="mt-3">
            <div className="flex">
              <SheetTitle className="flex-1">
                Case ID : {caseObj?.id}
              </SheetTitle>
              <Link target={"_blank"} to={`/reports/cases/${caseObj.id}`}>
                <Button size={"sm"} className="flex gap-1 mr-4">
                  Export <PiExportBold size={18} />
                </Button>
              </Link>
            </div>
          </SheetHeader>
          <Separator className=" my-3" />
          <div className="flex-1 flex flex-col gap-8">
            <PatientDetail patient={caseObj.patient} />
            <CaseDetailCard caseObj={caseObj} />
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
}

function CaseDetailCard({ caseObj }: { caseObj: CaseModel }) {
  const [isEditingReport, setIsEditingReport] = useState(false);
  const [caseResult, setCaseResult] = useState(caseObj.result);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const revalidator = useRevalidator();

  useEffect(() => {
    setIsEditingReport(false);
    setIsSubmitting(false);
    setCaseResult(caseObj.result);
  }, [caseObj]);

  const saveCaseResult = async () => {
    setIsSubmitting(true);
    await api.updateCase({ ...caseObj, result: caseResult });
    setIsSubmitting(false);
    setIsEditingReport(false);
    revalidator.revalidate();
  };

  return (
    <div className="case-detail flex-1 flex flex-col gap-3 mt-4">
      <h3 className="flex items-center gap-1">
        <LiaFileMedicalAltSolid size={"24"} />
        <span>Case Details</span>
      </h3>
      <div className="description pl-7 flex flex-col gap-4 h-full">
        <div className="flex">
          <h3 className=" flex-1">{caseObj?.name}</h3>
          <p className="flex justify-center items-center gap-1 text-sm text-muted-foreground">
            <RxClock /> {dateFormatter.format(new Date(caseObj?.created_at))}
          </p>
        </div>
        <SheetDescription>{caseObj?.description}</SheetDescription>
        <div className="case-result flex-1 mt-6 flex flex-col gap-4 text-sm">
          <h3 className="flex items-center gap-2">
            <span>Report</span>
            <TbReportMedical size={"20"} />
          </h3>

          <Textarea
            value={caseResult}
            onChange={(e) => setCaseResult(e.target.value)}
            placeholder="Add report for this case"
            className=" h-[calc(100%-124px)]"
            disabled={!isEditingReport}
          />
          <SheetFooter>
            <div className="flex gap-3">
              <div className="flex-1"></div>
              <Button
                variant={"outline"}
                size="sm"
                onClick={() => setIsEditingReport(!isEditingReport)}
              >
                {isEditingReport ? "Cancel" : "Edit"}
              </Button>
              {isEditingReport && (
                <Button
                  name={"formType"}
                  value="saveCaseResult"
                  variant={"default"}
                  size="sm"
                  onClick={saveCaseResult}
                  loading={isSubmitting}
                  loadingText="Saving"
                >
                  Save
                </Button>
              )}
            </div>
          </SheetFooter>
        </div>
      </div>
    </div>
  );
}

function PatientDetail({ patient }: { patient: PatientModel }): JSX.Element {
  return (
    <div className="patient-detail">
      <div className="case-detail flex flex-col gap-3 mt-4">
        <h3 className="flex items-center gap-2 flex-1">
          <BsPersonLinesFill size={"20"} />
          <span>Patient Details</span>
        </h3>
        <div className="description pl-7 flex flex-col gap-4">
          <div className="flex">
            <h3 className=" flex-1">{patient?.name}</h3>
            <div className="flex items-center gap-5">
              <p className="flex items-center gap-1 text-sm text-muted-foreground">
                {GenderIcon[patient.sex]}
                <span className="">{patient.sex}</span>
              </p>
              <Separator orientation="vertical" />
              <p className="flex items-center gap-1 text-sm text-muted-foreground">
                <LuCake size={20} />
                <span className=" pt-1">{patient.age}</span>
              </p>
              <Separator orientation="vertical" />
              <p className="flex justify-center items-center gap-1 text-sm text-muted-foreground">
                <RxClock />{" "}
                {dateFormatter.format(new Date(patient?.created_at))}
              </p>
            </div>
          </div>
          <div>
            <div className="patient-contact flex">
              <div className="w-full flex flex-col gap-3">
                <p className=" w-full flex items-center gap-1 text-sm text-muted-foreground">
                  <FaPhoneAlt /> {patient.phone}
                </p>
                <p className=" w-full flex items-center gap-1 text-sm text-muted-foreground">
                  <MdOutlineContactMail size={20} /> {patient.email}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
