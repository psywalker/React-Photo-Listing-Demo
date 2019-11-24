  //     this.state = {
  //     profilePhotoUrl: '',
  //     profileName: '',
  //     prifileEmail: '',
  //   };

  //       const {
  //     profilePhotoUrl,
  //     profileName,
  //     prifileEmail,
  //   } = this.state;
  
  
  // componentDidMount = () => {
  //   const { loginFlag } = this.props;
  //   console.log("--1::: ", loginFlag)
  //   if (!loginFlag) {
  //   console.log("0::: ", loginFlag)
  //    this.handleAuthorizationRequest();
  //   }
  // };

  // handleAuthorizationRequest = () => {
  //   const { handleLogin, loginFlag } = this.props;
  //   const tokenFirst = localStorage.getItem('token');

  //   console.log("1::: ", loginFlag, tokenFirst)

  //   if (tokenFirst) {
  //     const headers = {
  //       Authorization: `Bearer ${tokenFirst}`,
  //     };

  //     axios.get(`${process.env.REACT_APP_PROFILE}/me`, { headers }).then((res) => {
  //       const profilePhotoUrl = res.data.profile_image.small;
  //       const profileName = res.data.name;
  //       const prifileEmail = res.data.email;


  //       console.log("2::: ", profilePhotoUrl, profileName)
  //       this.setState({
  //         profilePhotoUrl,
  //         profileName,
  //         prifileEmail,
  //       }, () => { 
  //         if(!loginFlag) handleLogin();
  //         let { profilePhotoUrl, profileName } = this.state;
  //         console.log("4::: ", profilePhotoUrl, profileName)
  //       });
        
  //     })
  //       .catch(() => {
  //         console.log('2: Запрос с токкеном НЕудачный::: ', 'pixabay API not responding');
  //       });
  //   } else {
  //     const code = document.location.search.split('?code=');

  //     if (code) {
  //       axios.post('https://unsplash.com/oauth/token', {
  //         redirect_uri: process.env.REACT_APP_UNSPLASH_API_REDIRECT_URI,
  //         client_secret: process.env.REACT_APP_UNSPLASH_API_CLIENT_SECRET,
  //         code: code[1],
  //         grant_type: 'authorization_code',
  //         client_id: process.env.REACT_APP_UNSPLASH_API_KEY,
  //       }).then((res) => {
  //         const token = res.data.access_token;
  //         localStorage.clear();
  //         localStorage.setItem('token', token);

  //         if (token) {
  //           const headers = {
  //             Authorization: `Bearer ${token}`,
  //           };
    
  //           axios.get(`${process.env.REACT_APP_PROFILE}/me`, { headers }).then((res) => {
  //             const profilePhotoUrl = res.data.profile_image.small;
  //             const profileName = res.data.name;
  //             const prifileEmail = res.data.email;
    
  //             this.setState({
  //               profilePhotoUrl,
  //               profileName,
  //               prifileEmail,
  //             }, () => { if(!loginFlag) handleLogin()});
  //           })
  //             .catch(() => {
  //               console.log('2: Запрос с токкеном НЕудачный::: ', 'pixabay API not responding');
  //             });
  //         }
  //       })
  //         .catch(() => {
  //           console.log('3: Запрос без токкена (начальный) НЕудачный:::  ', 'pixabay API not responding');
  //         });
  //     } else {
  //       console.log('4: Предложить авторизацию');
  //       /* здесь позже код напишу, пока надо разобраться с кодом выше */
  //     }
  //   }
  // }

  // handleLoguot = () => {
  //   const { history, handleLogin } = this.props;
  //   localStorage.clear();
  //   //handleLogin(false);
  //   history.push('/');
    
  // };

  /* 
    Tests `login` saga
  */
 // describe('`fetchLoginData` saga test', () => {
  //   it('`fetchLoginData` with `token`', () => {
  //     const gen = fetchLoginData(token);
  //     const headers = {
  //       Authorization: `Bearer ${token}`,
  //     };
  //     expect(gen.next().value).toEqual(call(axios.get, URL_FOR_PROFILE_ME, { headers }));
  //     expect(gen.next(dataForProps).value).toEqual(put({ type: 'LOGIN_SUCCESS', dataForProps }));
  //     expect(gen.next()).toEqual({ done: true, value: undefined });
  //   });
  //   it('`fetchLoginData` without `token`', () => {
  //     const tokenEmpty = 'undefined';
  //     const headers = {
  //       Authorization: `Bearer ${tokenEmpty}`,
  //     };
  //     const gen = fetchLoginData();
  //     expect(gen.next().value).toEqual(call(axios.get, URL_FOR_PROFILE_ME, { headers }));
  //     expect(gen.next().value).toEqual(put({ type: 'LOGIN_ERROR' }));
  //     expect(gen.next()).toEqual({ done: true, value: undefined });
  //   });
  // });

  // describe('`loginAfterToken` saga test', () => {
  //   it('`loginAfterToken` with `token`', () => {
  //     const gen = loginAfterToken(token);
  //     expect(gen.next().value).toEqual(call(fetchLoginData, token));
  //     expect(gen.next()).toEqual({ done: true, value: undefined });
  //   });
  //   it('`fetchLoginData` without `token`', () => {
  //     const gen = loginAfterToken();
  //     expect(gen.next().value).toEqual(put({ type: 'LOGIN_ERROR' }));
  //     expect(gen.next()).toEqual({ done: true, value: undefined });
  //   });
  // });

  // describe('`fetchLoginForTokenData` saga test', () => {
  //   it('`fetchLoginForTokenData` with `code`', () => {
  //     const gen = fetchLoginForTokenData(code);
  //     expect(gen.next().value).toEqual(call(axios.post, axiosRequestForToken.url, axiosRequestForToken.body));
  //   });
  //   it('`fetchLoginForTokenData` without `code`', () => {
  //     const gen = fetchLoginForTokenData();

  //   });
  // });

