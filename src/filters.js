const filters = [
  {
    id: 1,
    defaultLabel: 'Popular',
    items: [
      { label: 'Latest', filterValue: 'order', labelValue: 'latest' },
      { label: 'Popular', filterValue: 'order', labelValue: 'popular' },
    ],
  },
  {
    id: 2,
    defaultLabel: 'Images',
    items: [
      { label: 'Images', filterValue: 'image_type', labelValue: 'all' },
      {
        label: 'Photos',
        filterValue: 'image_type',
        labelValue: 'photo',
        hasPadding: true,
      },
      {
        label: 'Vector graphics',
        filterValue: 'image_type',
        labelValue: 'vector',
        hasPadding: true,
      },
      {
        label: 'Illustrations',
        filterValue: 'image_type',
        labelValue: 'illustration',
        hasPadding: true,
      },
    ],
  },
  {
    id: 3,
    defaultLabel: 'Orientation ',
    items: [
      { label: 'Any orientation', filterValue: 'orientation', labelValue: 'all' },
      { label: 'Horizontal', filterValue: 'orientation', labelValue: 'horizontal' },
      { label: 'Vertical', filterValue: 'orientation', labelValue: 'vertical' },
    ],
  },
  {
    id: 4,
    defaultLabel: 'Category',
    items: [
      { label: 'All', filterValue: 'category', labelValue: 'all' },
      { label: 'Animals', filterValue: 'category', labelValue: 'animals' },
      { label: 'Architecture/Buildings', filterValue: 'category', labelValue: 'buildings' },
      { label: 'Backgrounds/Textures', filterValue: 'category', labelValue: 'backgrounds' },
      { label: 'Beauty/Fashion', filterValue: 'category', labelValue: 'fashion' },
      { label: 'Business/Finance', filterValue: 'category', labelValue: 'business' },
      { label: 'Computer/Communication', filterValue: 'category', labelValue: 'computer' },
      { label: 'Education', filterValue: 'category', labelValue: 'education' },
      { label: 'Emotions', filterValue: 'category', labelValue: 'feelings' },
      { label: 'Food/Drink', filterValue: 'category', labelValue: 'food' },
      { label: 'Health/Medical', filterValue: 'category', labelValue: 'health' },
      { label: 'Industry/Craft', filterValue: 'category', labelValue: 'industry' },
      { label: 'Music', filterValue: 'category', labelValue: 'music' },
      { label: 'Nature/Landscapes', filterValue: 'category', labelValue: 'nature' },
      { label: 'People', filterValue: 'category', labelValue: 'people' },
      { label: 'Places/Monuments', filterValue: 'category', labelValue: 'places' },
      { label: 'Religion', filterValue: 'category', labelValue: 'religion' },
      { label: 'Science/Technology', filterValue: 'category', labelValue: 'science' },
      { label: 'Sports', filterValue: 'category', labelValue: 'sports' },
      { label: 'Transportation/Traffic', filterValue: 'category', labelValue: 'transportation' },
      { label: 'Travel/Vacation', filterValue: 'category', labelValue: 'travel' },
    ],
  },
];

export default filters;
