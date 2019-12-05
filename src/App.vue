<template>
  <div id="main-app" class="container">
    <h2>{{title}}</h2>
    <!-- <h4>{{currentTime}}</h4> -->     
      <table v-if="isLoaded">
        <tr>
          <th>Line</th>
          <th>End Destination</th>
          <th>Time until arrival:</th>
        </tr>
        <tr v-for="(item, i) in tubeLine" v-bind:key="i">
          <td>{{item.lineName}}</td>
          <td>to {{item.destinationName}}</td>
          <td>{{item.timeToStation}}
            <p v-if='Math.floor(item.timeToStation/60) === 0'>Due</p>
            <p v-else>{{Math.floor(item.timeToStation/60)}} mins</p>
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
      stopPoint: "940GZZLUASL",
      refreshInterval: '',
      isLoaded: false
    };
  },

  methods: {
    getTubeInfo() {
      axios
        .get('https://api.tfl.gov.uk/StopPoint/' + this.stopPoint + '/Arrivals')
        .then(response => {
          this.tubeLine = response.data;
          // this.getMinutes();
          this.sortByTime();
          this.isLoaded = true
        })
        // .catch(error => console.log(error))
    },
    // getMinutes() {
    //   const times = this.tubeLine.map(x => Math.floor(x.timeToStation/60));
    //   return times === 0 ? "Due" : Math.floor(times/60) + "mins";    
    // },
    sortByTime() {
      return this.tubeLine.sort((a, b) => {
        return a.timeToStation - b.timeToStation;
      }) 
    },
  },

  mounted() {
    this.getTubeInfo()
  },
  updated() {
    this.refreshInterval = setInterval(() => {
      this.getTubeInfo()
    }, 20000);
  }
};
</script>


