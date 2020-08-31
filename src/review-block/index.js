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
  DatePicker,
  CheckboxControl,
} = wp.components;
const { InspectorControls, MediaUpload } = wp.editor;
const { Fragment } = wp.element;

registerBlockType("amm-custom-block/review-block", {
  title: __("Отзывы"),
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
        youtubeurl: "url",
        videoID: "videoID",
        address: "Текст отзыва",
        title: "",
        text: "",
        mediaID: "",
        mediaAlt: "",
        mediaURL: "",
        name: "",
        date: "",
        isChecked: false,
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

    const handleDateChange = (date, index) => {
      const locations = [...props.attributes.locations];
      // locations[index].date = date;
      locations[index].date = moment(date).format("YYYY-MM-DD");
      props.setAttributes({ locations });
    };

    const handleTitleChange = (title, index) => {
      const locations = [...props.attributes.locations];
      locations[index].title = title;
      props.setAttributes({ locations });
    };

    const handleNameChange = (name, index) => {
      const locations = [...props.attributes.locations];
      locations[index].name = name;
      props.setAttributes({ locations });
    };

    const handleTitleTextChange = (text, index) => {
      const locations = [...props.attributes.locations];
      locations[index].text = text;
      props.setAttributes({ locations });
    };

    const handleCheckedChange = (val, index) => {
      const locations = [...props.attributes.locations];
      locations[index].isChecked = val;
      props.setAttributes({ locations });
    };

    const onSelectImage = (media, index) => {
      console.log(media);
      const locations = [...props.attributes.locations];
      // locations[index].mediaURL = media.sizes.thumbnail.url;
      locations[index].mediaURL = media.url;
      locations[index].mediaID = media.id;
      locations[index].mediaAlt = media.alt;
      props.setAttributes({ locations });
    };

    let newDate = moment(new Date()).format("YYYY-MM-DD");

    let locationFields, locationDisplay;

    if (props.attributes.locations.length) {
      locationFields = props.attributes.locations.map((location, index) => {
        return (
          <Fragment key={index}>
            <TextControl
              placeholder="Имя"
              value={props.attributes.locations[index].name}
              onChange={(name) => handleNameChange(name, index)}
            />
            <TextareaControl
              placeholder="Отзыв"
              value={props.attributes.locations[index].address}
              onChange={(address) => handleLocationChange(address, index)}
            />
            <CheckboxControl
              label="Показать дату?"
              checked={props.attributes.locations[index].isChecked}
              onChange={(val) => handleCheckedChange(val, index)}
            />
            {props.attributes.locations[index].isChecked ? (
              <DatePicker
                currentDate={newDate}
                onChange={(date) => handleDateChange(date, index)}
              />
            ) : (
              ""
            )}
            <TextControl
              placeholder="Источник отзыва (ссылка)"
              value={props.attributes.locations[index].title}
              onChange={(title) => handleTitleChange(title, index)}
            />
            <TextControl
              placeholder="Текст ссылки"
              value={props.attributes.locations[index].text}
              onChange={(text) => handleTitleTextChange(text, index)}
            />
            <MediaUpload
              onSelect={(media) => onSelectImage(media, index)}
              type="image"
              value={props.attributes.locations[index].mediaID}
              render={({ open }) => (
                <Button
                  className={
                    props.attributes.locations[index].mediaID != ""
                      ? "image-button"
                      : "is-button is-default"
                  }
                  onClick={open}
                >
                  {!props.attributes.locations[index].mediaID != "" ? (
                    __("Выбрать изображение")
                  ) : (
                    <img src={props.attributes.locations[index].mediaURL} />
                  )}
                </Button>
              )}
            />
            <Button
              isDefault
              className="yt-block-del"
              label="Удалить Отзыв"
              onClick={() => handleRemoveLocation(index)}
            >
              {__("Удалить отзыв")}
            </Button>
          </Fragment>
        );
      });

      locationDisplay = props.attributes.locations.map((location, index) => {
        return (
          <li key={index} className="splide__slide">
            <div className="review-item">
              {location.mediaURL ? (
                <img src={location.mediaURL} alt={location.mediaAlt} />
              ) : (
                <img src="/wp-content/plugins/amm-custom-block/assets/man_review.png" />
              )}
              <div className="review-item-text">
                {location.name ? (
                  <span className="review-name">{location.name}</span>
                ) : (
                  <span className="review-name">Самый счастливый клиент</span>
                )}
                <span>{location.address}</span>
                <div className="review-date__link">
                  {location.title ? (
                    <a href={location.title}>{location.text}</a>
                  ) : (
                    ""
                  )}
                  {location.isChecked ? <span>{location.date}</span> : ""}
                </div>
              </div>
            </div>
          </li>
        );
      });
    }

    return [
      <InspectorControls key="1">
        <PanelBody title={__("Карусель отзывов")}>
          {locationFields}
          <PanelRow>
            <Button isDefault isPrimary onClick={handleAddLocation.bind(this)}>
              {__("Добавить отзыв")}
            </Button>
          </PanelRow>
        </PanelBody>
      </InspectorControls>,
      <div key="2" className={props.className + " splide"}>
        <div className="splide__track">
          <ul className="splide__list">
            {locationDisplay ? locationDisplay : "Карусель отзывов"}
          </ul>
        </div>
        <div className="splide__hand">
          <img src="/wp-content/plugins/amm-custom-block/assets/hand.svg" />
        </div>
      </div>,
    ];
  },
  save: (props) => {
    const locationFields = props.attributes.locations.map((location, index) => {
      return (
        <li key={index} className="splide__slide">
          <div className="review-item">
            {location.mediaURL ? (
              <img src={location.mediaURL} alt={location.mediaAlt} />
            ) : (
              <img src="/wp-content/plugins/amm-custom-block/assets/man_review.png" />
            )}
            <div className="review-item-text">
              {location.name ? (
                <span className="review-name">{location.name}</span>
              ) : (
                <span className="review-name">Самый счастливый клиент</span>
              )}
              <span>{location.address}</span>
              <div className="review-date__link">
                {location.title ? (
                  <a href={location.title}>{location.text}</a>
                ) : (
                  ""
                )}
                {location.isChecked ? <span>{location.date}</span> : ""}
              </div>
            </div>
          </div>
        </li>
      );
    });

    return (
      <div className={props.className + " splide" + " review--slider"}>
        <div className="splide__track">
          <ul className="splide__list">{locationFields}</ul>
        </div>
        <div className="splide__hand">
          <img src="/wp-content/plugins/amm-custom-block/assets/hand.svg" />
        </div>
      </div>
    );
  },
});