// describe('Test of saga `login`', () => {
//   const axiosRequestForToken = {
//     url: URL_FOR_TOKEN,
//     body: {
//       redirect_uri: process.env.REACT_APP_UNSPLASH_API_REDIRECT_URI,
//       client_secret: process.env.REACT_APP_UNSPLASH_API_CLIENT_SECRET,
//       code: 'd3b75c4fdb173c3058a8f1aa80dff6b89b59bf4231cb4183a178edd0c4275c0d',
//       grant_type: 'authorization_code',
//       client_id: process.env.REACT_APP_UNSPLASH_API_KEY,
//     },
//   };
//   describe('loginAfterToken Saga test`', () => {
//     it('loginAfterToken Saga test Passed', () => {
//       const mockResponse = { profileEmail: 'email@email.com' };
//       const gen = loginAfterToken('tokken');
//       expect(gen.next().value).toEqual(call(fetchLoginData));
//       expect(gen.next(mockResponse).value).toEqual(put({ type: 'LOGIN_SUCCESS', dataForProps: mockResponse }));
//       expect(gen.next()).toEqual({ done: true, value: undefined });
//     });

//     it('loginAfterToken Saga test Failed 1', () => {
//       const gen = loginAfterToken('tokken');
//       gen.next();
//       expect(gen.throw('product not found').value).toEqual(put({ type: 'LOGIN_ERROR' }));
//     });

//     it('loginAfterToken Saga test Failed 2', () => {
//       try {
//         const func = () => new Error('ответ не найден в моей базе данных');
//         const gen = loginAfterToken('tokken');
//         expect(gen.next().value).toEqual(call(fetchLoginData));
//         gen.next(func());
//       } catch (error) {
//         expect(error).toEqual(put({ type: 'LOGIN_ERROR' }));
//       }
//     });

//     it('loginAfterToken Saga test Failed 3', () => {
//       const gen = loginAfterToken();
//       expect(gen.next().value).toEqual(put({ type: 'LOGIN_ERROR' }));
//     });
//   });

//   describe('loginSaga Saga test`', () => {
//     it('loginSaga Saga test', () => {
//       // const token = '34uukj4349834983';
//       // const action = {
//       //   location: {
//       //     search: '?code=d3b75c4fdb173c3058a8f1aa80dff6b89b59bf4231cb4183a178edd0c4275c0d',
//       //   },
//       // };
//       // const gen = loginSaga(action);
//       // expect(gen.next().value).toEqual(call(fetchLoginForTokenData));
//       // expect(gen.next(token).value).toEqual(call(loginAfterToken, token));

//     });

