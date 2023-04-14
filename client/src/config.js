const { VITE_CLIENT_ID, VITE_ISSUER, OKTA_TESTING_DISABLEHTTPSCHECK, VITE_USE_INTERACTION_CODE } =
  import.meta.env
console.log(import.meta.env.VITE_CLIENT_ID)
let USE_INTERACTION_CODE_FLOW = false
if (VITE_USE_INTERACTION_CODE === 'true') {
  USE_INTERACTION_CODE_FLOW = true
}

const BASENAME = import.meta.env.NODE_ENV === 'production' ? '/toy-project-vue' : ''
const REDIRECT_URI = `${window.location.origin}${BASENAME}/login/callback`

export default {
  oidc: {
    clientId: VITE_CLIENT_ID,
    issuer: VITE_ISSUER,
    redirectUri: REDIRECT_URI,
    scopes: ['openid', 'profile', 'email'],
    pkce: true,
    useInteractionCodeFlow: USE_INTERACTION_CODE_FLOW,
    testing: {
      disableHttpsCheck: OKTA_TESTING_DISABLEHTTPSCHECK
    }
  },
  // resourceServer: {
  //   messagesUrl: 'http://localhost:8000/api/messages'
  // },
  app: {
    basename: BASENAME
  }
}
