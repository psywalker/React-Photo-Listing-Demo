const handleDowloadPhoto = (...rest) => {
  let newNamePhoto = 'image.jpg';
  if (rest.length) {
    rest.every((el) => {
      if (el) {
        newNamePhoto = el[0].toUpperCase() + el.slice(1).replace(/\s/g, '-');
        return false;
      }
      return true;
    });
  }
  return newNamePhoto;
};

export default handleDowloadPhoto;
