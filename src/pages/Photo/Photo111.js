// import React from 'react';

// import Enzyme, { shallow, mount } from 'enzyme';
// import Adapter from 'enzyme-adapter-react-16';
// import { Link, Route, BrowserRouter } from 'react-router-dom';
// import { LastLocationProvider } from 'react-router-last-location';
// import Photo from '.';
// import Spinner from '../../components/Spinner';

// Enzyme.configure({ adapter: new Adapter() });

// describe('Test of component of Photo', () => {
//   it('Test basis props in state', () => {
//     const props = {
//       match: {
//         params: {
//           id: 'sC-BXbi9ajw',
//         },
//       },
//     };

//     const photo = shallow(<Photo {...props} />);
//     photo.setState({
//       userName: 'User111',
//       userNic: 'url',
//       userPortfolioUrl: 'linkUrl',
//     });
//     expect(photo.find('.photo__autor-page-link').text()).toEqual("Autor's page link");
//     expect(photo.find('Link').prop('to')).toEqual("/users/url");
//     expect(photo.find('.photo__autor-link').prop('href')).toEqual("linkUrl");
//   });

//   it('Test Spinner', () => {
//     const props = {
//       match: {
//         params: {
//           id: 'sC-BXbi9ajw',
//         },
//       },
//     };

//     const photo = shallow(<Photo {...props} />);


//     photo.setState({
//       isListingLoading: false,
//     });
//     expect(photo.find(Spinner).length).toEqual(0);

//     photo.setState({
//       isListingLoading: true,
//     });

//     expect(photo.find(Spinner).length).toEqual(1);

//   });

//   it('Test Snapshot', () => {
//     const props = {
//       match: {
//         params: {
//           id: 'sC-BXbi9ajw',
//         },
//       },
//     };

//     const photo = shallow(<Photo {...props} />);
//     expect(photo).toMatchSnapshot();
//   });
// });
