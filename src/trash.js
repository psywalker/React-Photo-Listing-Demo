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
