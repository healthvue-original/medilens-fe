import useEditor from "./useEditor";

export default function SpecimenView(): JSX.Element {
  const editor = useEditor({
    containerId: "osd-container",
    specimensList: [
      {
        name: "Specimen 1",
        label: "Specimen 1",
        src: "http://localhost:8081/output/sample-specimen.dzi.dzi",
      },
    ],
  });
  return (
    <div className="h-full flex">
      <div id="osd-container" className="flex-1 p-20"></div>
      <div className="w-[300px] border-l-2 border-secondary"></div>
    </div>
  );
}
