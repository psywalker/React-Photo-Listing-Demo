import axios from 'axios';

function handleAuthorizationRequest (code) {
  return new Promise(((resolve, reject) => {
    if (code) {
      axios.post('https://unsplash.com/oauth/token', {
        redirect_uri: process.env.REACT_APP_UNSPLASH_API_REDIRECT_URI,
        client_secret: process.env.REACT_APP_UNSPLASH_API_CLIENT_SECRET,
        code: code,
        grant_type: 'authorization_code',
        client_id: process.env.REACT_APP_UNSPLASH_API_KEY,
      }).then((res) => {
        const token = res.data.access_token;
        if (token) {
          const headers = {
            Authorization: `Bearer ${token}`,
          };

          axios.get(`${process.env.REACT_APP_PROFILE}/me`, { headers }).then((res) => {
            const profilePhotoUrl = res.data.profile_image.small;
            const profileName = res.data.name;
            const profileEmail = res.data.email;
            const obj = {
              loginFlag: true,
              profilePhotoUrl,
              profileName,
              profileEmail,
            }
            resolve(obj);
          })
            .catch(() => {
              console.log('2: Запрос с токкеном НЕудачный::: ', 'pixabay API not responding');
            });
        }
      })
        .catch(() => {
          console.log('3: Запрос без токкена (начальный) НЕудачный:::  ', 'pixabay API not responding');
        });
    } else {
      console.log('4: Предложить авторизацию');
      /* здесь позже код напишу, пока надо разобраться с кодом выше */
    }
  }));
}

export default handleAuthorizationRequest;
