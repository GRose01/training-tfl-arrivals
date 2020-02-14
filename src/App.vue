<template>
  <div id="app" class="container">
    <h2>{{title}}</h2>
    <div class="select">
      <singleDropdown 
        :forLabel="lineLabel"
        :labelText="lineText"
        :initialValue="linePlaceholder"
        :options="lines"
        @itemChanged="lineId = $event"
        ></singleDropdown>

        <singleDropdown 
        :forLabel="stationLabel"
        :labelText="stationText"
        :initialValue="stationPlaceholder"
        :options="stations"
        @itemChanged="stopPoint = $event"
        ></singleDropdown>

        <singleDropdown 
        :forLabel="platformLabel"
        :labelText="platformText"
        :initialValue="platformPlaceholder"
        :options="platforms"
        @itemChanged="platform = $event"
        ></singleDropdown>
    </div>

    <div class="refresh">
      <button v-on:click="refresh" class="refreshButton">Refresh</button>

      <div>Refresh in: {{seconds}} seconds</div>
    </div>
    <table v-if="isLoaded" v-on:change="countdown" class="arrivalsTable">
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
import { getTubeLines, getStations, getPlatforms } from "./requests.js";
import singleDropdown from './components/singleDropdown.vue'
import { dedupe } from './utilities/dedupe.js'

export default {
  name: "App",
  data () {
    return {
      title: "Arrivals board",

      lineLabel: "lines",
      lineText: "Line: ",
      linePlaceholder: "Choose a line",
      lines: [],
      lineId: "",  

      stationLabel: "stations",
      stationText: "Station: ",
      stationPlaceholder: "Choose a station",
      stations: [],
      stopPoint: "",
      
      timetable: [],
      platformLabel: "platforms",
      platformText: "Platform: ",
      platformPlaceholder: "Choose a platform",
      platforms: [],
      platform: '',

      platformArrivals: [],
      timer: null,
      seconds: 30,
      isLoaded: false
    };
  },
  components: {
    'singleDropdown': singleDropdown
  },
  methods: {
    setLineData: function(event) {
      this.lineId = event.target.value
    },
    getStationsInfo() {
      // this gets the stoppoints from line ID and sets stoppoint when station is selected
      clearInterval(this.timer)
      if (this.lineId != null || this.lineId != undefined) {
        getStations(this.lineId)
          .then(response => { 
            this.stations = response.map(i => {
              return { name: i.commonName, value: i.id }
            })
          })
          .catch(error => alert(error.name))
      }
    },
    getPlatformInfo() {
      // this is called when station is selected. It gets the arrival info and populates the platform
      clearInterval(this.timer)
      if (this.stopPoint != null  || this.lineId != undefined) {
        getPlatforms(this.stopPoint)
          .then(response => {
            this.timetable = response
            
            const lineTimetable = this.timetable.filter(x => {
              return x.lineId === this.lineId
            });

            const duplicatedPlatforms = lineTimetable.map(i => {
              return { name: i.platformName, value: i.platformName }
            })

            this.platforms = dedupe(duplicatedPlatforms)
                .sort((a, b) => (a.name[a.name.length - 1] > b.name[b.name.length - 1]) ? 1 : -1)
            })
            .catch(error => alert(error.name))
      }    
    },
    getLiveTimetable() {
      // this is called when plaform selected and renders correct timetable info
      this.isLoaded = true;
      this.refresh();
      this.platformArrivals = this.timetable.filter(x => {
        return x.platformName === this.platform && x.lineId === this.lineId
      });
      return this.platformArrivals.sort((a, b) => {
        return a.timeToStation - b.timeToStation;
      });
    },
    countdown() {
      if (!this.timer) {
        this.timer = setInterval(() => {
          if (this.seconds > 0) {
            this.seconds -= 1
          } else {
            clearInterval(this.timer)
            this.refresh()
          }
        }, 1000)
      }
    },
    refresh() {
      clearInterval(this.timer)
      this.seconds = 30
      this.timer = null
      this.countdown()  
    }
  },
  watch: {
    lineId () {
      this.getStationsInfo()
    },
    stopPoint () {
      this.getPlatformInfo()
    },
    platform () {
      this.getLiveTimetable()
    }
  },

  created: function(){
    getTubeLines()
    .then(response => { 
      this.lines = response.map(i => {
        return { name: i.name, value: i.id }
      })
    })
    .catch(error => alert(error.name))
  }
}
</script>

<style>
  @import './style.css';
</style>


