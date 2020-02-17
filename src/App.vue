<template>
  <div id="app" class="container">
    <h2>{{title}}</h2>
    <topNav></topNav>
    <router-view />
  </div>
</template>

<script>
import topNav from './components/TopNav.vue'

export default {
  name: "App",
  data () {
    return {
      title: "Arrivals board",
    };
  },
  components: {
    'topNav': topNav
  },
  methods: {
    // setLineData: function(event) {
    //   this.lineId = event.target.value
    // },
    // getStationsInfo() {
    //   // this gets the stoppoints from line ID and sets stoppoint when station is selected
    //   clearInterval(this.timer)
    //   if (this.lineId != null || this.lineId != undefined) {
    //     getStations(this.lineId)
    //       .then(response => { 
    //         this.stations = response.map(i => {
    //           return { name: i.commonName, value: i.id }
    //         })
    //       })
    //       .catch(error => alert(error.name))
    //   }
    // },
    // getPlatformInfo() {
    //   // this is called when station is selected. It gets the arrival info and populates the platform
    //   clearInterval(this.timer)
    //   if (this.stopPoint != null  || this.lineId != undefined) {
    //     getPlatforms(this.stopPoint)
    //       .then(response => {
    //         this.timetable = response
            
    //         const lineTimetable = this.timetable.filter(x => {
    //           return x.lineId === this.lineId
    //         });

    //         const duplicatedPlatforms = lineTimetable.map(i => {
    //           return { name: i.platformName, value: i.platformName }
    //         })

    //         this.platforms = dedupe(duplicatedPlatforms)
    //             .sort((a, b) => (a.name[a.name.length - 1] > b.name[b.name.length - 1]) ? 1 : -1)
    //         })
    //         .catch(error => alert(error.name))
    //   }    
    // },
  //   getLiveTimetable() {
  //     // this is called when plaform selected and renders correct timetable info
  //     this.isLoaded = true;
  //     this.refresh();
  //     this.platformArrivals = this.timetable.filter(x => {
  //       return x.platformName === this.platform && x.lineId === this.lineId
  //     });
  //     return this.platformArrivals.sort((a, b) => {
  //       return a.timeToStation - b.timeToStation;
  //     });
  //   },
  //   countdown() {
  //     if (!this.timer) {
  //       this.timer = setInterval(() => {
  //         if (this.seconds > 0) {
  //           this.seconds -= 1
  //         } else {
  //           clearInterval(this.timer)
  //           this.refresh()
  //         }
  //       }, 1000)
  //     }
  //   },
  //   refresh() {
  //     clearInterval(this.timer)
  //     this.seconds = 30
  //     this.timer = null
  //     this.countdown()  
  //   }
  // },
  // watch: {

  //   stopPoint () {
  //     this.getPlatformInfo()
  //   },
  //   platform () {
  //     this.getLiveTimetable()
  //   }
  // },
  
  }
}
</script>

<style>
  @import './style.css';
</style>


