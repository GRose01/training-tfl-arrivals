<template>
    <div>
        <h1>Platforms</h1>
        <singleDropdown 
          :forLabel="platformLabel"
          :labelText="platformText"
          :initialValue="platformPlaceholder"
          :options="platforms"
          @itemChanged="platform = $event"
        ></singleDropdown>
    
    </div>
</template>

<script>
    import { getPlatforms } from "../requests.js";
    import singleDropdown from '../components/SingleDropdown.vue';
    import { dedupe } from '../utilities/dedupe.js'

    export default {
        name: "Platforms",
        data () {
            return {
              timetable: [],
              platformLabel: "platforms",
              platformText: "Platform: ",
              platformPlaceholder: "Choose a platform",
              platforms: [],
              platform: ''
            }
        },
        components: {
            'singleDropdown': singleDropdown
        },
        methods: {
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
        },
        watch: {
            
        }
    }
</script>