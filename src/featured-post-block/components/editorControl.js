const { createElement } = wp.element;
import { RENDER_POSTS } from "../services";

const render = (props) => {
  return createElement(
    "div",
    {},
    createElement(
      "div",
      {},
      props.attributes.filter === true
        ? "Filter panel: yes"
        : "Filter panel: no"
    ),
    createElement(
      "div",
      {},
      RENDER_POSTS(
        props.attributes.posts,
        props.attributes.template,
        {
          title: true,
          excerpt: true,
          image: true,
        },
        createElement
      )
    )
  );
};

const editorControl = (props) => render(props);

export default editorControl;
