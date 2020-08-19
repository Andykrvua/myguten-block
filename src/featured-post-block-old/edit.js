// import filterControl from "./components/filterControl";
import postControl from "./components/postControl";
import templateControl from "./components/templateControl";
import editorControl from "./components/editorControl";

export default function editBlock(props) {
  /*
   * Onstart function
   */

  /*
   * Rendering part
   */

  /* Settings panel */
  const controls = [
    // filterControl(props),
    postControl(props),
    templateControl(props),
  ];

  /* Editor block */
  const editor = editorControl(props);

  /*
   * Initiation part
   */

  // onStart();
  return [controls, editor];
}
