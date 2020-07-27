/**
 * WordPress Dependencies
 */
const { __ } = wp.i18n; // Import __() from wp.i18n
const { registerBlockType } = wp.blocks; // Import registerBlockType() from wp.blocks

/**
 * Internal Dependencies
 */
import Editor from "./editor";
import Render from "./render";

/**
 * Register slider block.
 */
registerBlockType("myguten-block/accordion-block", {
  title: __("Вопрос-ответ"),
  icon: "shield",
  category: "AMM",
  attributes: {
    anchor: {
      type: "string",
      default: "",
    },
    headerContent: {
      type: "array",
      source: "children",
      selector:
        ".wp-block-tomodomo-block-text-accordion .td-accordion__header p",
    },
    openByDefault: {
      type: "boolean",
      default: false,
    },
  },
  supports: {
    customClassName: false,
  },
  edit: Editor,
  save: Render,
});