//     it('loginSaga Saga test tokenFirst and `call(loginAfterToken, tokenFirst)`: Passed', () => {
//     //   const token = '34uukj4349834983';
//     //   window.localStorage.setItem('token', token);
//     //   const action = {
//     //     location: {
//     //       search: '?code=d3b75c4fdb173c3058a8f1aa80dff6b89b59bf4231cb4183a178edd0c4275c0d',
//     //     },
//     //   };
//     //   const gen = loginSaga(action);
//     //   expect(gen.next().value).toEqual(call(loginAfterToken, token));
//     // });
//   });

//   describe('fetchLoginForTokenData Saga test`', () => {
//     // it('fetchLoginForTokenData Saga test', () => {
//     //   const gen = fetchLoginForTokenData();
//     //   const token = '34uukj4349834983';
//     //   expect(gen.next().value).toEqual(call(axios.post, axiosRequestForToken.url, axiosRequestForToken.body));
//     //   expect(gen.next(token).value).toEqual(call(get, token, 'data.access_token', false));
//     // });
//   });
// });


// Redux-saga - userstatistic.js
// import axios from 'axios';
// import moment from 'moment';
// import 'moment-timezone';
// import { put, call, delay } from 'redux-saga/effects';
// import get from 'lodash/get';
// import { URL_FOR_USER_STATISTIC } from '../constants';

// function* fetchSaga(userId) {
//   try {
//     const responce = yield call(axios.get, URL_FOR_USER_STATISTIC(userId), {
//       params: {
//         client_id: process.env.REACT_APP_UNSPLASH_API_KEY,
//       },
//     });

//     const chartData = [
//       get(responce, 'data.downloads.historical.values', []),
//       get(responce, 'data.views.historical.values', []),
//       get(responce, 'data.likes.historical.values', []),
//     ].map(config => ({
//       dates: config.map(item => moment(item.date).format('DD MMMM YYYY')),
//       values: config.map(item => item.value),
//     }));

//     yield put({ type: 'USER_STATISTIC_REQUEST_SUCCESS', chartData });
//   } catch (error) {
//     yield put({ type: 'USER_STATISTIC_REQUEST_ERROR', error });
//   }
// }

// function* fetchSagaPeriodically(userId) {
//   // while (true) {
//   //   yield call(() => fetchSaga(userId));
//   //   yield delay(2000);
//   // }
//   yield call(() => fetchSaga(userId));
// }

// export default function* userStatisticRequestSaga(action) {
//   const { userId } = action;
//   if (userId) {
//     yield call(() => fetchSagaPeriodically(userId));
//   } else {
//     yield put({ type: 'USER_STATISTIC_REQUEST_ERROR' });
//   }
// }

// export default function* userStatisticRequestSaga(action) {
//   const { userId } = action;
//   if (userId) {
//     try {
//       function* getRes(userId) {
//         while (true) {
//           yield axios.get(URL_FOR_USER_STATISTIC(userId), {
//             params: {
//               client_id: process.env.REACT_APP_UNSPLASH_API_KEY,
//             },
//           });
//         }
//       }
//       function* putRes(chartData) {
//         console.log("1: ", chartData);
//         yield put({ type: 'USER_STATISTIC_REQUEST_SUCCESS', chartData });
//       }
//       function fetchChartData(userId, generator) {
//         const gen = generator || getRes(userId);
//         const responce = gen.next();
//         responce.value.then((res) => {
//           const chartData = [
//             get(res, 'data.downloads.historical.values', []),
//             get(res, 'data.views.historical.values', []),
//             get(res, 'data.likes.historical.values', []),
//           ].map(config => ({
//             dates: config.map(item => moment(item.date).format('DD MMMM YYYY')),
//             values: config.map(item => item.value),
//           }));

//           putRes(chartData);
          
//           //setTimeout(() => fetchChartData(userId, gen), 2000);
//         });
//       }
      
//       fetchChartData(userId);
//       // const axiosRequestUserStatistic = {
//       //   url: URL_FOR_USER_STATISTIC(userId),
//       //   params: {
//       //     client_id: process.env.REACT_APP_UNSPLASH_API_KEY,
//       //   },
//       // };
//       // const responce = yield axios.get(axiosRequestUserStatistic.url, {
//       //   params: axiosRequestUserStatistic.params,
//       // });

