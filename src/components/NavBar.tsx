export type Specimen = {
  name: string;
  label: string;
  src: string;
  selected?: boolean;
};

export default function NavBar({
  specimens,
  onSpecimenSelect,
  selectedSpecimen,
}: {
  specimens: Array<Specimen>;
  onSpecimenSelect: (specimen: Specimen) => void;
  selectedSpecimen: Specimen;
}): JSX.Element {
  return (
    <div className="nav">
      <div className="nav-title">Specimens</div>
      {specimens.map((specimen) => (
        <div
          key={specimen.name}
          className={
            selectedSpecimen.name === specimen.name
              ? "specimen selected"
              : "specimen"
          }
          onClick={() => onSpecimenSelect(specimen)}
        >
          {specimen.label}
        </div>
      ))}
    </div>
  );
}
