const { createElement } = wp.element;
import { RENDER_POSTS } from "./services";

export default function saveBlock(props) {
  const { attributes } = props;

  return createElement(
    "div",
    { className: "get-posts-block-wrapper" },
    // createElement(
    //   "div",
    //   { className: "get-posts-block-filter" },
    //   attributes.filter === true ? "Filter panel: yes" : "Filter panel: no"
    // ),
    RENDER_POSTS(
      attributes.posts,
      attributes.template,
      {
        title: true,
        excerpt: true,
        image: true,
      },
      createElement
    )
  );
}