//       // const chartData = [
//       //   get(responce, 'data.downloads.historical.values', []),
//       //   get(responce, 'data.views.historical.values', []),
//       //   get(responce, 'data.likes.historical.values', []),
//       // ].map(config => ({
//       //   dates: config.map(item => moment(item.date).format('DD MMMM YYYY')),
//       //   values: config.map(item => item.value),
//       // }));

//       // yield put({ type: 'USER_STATISTIC_REQUEST_SUCCESS', chartData });
//     } catch (error) {
//       yield put({ type: 'USER_STATISTIC_REQUEST_ERROR', error });
//     }
//   } else {
//     yield put({ type: 'USER_STATISTIC_REQUEST_ERROR' });
//   }
// }


// HEADER -

{/* <div
data-test="headerApp"
className="header-app"
>
<Header
  data-test="userLayoutHeader"
  className="user-layout__header user-layout-header"
>
  <div
    data-test="page"
    className="page"
  >
    <Row type="flex" justify="space-between">
      <Col span={2} style={{ whiteSpace: 'nowrap' }}>
        <Link
          data-test="siteLogoLinkRouter"
          to={{ pathname: '/', state: { flag: true } }}
          style={{ display: 'inline-block' }}
        >
          <h1
            data-test="siteLogoTitle"
            className="site-logo"
          >
            <img
              className="site-logo__img"
              src={URL_FOR_LOGO}
              alt="logo"
            />
          </h1>
        </Link>
        <Route
          data-test="btnBackRoute"
          path="/:id"
          component={() => (
            <ButtonBack
              data-test="btnBack"
              style={{ marginLeft: '10px' }}
            />
          )}
        />

      </Col>

      <Col
        span={10}
        style={{ display: 'flex', justifyContent: 'flex-end' }}
      >
        <div className="user-layout-header__login">

          {!profileName && (
            <div>
              <Button
                data-test="btnLogin"
                className="btn-login"
                href={URL_FOR_LOGIN}
              >
                Login
              </Button>
              <a
                className="login-icon-link"
                href={URL_FOR_LOGIN}
              >
                <img
                  data-test="login-icon"
                  className="login-icon"
                  alt="Login"
                  src={`${URL_FOR_LOGIN_ICON}`}
                />
              </a>
              <img
                data-test="userAvatarEmpty"
                className="user-avatar-empty"
                alt=""
                src={`${URL_FOR_AVA_EMPTY_LOGIN}`}
              />

            </div>
          )}
          {profileName && (
            <span>
              <Button
                data-test="btnLogout"
                className="btn-logout"
                onClick={handleLoguotHeader}
              >
                Logout
              </Button>

              <Icon
                onClick={handleLoguotHeader}
                component={() => (
                  <img
                    data-test="logout-icon"
                    className="logout-icon"
                    alt="Logout"
                    src={`${URL_FOR_LOGOUT_ICON}`}
                  />
                )}
              />
              <Link
                data-test="linkProfileName"
                to="/profile"
              >

                <img
                  data-test="userAvatarImg"
                  className="user-avatar"
                  alt=""
                  src={`${profilePhotoUrl}`}
                />

              </Link>
            </span>
          )}
        </div>
      </Col>
    </Row>
  </div>
</Header>
</div> */}

// =============================================== 
// Search:

// /*
// import React, { PureComponent } from 'react';
// import PropTypes from 'prop-types';
// import { Icon, Button, Input, AutoComplete } from 'antd';
// import debounce from 'lodash/debounce';
// import './index.scss';

// const InputSearch = Input.Search;
// const { Option } = AutoComplete;

// function getRandomInt(max, min = 0) {
//   return Math.floor(Math.random() * (max - min + 1)) + min; // eslint-disable-line no-mixed-operators
// }


// function renderOption(item) {
//   return (
//     <Option key={item.category} text={item.category}>
//       <div className="global-search-item">
//         <span className="global-search-item-desc">
//           {/* Found
//           {' '} */}
//           {item.query}
//           {/* {' '}
//           on
//           {' '}
//           {item.category} */}

