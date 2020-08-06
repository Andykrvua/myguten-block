import iconset from "./icons.js";

const { __ } = wp.i18n;
const { registerBlockType } = wp.blocks;
const {
  Button,
  IconButton,
  PanelBody,
  TextControl,
  SelectControl,
  TextareaControl,
} = wp.components;
const { InspectorControls } = wp.editor;
const { Fragment } = wp.element;

registerBlockType("amm-custom-block/icons-block", {
  title: __("Блок иконок"),
  icon: "shield",
  category: "AMM",
  attributes: {
    locations: {
      type: "array",
      default: [],
    },
    padding_top: {
      type: "string",
      default: "0px",
    },
    padding_bottom: {
      type: "string",
      default: "0px",
    },
  },

  edit: (props) => {
    const handleAddLocation = () => {
      const locations = [...props.attributes.locations];
      locations.push({
        title: "Заголовок",
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

    const handleTitleChange = (title, index) => {
      const locations = [...props.attributes.locations];
      locations[index].title = title;
      props.setAttributes({ locations });
    };

    const handleLocationIconsChange = (icons, index) => {
      const locations = [...props.attributes.locations];
      locations[index].icons = icons;
      props.setAttributes({ locations });
    };

    const paddingTopChange = (padding_top) => {
      props.setAttributes({ padding_top });
    };

    const paddingBottomChange = (padding_bottom) => {
      props.setAttributes({ padding_bottom });
    };

    let locationFields, locationDisplay;
    let iconsSelectOptions = [];

    const paddingTopOptions = [
      { value: "0px", label: __("0px") },
      { value: "50px", label: __("50px") },
      { value: "100px", label: __("100px") },
    ];

    const paddingBottomOptions = [
      { value: "0px", label: __("0px") },
      { value: "50px", label: __("50px") },
      { value: "100px", label: __("100px") },
    ];

    Object.keys(iconset).forEach(function (key) {
      iconsSelectOptions.push({ value: key, label: key });
    });

    if (props.attributes.locations.length) {
      locationFields = props.attributes.locations.map((location, index) => {
        return (
          <Fragment key={index}>
            <TextControl
              placeholder="Заголовок"
              value={props.attributes.locations[index].title}
              onChange={(title) => handleTitleChange(title, index)}
            />
            <TextareaControl
              placeholder="Описание блока"
              value={props.attributes.locations[index].address}
              onChange={(address) => handleLocationChange(address, index)}
            />
            <SelectControl
              className="icons-block__select"
              label="Выберите иконку"
              value={props.attributes.locations[index].icons}
              options={iconsSelectOptions}
              onChange={(icons) => handleLocationIconsChange(icons, index)}
            />
            <IconButton
              className="icons-block__remove-item"
              icon="no-alt"
              label="Удалить иконку"
              onClick={() => handleRemoveLocation(index)}
            />
          </Fragment>
        );
      });

      locationDisplay = props.attributes.locations.map((location, index) => {
        return (
          <div key={index} className="post-desc__advant-item">
            {(() => {
              return iconset[props.attributes.locations[index].icons];
            })()}
            <span className="post-desc__advant-span">{location.title}</span>
            <span className="post-desc__advant-span">{location.address}</span>
          </div>
        );
      });
    }

    return [
      <InspectorControls key="1">
        <PanelBody title={__("Иконки")}>
          <SelectControl
            label={__("Отступ сверху")}
            options={paddingTopOptions}
            value={props.attributes.padding_top}
            onChange={(padding_top) => paddingTopChange(padding_top)}
          />
          <SelectControl
            label={__("Отступ снизу")}
            options={paddingBottomOptions}
            value={props.attributes.padding_bottom}
            onChange={(padding_bottom) => paddingBottomChange(padding_bottom)}
          />
          {locationFields}
          <Button isDefault onClick={handleAddLocation.bind(this)}>
            {__("Добавить иконку")}
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
            return iconset[props.attributes.locations[index].icons];
          })()}
          <span className="post-desc__advant-span">{location.title}</span>
          <span className="post-desc__advant-span">{location.address}</span>
        </div>
      );
    });

    return (
      <div
        className={props.className + " post-desc__advant-wrap"}
        style={
          props.attributes.padding_top === "0px" &&
          props.attributes.padding_bottom === "0px"
            ? ""
            : {
                paddingTop: props.attributes.padding_top,
                paddingBottom: props.attributes.padding_bottom,
              }
        }
      >
        {locationFields}
      </div>
    );
  },
});
