import attributes from "./attributes";
import edit from "./edit";
import save from "./save";

const { __ } = wp.i18n;
const { registerBlockType } = wp.blocks;

registerBlockType("amm-custom-block/accordion-block", {
  title: __("Вопрос-ответ"),
  icon: "shield",
  category: "AMM",
  attributes,
  edit,
  save,
});
