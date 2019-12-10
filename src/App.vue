<template>
  <div id="main-app" class="container">
    <h2>{{title}}</h2>
    <div id="get-info" class="form">
      <div class="field">
        <label class="label">Line</label>
        <div class="control">
          <input v-model="lineId" class="input" type="text" placeholder="Tube line" v-on:change="getStationsInfo">
        </div>
      </div>
      <div class="field">
        <label for="stations" class="control-label">Station</label>
        <select name="station" id="station" class="form-control" v-on:change="getTubeInfo($event)">
          <option v-for="station in stations" :key="station.id" :value="station.id">{{ station.commonName }}</option>
        </select>
      </div>            
    </div>
    
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
          <!-- <td>{{item.stationName}}</td> -->
          <td>
            <p v-if='Math.floor(item.timeToStation/60) === 0'>Due</p>
            <p v-else>{{Math.floor(item.timeToStation/60)}} mins</p>
          </td>
          <td>{{item.platformName}}</td>       
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
      lineId: "",      
      stations: [],
      stopPoint: "",
      tubeLine: [],
      refreshInterval: '',
      isLoaded: false
    };
  },

  methods: {
    getStationsInfo() {
      //this is to get the stop points on a line so the dropdown can be populated
      axios
        .get('https://api.tfl.gov.uk/Line/'  + this.lineId + '/StopPoints') 
        .then(response => {
          this.stations = response.data;
          // this.getTubeInfo()
          // this.refreshInterval = setInterval(this.getTubeInfo, 20000)
        })

    },
    getTubeInfo(event) {
      this.stopPoint = event.target.value
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
  // },

  // mounted() {
  //   this.getStationsInfo()
  }
};
</script>


