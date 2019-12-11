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
        <label for="stations" class="label">Station</label>
        <select name="station" id="station" v-on:change="getTubeInfo($event)">
          <option>Select Station</option>
          <option v-for="station in stations" :key="station.id" :value="station.id">{{ station.commonName }}</option>
        </select>
      </div>
      <div class="field">
        <label class="label">Platform</label>
        <select name="platform" id="platform" v-on:change="showArrivals($event)">
          <option>Select Platform</option>
          <option v-for="platform in platforms" :key="platform" :value="platform">{{ platform }}</option>
        </select>
      </div>
    </div>
    <button v-on:click="refresh()">Refresh</button>
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
      axios
        .get('https://api.tfl.gov.uk/Line/'  + this.lineId + '/StopPoints') 
        .then(response => {
          this.stations = response.data;
        })
    },
    getTubeInfo(event) {
      this.stopPoint = event.target.value
      axios
        .get('https://api.tfl.gov.uk/StopPoint/' + this.stopPoint + '/Arrivals')
        .then(response => {
          this.timetable = response.data;
          this.platformFilter();
        })
    },
    platformFilter() {
      this.platforms = [...new Set(this.timetable.map(i => i.platformName))]
    },
    showArrivals(event) {
      this.platform = event.target.value;
      this.platformArrivals = this.timetable.filter(x => {
        return x.platformName === this.platform && x.lineId === this.lineId
      });
      this.sortByTime();
      this.isLoaded = true
    },
    sortByTime() {
      return this.platformArrivals.sort((a, b) => {
        return a.timeToStation - b.timeToStation;
      }) 
    },
    refresh() {
      this.getStationsInfo()
    }
  }
};
</script>


