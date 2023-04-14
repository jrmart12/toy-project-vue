<script>
import AuthRequiredModal from './components/AuthRequiredModal.vue'
import router from './router'
export default {
  name: 'app',
  components: {
    AuthRequiredModal
  },
  methods: {
    onAuthRequired(oktaAuth) {
      if (!oktaAuth.authStateManager.getPreviousAuthState()?.isAuthenticated) {
        // App initialization stage
        router.push('/login')
      } else {
        // Ask the user to trigger the login process during token autoRenew process
        this.$refs.authRequiredModal.showModal()
      }
    },
    async logout() {
      const publicPath = this.$route.href.replace(new RegExp(this.$route.fullPath + '$'), '')
      await this.$auth.signOut({ postLogoutRedirectUri: `${window.location.origin}${publicPath}` })
    }
  }
}
</script>

<template>
  <header>
    <RouterLink to="/">
      <img alt="Vue logo" class="logo" src="@/assets/logo.svg" width="125" height="125" />
    </RouterLink>
    <div class="wrapper">
      <nav>
        <RouterLink to="/login" v-if="authState && !authState.isAuthenticated">Login</RouterLink>
        <RouterLink to="/profile" id="profile-button" v-if="authState && authState.isAuthenticated"
          >Profile</RouterLink
        >
        <RouterLink
          to="/springboot"
          id="springboot-button"
          v-if="authState && authState.isAuthenticated"
          >Spring Boot</RouterLink
        >
        <a
          id="logout-button"
          class="item"
          v-if="authState && authState.isAuthenticated"
          v-on:click="logout()"
        >
          Logout
        </a>
      </nav>
    </div>
  </header>
  <RouterView />
  <AuthRequiredModal ref="authRequiredModal" />
</template>

<style scoped>
header {
  line-height: 1.5;
  max-height: 100vh;
  position: fixed;
  top: 0;
}

.logo {
  display: block;
  margin: 0 auto 2rem;
}

nav {
  width: 100%;
  font-size: 12px;
  text-align: center;
  margin-top: 2rem;
  display: flex;
}

nav a.router-link-exact-active {
  color: var(--color-text);
}

nav a.router-link-exact-active:hover {
  background-color: transparent;
}

nav a {
  display: inline-block;
  padding: 0 1rem;
  border-left: 1px solid var(--color-border);
}

nav a:first-of-type {
  border: 0;
}

@media (min-width: 1024px) {
  header {
    display: flex;
    place-items: center;
    padding-right: calc(var(--section-gap) / 2);
  }

  .logo {
    margin: 0 2rem 0 0;
  }

  header .wrapper {
    display: flex;
    place-items: flex-start;
    flex-wrap: wrap;
  }

  nav {
    text-align: left;
    margin-left: -1rem;
    font-size: 1rem;

    padding: 1rem 0;
    margin-top: 1rem;
  }
}
</style>
