// import React from 'react';
// import Enzyme, { shallow, mount } from 'enzyme';
// import Adapter from 'enzyme-adapter-react-16';
// import UserStatistic from '.';
// import Spinner from '../../components/Spinner';

// Enzyme.configure({ adapter: new Adapter() });

// describe('Test of component of UserStatistic', () => {
//   it('Test config in Highcharts', () => {
//     const props = {
//       userId: 'sC-BXbi9ajw',
//     };

//     const userStatistic = shallow(<UserStatistic {...props} />);

//     userStatistic.setState({
//       highchartsConfigs: {
//         highchartsDownloadsConfig: {},
//       },
//     });
//     expect(typeof userStatistic.find('.user-statistic__chart').at(0).prop('config')).toEqual('object');
//   });

//   it('Test Spinner', () => {
//     const props = {
//       userId: 'sC-BXbi9ajw',
//     };

//     const userStatistic = shallow(<UserStatistic {...props} />);
//     userStatistic.setState({
//       isListingLoading: false,
//     });
//     expect(userStatistic.find(Spinner).length).toEqual(0);

//     userStatistic.setState({
//       isListingLoading: true,
//     });

//     expect(userStatistic.find(Spinner).length).toEqual(1);
//   });

//   it('Test Snapshot', () => {
//     const props = {
//       userId: 'sC-BXbi9ajw',
//     };
//     const userStatistic = shallow(<UserStatistic {...props} />);
//     expect(userStatistic).toMatchSnapshot();
//   });
// });