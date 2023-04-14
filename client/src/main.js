import { createApp } from 'vue'
import { createPinia } from 'pinia'
import { OktaAuth } from '@okta/okta-auth-js'
import OktaVue from '@okta/okta-vue'
import sampleConfig from '@/config'
import App from './App.vue'
import router from './router'
import './assets/main.css'

const oktaAuth = new OktaAuth(sampleConfig.oidc)
const app = createApp(App)

app.use(createPinia())
app.use(router)
app.use(OktaVue, {
  oktaAuth,
  onAuthRequired: () => {
    app.onAuthRequired(oktaAuth)
  },
  onAuthResume: () => {
    router.push('/login')
  }
})

app.mount('#app')
