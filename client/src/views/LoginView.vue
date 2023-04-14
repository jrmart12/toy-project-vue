<script>
import OktaSignIn from '@okta/okta-signin-widget'

import sampleConfig from '../config'

export default {
  name: 'LoginView',
  mounted: function () {
    this.$nextTick(function () {
      const { issuer, clientId, redirectUri, scopes, useInteractionCodeFlow } = sampleConfig.oidc
      const otp = this.$route.query.otp
      const state = this.$route.query.state
      this.widget = new OktaSignIn({
        baseUrl: issuer.split('/oauth2')[0],
        clientId,
        redirectUri,
        // eslint-disable-next-line no-undef
        logo: '../src/assets/logo.svg',
        i18n: {
          en: {
            'primaryauth.title': 'Sign in Purpse Finantial'
          }
        },
        authParams: {
          issuer,
          scopes
        },
        useInteractionCodeFlow,
        state,
        otp
      })

      const originalUri = this.$auth.getOriginalUri()
      if (!originalUri) {
        this.$auth.setOriginalUri('/')
      }

      this.widget
        .showSignInToGetTokens({
          el: '#okta-signin-container',
          scopes
        })
        .then((tokens) => {
          this.$auth.handleLoginRedirect(tokens)
        })
        .catch((err) => {
          throw err
        })
    })
  },
  unmounted() {
    // Remove the widget from the DOM on path change
    this.widget?.remove()
  }
}
</script>

<template>
  <div class="login">
    <div id="okta-signin-container"></div>
  </div>
</template>
