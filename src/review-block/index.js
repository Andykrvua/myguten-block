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
        imgQual: "maxresdefault",
        address: "Текст отзыва",
        title: "",
        text: "",
        mediaID: "",
        mediaAlt: "",
        mediaURL: "",
      });
      props.setAttributes({ locations });
    };

    const handleRemoveLocation = (index) => {
      const locations = [...props.attributes.locations];
      locations.splice(index, 1);
      props.setAttributes({ locations });
    };

    const handleimgQualOptionsChange = (imgQual, index) => {
      const locations = [...props.attributes.locations];
      locations[index].imgQual = imgQual;
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

    const handleTitleTextChange = (text, index) => {
      const locations = [...props.attributes.locations];
      locations[index].text = text;
      props.setAttributes({ locations });
    };

    const onSelectImage = (media, index) => {
      console.log(media);
      const locations = [...props.attributes.locations];
      locations[index].mediaURL = media.sizes.thumbnail.url;
      locations[index].mediaID = media.id;
      locations[index].mediaAlt = media.alt;
      props.setAttributes({ locations });
    };

    let locationFields, locationDisplay;

    const imgQualOptions = [
      { value: "default", label: __("default 120*90") },
      { value: "maxresdefault", label: __("max 1280*720") },
      { value: "hqdefault", label: __("hq 480*360") },
      { value: "mqdefault", label: __("mq 320*180") },
      { value: "sddefault", label: __("sd 640*480") },
    ];

    if (props.attributes.locations.length) {
      locationFields = props.attributes.locations.map((location, index) => {
        return (
          <Fragment key={index}>
            <TextareaControl
              placeholder="Отзыв"
              value={props.attributes.locations[index].address}
              onChange={(address) => handleLocationChange(address, index)}
            />
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
            <SelectControl
              label="Качество изображения"
              value={props.attributes.locations[index].imgQual}
              options={imgQualOptions}
              onChange={(imgQual) => handleimgQualOptionsChange(imgQual, index)}
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
              {/* <a className="" href={location.youtubeurl}></a> */}
              {location.mediaURL ? (
                <img src={location.mediaURL} alt={location.mediaAlt} />
              ) : (
                <img src="/wp-content/plugins/amm-custom-block/assets/man_review.png" />
              )}
              <div className="review-item-text">
                <span>{location.address}</span>
                {location.title ? (
                  <a href={location.title}>{location.text}</a>
                ) : (
                  ""
                )}
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
      </div>,
    ];
  },
  save: (props) => {
    const locationFields = props.attributes.locations.map((location, index) => {
      return (
        <li key={index} className="splide__slide">
          <div className="review-item">
            {/* <a className="" href={location.youtubeurl}></a> */}
            {location.mediaURL ? (
              <img src={location.mediaURL} alt={location.mediaAlt} />
            ) : (
              <img src="/wp-content/plugins/amm-custom-block/assets/man_review.png" />
            )}
            <div className="review-item-text">
              <span>{location.address}</span>
              {location.title ? (
                <a href={location.title}>{location.text}</a>
              ) : (
                ""
              )}
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
      </div>
    );
  },
});
