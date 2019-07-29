const handleDowloadPhoto = (...rest) => {
  let newNamePhoto = 'image.jpg';
  if (rest.length) {
    for (let i = 0; i < rest.length; i += 1) {
      const el = rest[i];
      if (el) {
        newNamePhoto = el[0].toUpperCase() + el.slice(1).replace(/\s/g, '-');
        break;
      }
    }
  }
  return newNamePhoto;
};

export default handleDowloadPhoto;
