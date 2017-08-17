<template>
  <v-layout column>
    <v-flex xs12>
      <h4 class="text-xs-center">Login</h4>
    </v-flex>

    <v-flex xs6 offset-xs3>
      <v-text-field
        name="email"
        label="Email"
        v-model="email"
      ></v-text-field>

      <v-text-field
        name="password"
        label="Password"
        type="password"
        v-model="password"
      ></v-text-field>

      <v-btn @click="login">
        <v-icon>thumb_up</v-icon> Login
      </v-btn>
    </v-flex>
  </v-layout>
</template>

<script>
import LoginService from '../../services/login_service'

export default {
  data () {
    return {
      invalid: false,
      email: '',
      password: ''
    }
  },
  methods: {
    async login () {
      try {
        const info = await LoginService.post({
          email: this.email,
          password: this.password
        })
        this.$store.dispatch('setToken', info.token);
        this.$store.dispatch('setUser', info.user);
        this.$router.push({
          name: 'snippits'
        });
      } catch (err) {
        this.invalid = true;
      }
    }
  }
}
</script>


<style scoped>

</style>
