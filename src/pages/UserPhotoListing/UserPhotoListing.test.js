import React from 'react';
import Enzyme, { shallow, mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import UserPhotoListing from '.'; 
import Spinner from '../../components/Spinner';

Enzyme.configure({ adapter: new Adapter() });

describe('Test of component of UserPhotoListing', () => {
    it('Test display Pagination', () => { 
        const props = {
            userId: 'sC-BXbi9ajw'
        }

        const userPhotoListing = shallow(<UserPhotoListing {...props} />);

        userPhotoListing.setState({ 
            totalCards: 7,
          }); 

        expect(userPhotoListing.find('Pagination').length).toEqual(1);

        userPhotoListing.setState({ 
            totalCards: 5,
          }); 

        expect(userPhotoListing.find('Pagination').length).toEqual(0);
        //expect(userStatistic.find('.user-statistic__chart').at(1).prop('config')).toEqual(undefined);
    });  

    it('Test Spinner', () => { 
        const props = {
            userId: 'sC-BXbi9ajw'
        }

        const userPhotoListing = shallow(<UserPhotoListing {...props} />);
        
        
        userPhotoListing.setState({ 
          isListingLoading: false,
        }); 
        expect(userPhotoListing.find(Spinner).length).toEqual(0);
    
        userPhotoListing.setState({ 
          isListingLoading: true,
        }); 
    
        expect(userPhotoListing.find(Spinner).length).toEqual(1);
        
    });

    it('Test Snapshot', () => { 
        const props = {
            userId: 'sC-BXbi9ajw'
        }

        const userPhotoListing = shallow(<UserPhotoListing {...props} />);
        expect(userPhotoListing).toMatchSnapshot();
    });
});