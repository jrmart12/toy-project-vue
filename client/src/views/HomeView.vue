<script>
export default {
  name: 'HomeView',
  data: function () {
    return {
      claims: '',
      resourceServerExamples: [
        {
          label: 'Purpose Website',
          url: 'https://www.havepurpose.com/'
        }
      ]
    }
  },
  mounted() {
    this.setup()
  },
  methods: {
    async setup() {
      if (this.authState && this.authState.isAuthenticated) {
        this.claims = await this.$auth.getUser()
      }
    }
  }
}
</script>

<template>
  <main>
    <h1>Purpose Finantial</h1>
    <div v-if="!authState || !authState.isAuthenticated">
      <h2>We are Purpose Financial.</h2>
      <p>
        An innovative consumer financial services company dedicated to improving financial mobility.
      </p>
      <p>
        An innovative consumer financial services company dedicated to improving financial mobility.
      </p>
      <RouterLink id="login-button" class="ui primary button" role="button" to="/login"
        >Login</RouterLink
      >
    </div>
    <div v-if="authState && authState.isAuthenticated">
      <p>Welcome back, {{ claims.name }}!</p>
      <p>Get to know us a little more on our website</p>
      <ul>
        <li v-for="(example, index) in resourceServerExamples" :key="index">
          <a :href="example.url">{{ example.label }}</a>
        </li>
      </ul>
    </div>
  </main>
</template>
