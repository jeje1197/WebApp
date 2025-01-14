import webAppConfig from '../config';

const initializeFacebookSDK = () => {
  console.log('initializeFacebookSDK called');
  if (webAppConfig.ENABLE_FACEBOOK) {
    window.fbAsyncInit = function () {  // eslint-disable-line func-names
      const { FB } = window;
      FB.init({
        appId: webAppConfig.FACEBOOK_APP_ID,
        autoLogAppEvents: true,
        xfbml: true,
        version: 'v9.0', // Facebook JavaScript SDK - Facebook Version
        status: true, // set this status to true, this will fix the popup blocker issue
      });
      console.log('initializeFacebookSDK FB.init has been called');
      try {
        FB.getLoginStatus((response) => {
          console.log('initializeFacebookSDK FB.getLoginStatus response:', response);
        });
      } catch (error) {
        console.log('initializeFacebookSDK FB.getLoginStatus error:', error);
      }
    };

    (function (d, s, id) { // eslint-disable-line
      let js;
      const fjs = d.getElementsByTagName(s)[0];
      if (d.getElementById(id)) {
        return;
      }

      js = d.createElement(s);    // eslint-disable-line prefer-const
      js.id = id;
      js.async = true;
      js.src = 'https://connect.facebook.net/en_US/sdk.js';
      fjs.parentNode.insertBefore(js, fjs);
    }(document, 'script', 'facebook-jssdk'));
  }
};

export default initializeFacebookSDK;
