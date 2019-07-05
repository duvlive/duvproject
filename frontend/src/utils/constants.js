export const SLIDESHOW_TYPE = {
  image: 'image',
  entertainers: 'entertainers',
  events: 'events'
};

export const randomItem = items =>
  items[Math.floor(Math.random() * items.length)];