//         </span>
//         {/* <span className="global-search-item-count">
//           {' '}
//           {item.count}
//           {' '}
//           results
//         </span> */}
//       </div>
//     </Option>
//   );
// }
// class Search extends PureComponent {
//   constructor(...args) {
//     super(...args);
//     const { queryText } = this.props;
//     this.state = {
//       inputValue: queryText,
//       submitValue: '',
//       dataSource: [],
//       options: [
//         {
//           query: 'working',
//           category: 'working',
//           count: 1,
//         },
//         {
//           query: 'wording',
//           category: 'wording',
//           count: 1,
//         },
//       ],
//     };
//   }

//   componentDidUpdate = (prevProps) => {
//     const { queryText } = this.props;
//     if (prevProps.queryText !== queryText) {
//       this.setState({
//         inputValue: queryText,
//       });
//     }
//   };

//   onChangeDebounced = debounce((value) => {
//     const { onChangeInputValue } = this.props;
//     onChangeInputValue(value);
//   }, 500)

//   submitSearch = (value, q) => {
//     this.setState({
//       submitValue: value,
//     });
//     const { inputValue, options, dataSource } = this.state;
//     const { onSearchInputValue } = this.props;
//     console.log('1: submitSearch: ', value, inputValue);
//     if (inputValue) {
//       onSearchInputValue(value);
//       const newOptions = options.map(({ query, category, count }) => {
//         if (value === query) {
//           return {
//             query,
//             category,
//             count: count + 1,
//           };
//         }
//         return {
//           query,
//           category,
//           count,
//         };
//       });
//       this.setState({
//         options: [...newOptions],
//       });
//     }
//   }

//   handleButton = () => {
//     //console.log('2: handleButton');
//     const { onSearchInputValue } = this.props;
//     const { inputValue, options, dataSource } = this.state;
//     const value = inputValue;

//     const isQuery = options.some((item) => item.query === value);
//     if (!isQuery) {
//       const newObj = {    
//         query: value,
//         category: value,
//         count: 1,
//       }

//       this.setState({
//         options: [...options, newObj],
//       });
//     } else {
//       const newOptions = options.map(({ query, category, count }) => {
//         if (value === query) {
//           return {
//             query,
//             category,
//             count: count + 1,
//           };
//         }
//         return {
//           query,
//           category,
//           count,
//         };
//       });
//       this.setState({
//         options: [...newOptions],
//       });
//     }
//     onSearchInputValue(value);
    
//   }

//   handleInputChange = (value) => {
//     this.setState({
//       inputValue: value,
//     }, () => {
//       const { inputValue } = this.state;
//       if (inputValue) this.onChangeDebounced(inputValue);
//     });
//   };

//   searchResult = (querySearch) => {
//     const {options } = this.state;
//     return options.filter(({ query, category, count }, idx) => {
//       if (querySearch.length <= query.length) {
//         const strQuerySearch = query.substr(0, querySearch.length);
//         const strQuery = querySearch.substr(0, querySearch.length);
//         if (strQuerySearch === strQuery) {
//           return {
//             query,
//             category: `${querySearch}${idx}`,
//             count,
//           };
//         }
//         return false;
//       }

//       return false;
//     });
//   }

//   handleSearch = (value) => {
//     this.setState({
//       dataSource: this.searchResult(value),
//     });
//   };

//   handleKeyPress= (e) => {
//     //console.log('handleKeyPress', e);
//   };

//   handleKeyDown = (e) => {

//     if (e.keyCode === 13) {
      
//       const { onSearchInputValue } = this.props;
//       const { options, inputValue, submitValue } = this.state;
//       const value = e.target.value;
//       //if (e.target.value === submitValue) return false;
//       console.log('3: handleKeyDown: ', e.target.value, inputValue, submitValue);
      
//       const isQuery = options.some((item) => item.query === value);
//       if (!isQuery) {
//         const newObj = {    
//           query: value,
//           category: value,
//           count: 1,
//         }

//         this.setState({
//           options: [...options, newObj],
//         });
//       } else {
//         const newOptions = options.map(({ query, category, count }) => {
//           if (value === query) {
//             return {
//               query,
//               category,
//               count: count + 1,
//             };
//           }
//           return {
//             query,
//             category,
//             count,
//           };
//         });
//         this.setState({
//           options: [...newOptions],
//         });
//       }
//       onSearchInputValue(value);
      
//     }
    
//   };

