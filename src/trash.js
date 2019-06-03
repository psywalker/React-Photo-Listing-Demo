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
