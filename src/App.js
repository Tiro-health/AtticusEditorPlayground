import Editor from "./Editor";
import "./styles.css";

export default function App() {
  return (
    <div className="App">
      <h1 className="leading-6 text-xl font-medium text-gray-800">
        Atticus Editor Playground
      </h1>
      <Editor className="lg:mx-24 md:mx-16 sm:mx-8 mx-2" />
    </div>
  );
}
