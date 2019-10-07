const getPhotoSize = (props, containerWidth, windowHeight) => {
  const { isSuccessPhotoRequest } = props;
  if (!isSuccessPhotoRequest) {
    const { widthPhoto, heightPhoto } = props;
    const photoContainerWidth = containerWidth - 2;
    const allowHeight = windowHeight - 147 - 53;

    let w = 0;
    let h = 0;
    if (widthPhoto > heightPhoto) {
      w = Math.floor(widthPhoto / photoContainerWidth);
      h = Math.floor(heightPhoto / w);

      if (h > allowHeight) return { photoWidth: 'auto', photoHeight: `${allowHeight - 60}px` };
      return { photoWidth: 'auto', photoHeight: `${h - 60}px` };
    }
    if (heightPhoto > widthPhoto) {
      h = Math.floor(heightPhoto / allowHeight);
      w = Math.floor(widthPhoto / h);

      if (w > photoContainerWidth) return { photoWidth: `${photoContainerWidth - 60}px`, photoHeight: 'auto' };
      return { photoWidth: `${w - 60}px`, photoHeight: 'auto' };
    }
  }

  return { photoWidth: '300px', photoHeight: 'auto' };
};

export default getPhotoSize;
