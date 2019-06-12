import React, { memo } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { Card } from 'antd';
import { Spinner } from '../../components';
import { photoRequestAction } from '../../actions';
import './photo.css';

const { Meta } = Card;
const Photo = memo(({
  match,
  photoRequestAction: handleAction,
  isPhotoLoading,
  requestError,
  photoSrc,
  photoDesc,
  userNic,
  userPortfolioUrl,
}) => {
  console.log("1:: ", match)

  handleAction(match);
  return (
    <div className="photo-container photo">
      { isPhotoLoading && (<Spinner className="spinner" />)}
      { !isPhotoLoading && !requestError && (
        <Card
          style={{ width: '100%' }}
          cover={(
            <img
              className="photo__img"
              alt="example"
              src={photoSrc}
            />
          )}
        >
          <Meta className="photo__desc" title={`${photoDesc || 'No title'}`} />
          <Link to={`/users/${userNic}`}>
            <p className="photo__autor-page-link">
              { 'Autor\'s page link' }
            </p>
          </Link>
          <a className="photo__autor-link" href={userPortfolioUrl}>{ 'Autor\'s portfolio link' }</a>
        </Card>
      )}
      { !isPhotoLoading && requestError && (
        <p>
          Такое фото не найдено.
          {' '}
          <Link to="/">
            Перейти на главную.
          </Link>
        </p>
      )}
    </div>
  );
});
// class Photo extends PureComponent {
//   componentDidMount = () => {
//     const { match, photoRequestAction: handleAction } = this.props;
//     handleAction(match);
//   };

//   render() {
//     const {
//       isPhotoLoading,
//       photoSrc,
//       userPortfolioUrl,
//       userNic,
//       photoDesc,
//       requestError,
//     } = this.props;

//     return (
//       <div className="photo-container photo">
//         { isPhotoLoading && (<Spinner className="spinner" />)}
//         { !isPhotoLoading && !requestError && (
//           <Card
//             style={{ width: '100%' }}
//             cover={(
//               <img
//                 className="photo__img"
//                 alt="example"
//                 src={photoSrc}
//               />
//             )}
//           >
//             <Meta className="photo__desc" title={`${photoDesc || 'No title'}`} />
//             <Link to={`/users/${userNic}`}>
//               <p className="photo__autor-page-link">
//                 { 'Autor\'s page link' }
//               </p>
//             </Link>
//             <a className="photo__autor-link" href={userPortfolioUrl}>{ 'Autor\'s portfolio link' }</a>
//           </Card>
//         )}
//         { !isPhotoLoading && requestError && (
//           <p>
//             Такое фото не найдено.
//             {' '}
//             <Link to="/">
//               Перейти на главную.
//             </Link>
//           </p>
//         )}
//       </div>
//     );
//   }
// }

Photo.propTypes = {
  photoRequestAction: PropTypes.func,
  isPhotoLoading: PropTypes.bool,
  photoSrc: PropTypes.string,
  userPortfolioUrl: PropTypes.string,
  userNic: PropTypes.string,
  photoDesc: PropTypes.string,
  requestError: PropTypes.bool,
  match: PropTypes.shape({
    prop: PropTypes.string,
  }),
  history: PropTypes.shape({
    prop: PropTypes.string,
  }),
};
Photo.defaultProps = {
  photoRequestAction: () => {},
  isPhotoLoading: true,
  photoSrc: null,
  userNic: 'UserNic',
  userPortfolioUrl: '',
  photoDesc: '',
  requestError: false,
  match: {},
  history: {},
};

const mapStateToProps = (state) => {
  const { photo } = state;
  return photo;
};

const mapDispatchToProps = ({
  photoRequestAction,
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Photo);
