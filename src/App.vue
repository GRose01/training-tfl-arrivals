<template>
  <div id="main-app" class="container">
    <h2>{{title}}</h2>
    <div id="get-info" class="form">
      <div class="field">
        <label for="stations" class="label">Select Line</label>
        <select name="line" id="lineId" v-on:change="getStationsInfo" v-model="lineId">
          <option value="">Select Line </option>
          <option value="bakerloo">Bakerloo</option>
          <option value="central">Central</option>
          <option value="circle">Circle</option>
          <option value="district">District</option>
          <option value="hammersmith-city">Hammersmith & City</option>
          <option value="jubilee">Jubilee</option>
          <option value="metropolitan">Metropolitan</option>
          <option value="northern">Northern</option>
          <option value="piccadilly">Piccadilly</option>
          <option value="victoria">Victoria</option>
          <option value="waterloo-city">Waterloo & City</option>
        </select>
      </div>
      <div class="field">
        <label for="stations" class="label">Station </label>
        <select name="station" id="station" v-on:change="getPlatformInfo" v-model="stopPoint">
          <option value="">Select Station</option>
          <option v-for="station in stations" :key="station.id" :value="station.id">{{ station.commonName }}</option>
        </select>
      </div>
      <div class="field">
        <label class="label">Platform </label>
        <select name="platform" id="platform" v-on:change="getLiveTimetable" v-model="platform">
          <option value="">Select Platform</option>
          <option v-for="platform in platforms" :key="platform" :value="platform">{{ platform }}</option>
        </select>
      </div>
    </div>
    <button v-on:click="refresh">Refresh</button>
      <table v-if="isLoaded">
        <tr>
          <th>Line</th>
          <th>End Destination</th>
          <th>Time until arrival:</th>
        </tr>

        <tr v-for="(item, i) in platformArrivals" v-bind:key="i">
          <td>{{item.lineName}}</td>
          <td>to {{item.destinationName}}</td>
          <td>
            <p v-if='Math.floor(item.timeToStation/60) === 0'>Due</p>
            <p v-else>{{Math.floor(item.timeToStation/60)}} mins</p>
          </td>
        </tr>
      </table>
  </div>
</template>

<script>
import axios from "axios";

export default {
  name: "MainApp",

  data () {
    return {
      title: "Arrivals board",
      lineId: "",      
      stations: [],
      stopPoint: "",
      timetable: [],
      platforms: [],
      platform: '',
      platformArrivals: [],
      refreshInterval: "",
      isLoaded: false
    };
  },

  methods: {
    getStationsInfo() {
      // this gets the stoppoints from line ID and sets stoppoint when station is selected
      axios
        .get('https://api.tfl.gov.uk/Line/'  + this.lineId + '/StopPoints') 
        .then(response => {
          this.stations = response.data;
        })
    },
    getPlatformInfo() {
      // this is called when station is selected. It gets the arrival info and populates the platform
      axios
        .get('https://api.tfl.gov.uk/StopPoint/' + this.stopPoint + '/Arrivals')
        .then(response => {
          this.timetable = response.data;
          // put if statement in here to filter plaform by lines?
          const lineTimetable = this.timetable.filter(x => {
        return x.lineId === this.lineId
      });
          this.platforms = [...new Set(lineTimetable.map(i => i.platformName))];
        })
    },
    getLiveTimetable() {
      // this is called when plaform selected and renders correct timetable info
      this.isLoaded = true;
      this.platformArrivals = this.timetable.filter(x => {
        return x.platformName === this.platform && x.lineId === this.lineId
      });
      return this.platformArrivals.sort((a, b) => {
        return a.timeToStation - b.timeToStation;
      });
    },
    refresh() {
      this.getPlatformInfo();
      this.getLiveTimetable();
    }
  }
};
</script>


