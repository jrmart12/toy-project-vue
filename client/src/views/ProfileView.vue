<script>
export default {
  name: 'ProfileView',
  data() {
    return {
      claims: []
    }
  },
  async created() {
    this.claims = await Object.entries(await this.$auth.getUser()).map((entry) => ({
      claim: entry[0],
      value: entry[1]
    }))
  }
}
</script>

<template>
  <div class="profile">
    <h1 class="ui header">
      <i aria-hidden="true" class="drivers license outline icon"> </i>
      My User Profile (ID Token Claims)
    </h1>
    <p>
      Below is the information from your ID token which was obtained during the
      <a href="https://developer.okta.com/docs/guides/implement-auth-code-pkce">PKCE Flow</a>
      and is now stored in local storage.
    </p>
    <p>
      This route is protected with the <code>onAuthRequired</code>, navigation guard which will
      ensure that this page cannot be accessed until you have authenticated.
    </p>
    <table class="ui table">
      <thead>
        <tr>
          <th>Claim</th>
          <th>Value</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(claim, index) in claims" :key="index">
          <td>{{ claim.claim }}</td>
          <td :id="'claim-' + claim.claim">{{ claim }}</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<style>
@media (min-width: 1024px) {
  .about {
    min-height: 100vh;
    display: flex;
    align-items: center;
  }
}
</style>
