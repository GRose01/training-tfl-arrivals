<template>
  <div id="app" class="container">
    <h2>{{title}}</h2>
    <div id="get-info" class="form">
      <div class="field">
        <label for="lines" class="label">Select Line</label>
        <select name="line" id="lineId" v-on:change="getStationsInfo" v-model="lineId">
          <option value="">Select Line </option>
          <option v-for="line in lines" :key="line.id" :value="line.id">{{ line.name }}</option>
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

    <div>Refresh in: {{seconds}} seconds</div>
      <table v-if="isLoaded" v-on:change="countdown">
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


export default {
  name: "App",
  data () {
    return {
      title: "Arrivals board",
      lines: [],
      lineId: "",      
      stations: [],
      stopPoint: "",
      timetable: [],
      platforms: [],
      platform: '',
      platformArrivals: [],
      timer: null,
      seconds: 30,
      isLoaded: false
    };
  },

  methods: {
  
    getStationsInfo() {
      // this gets the stoppoints from line ID and sets stoppoint when station is selected
      getStations(this.lineId)
        .then(response => { this.stations = response })
    // .catch(error => console.log(error))
    },
    getPlatformInfo() {
      // this is called when station is selected. It gets the arrival info and populates the platform
      getPlatforms(this.stopPoint)
        .then(response => {
          this.timetable = response;
          
          const lineTimetable = this.timetable.filter(x => {
            return x.lineId === this.lineId
          });

          this.platforms = [...new Set(lineTimetable.map(i => i.platformName))];
          // this.platforms.sort((a, b) => {
          //   return (a.charAt(.length-1) > b.charAt(str.length-1)) ? 1 : -1;
          // }); 

          // const lastChar = this.platforms.map(function(el, i) {
          //   return { index: i, value: el.charAt(this.platform.length-1)}
          // })

          // lastChar.sort((a,b) => {
          //   return (a > b) ? 1 : -1;
          // });

          // var result = lastChar.map(function(el){
          //   return this.timetable[el.index]
          // })

          // const platformNo = parseInt(lineTimetable.text);
          // return platformNo
          // platformNo.sort((a,b) => {
          //   return (a > b) ? 1 : -1;
          // }); 
      
          
          
        //   platformName.forEach(chronologicalise)
        //   function chronologicalise(item, i, arr) {
        //     // arr[i] = item
        //     arr[i] = item.match(/(\d+)/)
        //   }

        //   this.platforms = platformName.sort((a,b) => {
        //     return (a > b) ? 1 : -1;
        //   });
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
    getLiveTimetable() {
      // this is called when plaform selected and renders correct timetable info
      this.isLoaded = true;
      this.countdown();
      this.platformArrivals = this.timetable.filter(x => {
        return x.platformName === this.platform && x.lineId === this.lineId
      });
      return this.platformArrivals.sort((a, b) => {
        return a.timeToStation - b.timeToStation;
      });
    },
    refresh() {
      this.seconds = 30
      this.timer = null
      this.getPlatformInfo();
      this.getLiveTimetable();
      // clearInterval(this.timer)
			// this.timer = null
      
    }
  },

  created: function(){
    getTubeLines()
    .then(response => { this.lines = response })
    // .catch(error => console.log(error))
  }
}
</script>


