<template>
  <div id="app" class="container">
    <h2>{{title}}</h2>
    <topNav></topNav>
    <router-view />
  </div>
</template>

<script>
import topNav from './components/TopNav.vue'

export default {
  name: "App",
  data () {
    return {
      title: "Arrivals board",
    };
  },
  components: {
    'topNav': topNav
  },
  methods: {
  }
}
</script>

<style>
  @import './style.css';
</style>


