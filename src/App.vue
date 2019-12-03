<template>
  <div id="main-app" class="container">
    <h2>{{title}}</h2>
    <h4>{{currentTime}}</h4>
    <div v-for="(item, i) in tubeLine" v-bind:key="i">
      <!-- <h4>{{tubeLine}}</h4> -->
      <p>{{i}}</p> 
      <p>{{item.id}}</p> 
    </div>
  </div>
</template>

<script>
import axios from "axios";
import moment from "moment";

// const ids = "circle"

export default {
  name: "MainApp",
  data () {
    return {
      title: "Arrivals board",
      currentTime: moment("dddd, MMMM Do YYYY, h:mm:ss a"),
      tubeLine: [],
      line: "circle",
      mode: "tube",
      serviceType: "Night"
    };
  },
  mounted() {
    axios
      // .get('https://api.tfl.gov.uk/Line/' + this.line)
      .get('https://api.tfl.gov.uk/Line/Mode/' + this.mode + '/Route?serviceTypes=' + this.serviceType)
      .then(response => (this.tubeLine = response.data))
      // .catch(error => console.log(error))
  }
};
</script>


