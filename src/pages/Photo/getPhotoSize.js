const getPhotoSize = (props) => {
  const { isSuccessPhotoRequest } = props;
  if (window.document.getElementById('photo-container') && !isSuccessPhotoRequest) {
    const { widthPhoto, heightPhoto } = props;
    const photoContainerWidth = window.document.getElementById('photo-container').offsetWidth - 2;
    const allowHeight = window.document.documentElement.clientHeight - 147 - 53;
    console.log("111:", window.document.getElementById('photo-container').offsetWidth)
    // console.log("3: ", widthPhoto, ' x ', heightPhoto)
    // console.log("4: ", window.document.documentElement.clientHeight)
    // console.log("5: ", window.document.getElementById('photo-container').offsetWidth)
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
  console.log("222:")
  //console.log("2:", window.document.getElementById('photo-container').innerHTML)
  return { photoWidth: '300px', photoHeight: 'auto' };
};

export default getPhotoSize;
