<template>
    <div>
        <h1>Platforms</h1>
        <div>Line selected: {{ $route.params.lineId }}</div>
        <div>Station selected: {{ $route.params.stopPoint }}</div>          
        <grid
            title="Pick the Platform"
            :grid="platforms"
            @itemChanged="setSelectedItem"
            ></grid> 
    </div>
</template>

<script>
    import { getPlatforms } from "../requests.js";
    import grid from '../components/Grid.vue';
    import { dedupe } from '../utilities/dedupe.js';
    import { mapState, mapActions } from 'vuex';

    export default {
        name: "Platforms",
        props: {
            lineId: {
                type: String
            }, 
            stopPoint: {
                type: String
            }
        },
        data () {
            return {
              platforms: []
            }
        },
        components: {
            grid
        },
        computed: {
          ...mapState(['timetable'])
        },
        methods: {
          ...mapActions(['setTimetable']),
          setSelectedItem(platform) {
                this.$router.push({ path: `/${this.$route.params.lineId}/${this.$route.params.stopPoint}/${platform}` })   
          }
        },
        created: function() {
            getPlatforms(this.stopPoint)
            
                .then(response => {
                  this.setTimetable(response)
                  
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