<template>
  <div id="main-app" class="container">
    <h2>{{title}}</h2>
    <div id="get-info" class="form">
      <div class="field">
        <label class="label">Line</label>
        <div class="control">
          <input v-model="lineId" class="input" type="text" placeholder="Tube line">
        </div>
        <p>test tube line: {{this.lineId}}</p>
        <!-- <p>test api {{this.stations}}</p> -->
      </div>
      <button>Find station</button>
      <div class="field">
        <label for="stations" class="control-label">Station</label>
        <select v-model="selectedStation" @change="getStationsInfo" name="station" id="station" class="form-control" tabindex="11">>
          <option v-for="station in stations" :key="station.id" :value="station.id">{{ station.name }}</option>
        </select>
        <!-- <span>Selected: {{ this.form.selected }}</span> -->
      </div>            
       
      <div>
        <p>Station:</p>
        <input v-model="stopPoint">
        <p>test station {{this.stopPoint}}</p>
      </div>
    </div>
    
    <!-- <h4>{{currentTime}}</h4> -->     
      <table v-if="isLoaded">
        <p>{{this.form.line}}</p>
        <p>{{this.form.station}}</p>
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
      form: {
        line: '',
        station: '940GZZLUPCO',
        selected: '',
      },
      title: "Arrivals board",
      // currentTime: moment("dddd, MMMM Do YYYY, h:mm:ss a"),
      tubeLine: [],
      stations: [],
      lineId: "victoria",
      stopPoint: "940GZZLUPCO",
      refreshInterval: '',
      isLoaded: false
    };
  },

  methods: {
    getStationsInfo() {
      //this is to get the stop points on a line so the dropdown can be populated
      axios
        .get('https://api.tfl.gov.uk/StopPoint/' + this.stopPoint + '/CanReachOnLine/' + this.lineId) 
        .then(response => {
          this.stations = response.data;
        })

    },
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
    this.getStationsInfo()
    this.getTubeInfo()
    this.refreshInterval = setInterval(this.getTubeInfo, 20000)
  }
};
</script>


