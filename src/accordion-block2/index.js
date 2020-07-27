import attributes from "./attributes";
import edit from "./edit";
import save from "./save";

const { __ } = wp.i18n;
const { registerBlockType } = wp.blocks;

registerBlockType("myguten-block/accordion-block2", {
  title: __("Accordion2", "accordion2"),
  icon: "shield",
  category: "AMM",
  attributes,
  edit,
  save,
});
