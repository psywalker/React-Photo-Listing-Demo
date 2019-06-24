// import React from 'react';
// import { LastLocationProvider } from 'react-router-last-location';
// import { BrowserRouter } from 'react-router-dom';
// import Enzyme, { shallow, mount } from 'enzyme';
// import Adapter from 'enzyme-adapter-react-16';
// import PhotoCard from '.';

// Enzyme.configure({ adapter: new Adapter() });

// describe('Test of component of PhotoCard', () => {
//   it('Test state PhotoCard dive props', () => {
//     const props = {
//       photoName: '',
//     };
//     const card = shallow(
//       <BrowserRouter>
//         <LastLocationProvider><PhotoCard {...props} /></LastLocationProvider>
//       </BrowserRouter>,
//     );
//     expect(typeof card.props().children.props.children.props.photoName).toEqual('string');
//   });

//   it('Test state PhotoCard props', () => {
//     const props = {
//       photoName: 'src',
//       photoID: '1',
//       userID: '1',
//     };
//     const card = mount(
//       <BrowserRouter>
//         <LastLocationProvider><PhotoCard {...props} /></LastLocationProvider>
//       </BrowserRouter>,
//     );
//     expect(card.find('.photo-card__img').prop('src')).toEqual('src');
//     expect(card.find('a.photo-card__photo-link').prop('href')).toEqual('/photo/1');
//     expect(card.find('a.photo-card-self__link-ava').prop('href')).toEqual('/users/1');
//   });

//   it('Test state PhotoCard booleans', () => {
//     const props1 = {
//       title: '11',
//       photoDesc: '11',
//       tags: [
//         {
//           title: '1',
//         },
//         {
//           title: '2',
//         },
//         {
//           title: '3',
//         },
//         {
//           title: '4',
//         },
//       ],
//     };

//     const card1 = mount(
//       <BrowserRouter>
//         <LastLocationProvider><PhotoCard {...props1} /></LastLocationProvider>
//       </BrowserRouter>,
//     );
//     expect(card1.find('a.photo-card-self__link-ava').length).toEqual(1);
//     expect(card1.find('.photo-card-self__desc').text()).toEqual('11');
//     expect(card1.find('Popover').length).toEqual(1);
//     const props2 = {
//       title: '',
//       photoDesc: '',
//       tags: [
//         {
//           title: '1',
//         },
//         {
//           title: '2',
//         },
//         {
//           title: '3',
//         },
//       ],
//     };

//     const card2 = mount(
//       <BrowserRouter>
//         <LastLocationProvider><PhotoCard {...props2} /></LastLocationProvider>
//       </BrowserRouter>,
//     );
//     expect(card2.find('a.photo-card-self__link-ava').length).toEqual(0);
//     expect(card2.find('.photo-card-self__desc').text()).toEqual('No Description');
//     expect(card2.find('Popover').length).toEqual(0);
//   });
//   it('Test snapshot PhotoCard component', () => {
//     const card = shallow(
//       <BrowserRouter>
//         <LastLocationProvider><PhotoCard /></LastLocationProvider>
//       </BrowserRouter>,
//     );
//     expect(card).toMatchSnapshot();
//   });
// });