<template>
  <div id="main-app" class="container">
    <h2>{{title}}</h2>
    <!-- <h4>{{currentTime}}</h4> -->
    <div v-for="(item, i) in tubeLine" v-bind:key="i">
      <h4>{{tubeLine}}</h4>
      <p>{{i}}</p>
    </div>
  </div>
</template>

<script>
import axios from "axios";
// import moment from "moment";

export default {
  name: "MainApp",
  data () {
    return {
      title: "Arrivals board",
      currentTime: "moment().format('MMMM Do YYYY, h:mm:ss a')",
      tubeLine: []
    };
  },
  // computed: {
  //   currentTime() {
  //     return moment().format('MMMM Do YYYY, h:mm:ss a');
  //   }
  // },
  mounted() {
    axios
      .get('https://api.tfl.gov.uk/Line/bakerloo/Arrivals/940GZZLUWLO?direction=inbound')
      .then(response => (this.tubeLine = response.data))
      // .catch(error => console.log(error))
  }
};
</script>


