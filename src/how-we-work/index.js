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
  PanelRow,
} = wp.components;
const { InspectorControls, MediaUpload } = wp.editor;
const { Fragment } = wp.element;

registerBlockType("amm-custom-block/how-we-work", {
  title: __("Как мы работаем"),
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
        title: "",
        text: "",
      });
      props.setAttributes({ locations });
    };

    const handleRemoveLocation = (index) => {
      const locations = [...props.attributes.locations];
      locations.splice(index, 1);
      props.setAttributes({ locations });
    };

    const handleTextChange = (text, index) => {
      const locations = [...props.attributes.locations];
      locations[index].text = text;
      props.setAttributes({ locations });
    };

    const handleTitleChange = (title, index) => {
      const locations = [...props.attributes.locations];
      locations[index].title = title;
      props.setAttributes({ locations });
    };

    let locationFields, locationDisplay;

    if (props.attributes.locations.length) {
      locationFields = props.attributes.locations.map((location, index) => {
        return (
          <Fragment key={index}>
            <TextControl
              placeholder="Тайтл"
              value={props.attributes.locations[index].title}
              onChange={(title) => handleTitleChange(title, index)}
            />
            <TextareaControl
              placeholder="Описание"
              value={props.attributes.locations[index].text}
              onChange={(text) => handleTextChange(text, index)}
            />
            <Button
              isDefault
              className="yt-block-del"
              label="Удалить блок"
              onClick={() => handleRemoveLocation(index)}
            >
              {__("Удалить блок")}
            </Button>
          </Fragment>
        );
      });

      locationDisplay = props.attributes.locations.map((location, index) => {
        return (
          <li key={index} className="splide__slide">
            <div className="how-we-work-item">
              <span className="how-we-work-item__number">{index + 1}</span>
              <span className="how-we-work-item___title">{location.title}</span>
              <p>{location.text}</p>
            </div>
          </li>
        );
      });
    }

    return [
      <InspectorControls key="1">
        <PanelBody title={__("Как мы работаем")}>
          {locationFields}
          <PanelRow>
            <Button isDefault isPrimary onClick={handleAddLocation.bind(this)}>
              {__("Добавить блок")}
            </Button>
          </PanelRow>
        </PanelBody>
      </InspectorControls>,
      <div key="2" className={props.className + " splide"}>
        <div className="splide__track">
          <ul className="splide__list">
            {locationDisplay ? locationDisplay : "Блок Как мы работаем"}
          </ul>
        </div>
      </div>,
    ];
  },
  save: (props) => {
    const locationFields = props.attributes.locations.map((location, index) => {
      return (
        <li key={index} className="splide__slide">
          <div className="how-we-work-item">
            <span className="how-we-work-item__number">{index + 1}</span>
            <span className="how-we-work-item__title">{location.title}</span>
            <p>{location.text}</p>
          </div>
        </li>
      );
    });

    return (
      <div className={props.className + " splide" + " how-we-work--slider"}>
        <div className="splide__track">
          <ul className="splide__list">{locationFields}</ul>
        </div>
      </div>
    );
  },
});
