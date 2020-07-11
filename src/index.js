const { registerBlockType } = wp.blocks;

console.log(wp.blocks);

registerBlockType("myguten-block/test-block", {
  title: "My block",
  icon: "smiley",
  category: "common",
  attributes: {
    content: {
      type: "array",
      source: "children",
      selector: "p",
    },
  },
  edit: (props) => {
    console.log("edot-props", props);
    return <div></div>;
  },
  save: (props) => <div>Hello World</div>,
});
