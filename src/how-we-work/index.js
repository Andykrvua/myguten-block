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

registerBlockType("amm-custom-block/how-we-work", {
  title: __("Как мы работаем"),
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

    const paddingTopChange = (padding_top) => {
      props.setAttributes({ padding_top });
    };

    const paddingBottomChange = (padding_bottom) => {
      props.setAttributes({ padding_bottom });
    };

    let locationFields, locationDisplay;

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
            <IconButton
              className="how-we-work__remove-item"
              icon="no-alt"
              label="Удалить блок"
              onClick={() => handleRemoveLocation(index)}
            />
          </Fragment>
        );
      });

      locationDisplay = props.attributes.locations.map((location, index) => {
        return (
          <li key={index} className="how-we-work__item">
            <span className="how-we-work__number">{index + 1}</span>
            <span className="how-we-work__title">{location.title}</span>
            <span className="how-we-work__desc">{location.address}</span>
          </li>
        );
      });
    }

    return [
      <InspectorControls key="1">
        <PanelBody title={__("Блоки")}>
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
            {__("Добавить блок")}
          </Button>
        </PanelBody>
      </InspectorControls>,
      <span>Как мы работаем</span>,
      <div key="2" className={props.className + " how-we-work__wrap"}>
        <ol>{locationDisplay}</ol>
      </div>,
    ];
  },
  save: (props) => {
    const locationFields = props.attributes.locations.map((location, index) => {
      return (
        <li className="how-we-work__item" key={index}>
          <span className="how-we-work__number">{index + 1}</span>
          <span className="how-we-work__title">{location.title}</span>
          <span className="how-we-work__desc">{location.address}</span>
        </li>
      );
    });

    return (
      <div
        className={props.className + " how-we-work__wrap"}
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
        <h2 className="font-28px post-desc__subtitle">Как мы работаем</h2>
        <ol>{locationFields}</ol>
      </div>
    );
  },
});