//   render() {
//     const { inputValue, dataSource, options } = this.state;
//     const newDataSource = dataSource.map(({ query, category, count }) => {
//       for (let i = 0; i < options.length; i++) {
//         const optionQuery = options[i].query;
//         if (optionQuery === query) {
//           const optionsCount = options[i].count;
//           if (optionsCount !== count) {
//             return {
//               query,
//               category,
//               count: optionsCount,
//             };
//           }
//         }
//       }
//       return {
//         query,
//         category,
//         count,
//       };
//     })
//     return (
//       <div
//         data-test="searchContainer"
//         className="search"
//       >
//         <AutoComplete
//           className="global-search"
//           style={{ width: '100%' }}
//           dataSource={newDataSource.map(renderOption)}
//           onSelect={this.submitSearch}
//           onSearch={this.handleSearch}
//           onChange={this.handleInputChange}
//           defaultActiveFirstOption={false}
//           value={inputValue}
//           optionLabelProp="text"
//           //backfill={true}

//         >
//           <Input
//             //onKeyPress={this.handleKeyPress}
//             onKeyDown={this.handleKeyDown}
//             suffix={(
//               <Button
//                 className="search-btn"
//                 style={{ marginRight: -12 }}
//                 onClick={this.handleButton}
//               >
//                 <Icon type="search" />
//               </Button>
//             )}
//           />
//         </AutoComplete>
//       </div>
//     );
//   }
// }

// Search.propTypes = {
//   queryText: PropTypes.string,
//   onSearchInputValue: PropTypes.func,
//   onChangeInputValue: PropTypes.func,
// };
// Search.defaultProps = {
//   queryText: '',
//   onSearchInputValue: () => {},
//   onChangeInputValue: () => {},
// };

// export default Search;
    // const re = new RegExp(`^${escapeRegExp(value)}`, 'i');
    // const items = options.filter(({ query }) => re.test(query))
    //   .sort((a, b) => b.count - a.count);

    ////////////
    // const items = options
    //   .filter(({ query }) => value.length <= query.length)
    //   .filter((item) => {
    //     const querySearch = item.query.substr(0, value.length).toLowerCase();
    //     return value.toLowerCase() === querySearch ? item : false;
    //   }).sort((a, b) => b.count - a.count);

    // this.setState({ dataSource: items.length ? items : [] });

        // const newDataSource = options
    //   .filter(({ query }) => query === value)
    //   .map(item => ({ ...item, count: item.count + 1 }));
// */
/// 
/* 
handleKeyDown = (e, e2) => {
    const {
      searchTextAction: onSearchInputValue,
      updateTagsStartAction: updateTagStart,
    } = this.props;
    const { lastRequest } = this.state;
    const value = e && e.target ? e.target.value : e;
    this.setState({ isSelectOpen: !!value });
    this.searchResult(value);
    console.log("1.1: handleKeyDown ::: ", e, " : ", lastRequest)
    console.log("1.2: handleKeyDown ::: ", e2)
    console.log("1.3: handleKeyDown ::: ", e , " : " , value)
    if (e === lastRequest) {
      this.queryCancel = true;
      return false;
    }

    if (e && !e.target && e !== lastRequest) {
      console.log("1.4: handleKeyDown ::: ", e)
      console.log("1.5: handleKeyDown ::: ", e2)
      console.log("1.6: handleKeyDown ::: ", value)
      this.increaseCount(e);
      onSearchInputValue(e);
      this.setState({ lastRequest: e });
      updateTagStart(e);
    } else if (e.keyCode === 13 && value && value !== lastRequest) {
      console.log("1.7: handleKeyDown ::: ", e)
      console.log("1.8: handleKeyDown ::: ", e2)
      console.log("1.9: handleKeyDown ::: ", value)
      console.log("1.10: handleKeyDown ::: ", this.queryCancel, " : ", lastRequest)
      if (this.queryCancel) {
        this.queryCancel = false;
        return false;
      }
      this.increaseCount(value);
      this.createNewOption(value);
      this.setState({ isSelectOpen: false });
      onSearchInputValue(value);
      this.setState({ lastRequest: value });
      updateTagStart(value);
    }

    if (
      (!e.target && e && e === lastRequest)
      || (e.keyCode === 13 && value && value === lastRequest
      )) {
      this.setState({ isSelectOpen: false }, () => this.setState({ isSelectOpen: false }));
    }

    return false;
  };

*/