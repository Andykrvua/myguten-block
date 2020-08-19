const { createElement } = wp.element;

/* JSON and Array transformations */
export const SET_POSTS = (JSONstr) => JSON.stringify(JSONstr);
export const GET_POSTS = (JSONstr) =>
  JSONstr === "" ? [] : JSON.parse(JSONstr);

/* HTTP client in synchronous mode */
export const HTTP_CLIENT = (url) => {
  const xmlHttp = new XMLHttpRequest();
  xmlHttp.open("GET", url, false); // false for synchronous request
  xmlHttp.send(null);
  if (xmlHttp.responseText) {
    return JSON.parse(xmlHttp.responseText);
  }
  return false;
};

/* Render post template */
export const RENDER_TEMPLATE = (post, template, fields) => {
  // console.log(post);

  const postImageStyle = () => {
    return post.mediaUrl.length > 0
      ? { backgroundImage: `url('${post.mediaUrl}')` }
      : {
          backgroundImage: `url("/wp-content/plugins/get-posts-block/images/no-article-logo.png")`,
        };
  };

  return createElement(
    "div",
    {
      className: "get-posts-block-card-body",
    },
    createElement(
      "a",
      {
        href: post.link,
      },
      createElement("div", {
        className: "get-posts-block-post-image",
        style: postImageStyle(),
      })
    ),
    createElement(
      "div",
      {
        className: "get-posts-block-content-body",
      },
      createElement(
        "a",
        {
          className: "get-posts-block-a-container",
          href: post.link,
        },
        createElement(
          "div",
          {
            className: "get-posts-block-content-container",
          },
          createElement(
            "div",
            {
              className: "get-posts-block-content-title",
            },
            post.title
          ),
          createElement(
            "small",
            {
              className: "get-posts-block-content-excerpt",
            },
            `${post.excerpt.replace(/<[^>]*>?/gm, "")}...`
          )
        )
      )
    )
  );
};

const SELECTED_POSTS = (attributePosts) => {
  return GET_POSTS(attributePosts).filter((post) => post.selected === true);
};

export const COUNT_POSTS_SELECTED = (attributePosts) => {
  return SELECTED_POSTS(attributePosts).length;
};

/* Render post elements inside block in editor */
export const RENDER_POSTS = (attributePosts, template, fields) => {
  // console.log('[RENDER_POSTS] Rendering posts elements');
  const selectedPostsElements = [];

  if (COUNT_POSTS_SELECTED(attributePosts)) {
    SELECTED_POSTS(attributePosts).forEach((post) => {
      selectedPostsElements.push(RENDER_TEMPLATE(post, template, fields));
    });
    return selectedPostsElements;
  }
  return false;
};
