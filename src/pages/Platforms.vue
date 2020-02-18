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
        <button @click="changePlatform">Change Platform</button>
        <p>current line: {{ lineId }} </p>
        <p>current stoppoint: {{ stopPoint }} </p> 
        <p>current platform: {{ currentPlatform }} </p>  
    </div>
</template>

<script>
    import { getPlatforms } from "../requests.js";
    import singleDropdown from '../components/SingleDropdown.vue';
    import { dedupe } from '../utilities/dedupe.js'
    import { mapState } from 'vuex'

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
        computed: {
          ...mapState(['lineId']),
          ...mapState(['stopPoint']),
          currentPlatform() {
                return this.$store.state.platform
            }
        },
        methods: {
          changePlatform() {
                this.$store.dispatch('changePlatform', this.platform)
            }
        },
        created: function() {
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
        
    }
</script>