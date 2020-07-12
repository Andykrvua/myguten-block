//import './editor.scss';
//import './style.scss';

const { __ } = wp.i18n;
const { registerBlockType } = wp.blocks;
const { Button, IconButton, PanelBody, TextControl } = wp.components;
const { InspectorControls } = wp.editor;
const { Fragment } = wp.element;

registerBlockType("myguten-block/test-block2", {
  title: __("Блок иконок"),
  icon: "shield",
  category: "common",
  attributes: {
    locations: {
      type: "array",
      default: [],
    },
  },

  edit: (props) => {
    const handleAddLocation = () => {
      const locations = [...props.attributes.locations];
      locations.push({
        address: "",
      });
      props.setAttributes({ locations });
    };

    const handleRemoveLocation = (index) => {
      const locations = [...props.attributes.locations];
      locations.splice(index, 1);
      props.setAttributes({ locations });
    };

    const handleLocationChange = (address, index) => {
      const locations = [...props.attributes.locations];
      locations[index].address = address;
      props.setAttributes({ locations });
    };

    let locationFields, locationDisplay;

    if (props.attributes.locations.length) {
      locationFields = props.attributes.locations.map((location, index) => {
        return (
          <Fragment key={index}>
            <TextControl
              className="grf__location-address"
              placeholder="Описание блока"
              value={props.attributes.locations[index].address}
              onChange={(address) => handleLocationChange(address, index)}
            />
            <IconButton
              className="grf__remove-location-address"
              icon="no-alt"
              label="Delete icon block"
              onClick={() => handleRemoveLocation(index)}
            />
          </Fragment>
        );
      });

      locationDisplay = props.attributes.locations.map((location, index) => {
        return <p key={index}>{location.address}</p>;
      });
    }

    return [
      <InspectorControls key="1">
        <PanelBody title={__("Иконки")}>
          {locationFields}
          <Button isDefault onClick={handleAddLocation.bind(this)}>
            {__("Add Icon block")}
          </Button>
        </PanelBody>
      </InspectorControls>,
      <div key="2" className={props.className}>
        <h2>Block</h2>
        {locationDisplay}
      </div>,
    ];
  },
  save: (props) => {
    const locationFields = props.attributes.locations.map((location, index) => {
      return <p key={index}>{location.address}</p>;
    });

    return (
      <div className={props.className}>
        <h2>Block</h2>
        {locationFields}
      </div>
    );
  },
});
