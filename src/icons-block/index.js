//import './editor.scss';
//import './style.scss';
import iconset from "./icons.js";

const { __ } = wp.i18n;
const { registerBlockType } = wp.blocks;
const {
  Button,
  IconButton,
  PanelBody,
  TextControl,
  RadioControl,
  SelectControl,
  TextareaControl,
} = wp.components;
const { InspectorControls } = wp.editor;
const { Fragment } = wp.element;

registerBlockType("myguten-block/test-block2", {
  title: __("Блок иконок"),
  icon: "shield",
  category: "AMM",
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
        address: "Описание блока",
        icons: "car",
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

    const handleLocationIconsChange = (icons, index) => {
      const locations = [...props.attributes.locations];
      locations[index].icons = icons;
      props.setAttributes({ locations });
    };

    let locationFields, locationDisplay;

    if (props.attributes.locations.length) {
      locationFields = props.attributes.locations.map((location, index) => {
        return (
          <Fragment key={index}>
            <TextareaControl
              className="grf__location-address"
              placeholder="Описание блока"
              value={props.attributes.locations[index].address}
              onChange={(address) => handleLocationChange(address, index)}
            />
            <SelectControl
              label="Select Icon"
              value={props.attributes.locations[index].icons}
              options={[
                {
                  label: "car",
                  value: "car",
                },
                {
                  label: "soundcloud",
                  value: "soundcloud",
                },
                {
                  label: "tools",
                  value: "tools",
                },
                {
                  label: "app_store",
                  value: "app_store",
                },
                {
                  label: "volume_off",
                  value: "volume_off",
                },
                {
                  label: "file_audio",
                  value: "file_audio",
                },
              ]}
              onChange={(icons) => handleLocationIconsChange(icons, index)}
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
        return (
          <p key={index}>
            <span>{location.address}</span>
            <span>
              {(() => {
                switch (location.icons) {
                  case "car":
                    return iconset.car;
                  case "soundcloud":
                    return iconset.soundcloud;
                  case "tools":
                    return iconset.tools;
                  case "app_store":
                    return iconset.app_store;
                  case "volume_off":
                    return iconset.volume_off;
                  case "file_audio":
                    return iconset.file_audio;
                  default:
                    return null;
                }
              })()}
            </span>
          </p>
        );
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
      <span>Блок иконок</span>,
      <div key="2" className={props.className}>
        {locationDisplay}
      </div>,
    ];
  },
  save: (props) => {
    const locationFields = props.attributes.locations.map((location, index) => {
      return (
        <div className="post-desc__advant-item" key={index}>
          {(() => {
            switch (location.icons) {
              case "car":
                return iconset.car;
              case "soundcloud":
                return iconset.soundcloud;
              case "tools":
                return iconset.tools;
              case "app_store":
                return iconset.app_store;
              case "volume_off":
                return iconset.volume_off;
              case "file_audio":
                return iconset.file_audio;
              default:
                return null;
            }
          })()}
          <span className="post-desc__advant-span">{location.address}</span>
        </div>
      );
    });

    return (
      <div className={props.className + " post-desc__advant-wrap"}>
        {locationFields}
      </div>
    );
  },
});
