<template>
  <div id="main-app" class="container">
    <h2>{{title}}</h2>
    <!-- <h4>{{currentTime}}</h4> -->     
      <table>
        <tr>
          <th>Line</th>
          <th>End Destination</th>
          <th>Time until arrival:</th>
        </tr>
        <tr v-for="(item, i) in tubeLine" v-bind:key="i">
            <td>{{item.lineName}}</td>
            <td>to {{item.destinationName}}</td>
            <td>
              <p v-if='Math.floor(item.timeToStation/60) === 0'>Due</p>
              <p v-if='Math.floor(item.timeToStation/60) !== 0'>{{Math.floor(item.timeToStation/60)}} mins</p>
            </td>           
        </tr>
      </table>
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
      // currentTime: moment("dddd, MMMM Do YYYY, h:mm:ss a"),
      tubeLine: [],
      arrivalTime: '',
      stopPoint: "940GZZLUASL",
      serviceType: "Night",
      refreshInterval: ''
    };
  },

  methods: {
      getTubeInfo() {
      axios
        .get('https://api.tfl.gov.uk/StopPoint/' + this.stopPoint + '/Arrivals')
        .then(response => (this.tubeLine = response.data))
        // .catch(error => console.log(error))
    },
    sortByTime() {
     return this.tubeLine.filter(item => {
       return item.timeToStation
     })
      .sort((a, b) => {
        return ((a < b) ? -1 : ((a > b) ? 1 : 0));
      }) 
    },
    // getMinutes() {
    //   this.tubeLine.forEach((value, index) => {
    //     const mins = Math.floor(index.timeToStation/60);
    //     this.arrivalTime = mins === 0 ? "Due" : mins + "mins";
    //   });      
    // },
    updateTubeInfo() {
      // clear board

      // use get tube info?

    }
  },
  mounted() {
    this.getTubeInfo();
    this.sortByTime();
    // this.getMinutes();
  // },
  // updated() {
  //   this.refreshInterval = setInterval(() => {

  //   }, 10000);
  }
};
</script>


