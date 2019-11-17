const handleVisibleByScroll = (listener, events, funcs) => {
  events.forEach((event) => {
    funcs.forEach(func => window[listener](event, func));
  });
};

export default handleVisibleByScroll;
