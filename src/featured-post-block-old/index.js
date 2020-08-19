const { __ } = wp.i18n;
const { registerBlockType } = wp.blocks;
import saveBlock from "./save";
import editBlock from "./edit";

registerBlockType("amm-custom-block/featured-post-block-old", {
  title: __("Featured post old"),
  icon: "shield",
  category: "AMM",
  attributes: {
    content: {
      type: "array",
      source: "children",
      selector: "p",
      default: "Default text",
    },
    fields: {
      type: "string",
      default: "",
    },
    filter: {
      type: "boolean",
      default: true,
    },
    posts: {
      type: "string",
      default: "",
    },
    template: {
      type: "string",
      default: "default",
    },
  },
  edit: (props) => {
    // console.log('[edit] Rendering edit view, props:');
    // console.log(props);
    return editBlock(props);
  },
  save: (props) => {
    // console.log('[save] Rendering save view, props:');
    // console.log(props);
    return saveBlock(props);
  },
});
