import "./App.css";
import NavBar from "./components/NavBar";
import { Specimens } from "./constants";
import Comments from "./components/Comments";
import useEditor from "./components/useEditor";

function App(): JSX.Element {
  const { currentSpecimen, onSpecimenSelect, comments, onCommentClick } =
    useEditor({
      specimensList: Specimens,
      containerId: "osd-container",
    });

  return (
    <div className="main">
      <NavBar
        specimens={Specimens}
        onSpecimenSelect={onSpecimenSelect}
        selectedSpecimen={currentSpecimen}
      />
      <div className="editor">
        <div id="osd-container"></div>
      </div>
      <Comments comments={comments} onCommentClick={onCommentClick} />
    </div>
  );
}

export default App;
