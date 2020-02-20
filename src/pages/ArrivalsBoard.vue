<template>
    <div>
        <h1>Arrivals board</h1>
        <div>Line selected: {{ $route.params.lineId }}</div>
        <div>Station selected: {{ $route.params.stopPoint }}</div>
        <div>Platform selected: {{ $route.params.platform }}</div>

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
    import { mapState } from 'vuex'

    export default {
        name: "ArrivalsBoard",
        data () {
            return { 
                platformArrivals: [],
                timer: null,
                seconds: 60,
                isLoaded: false
            }
        },
        components: {
            
        },
        computed: {
          ...mapState(['timetable'])
        },
        methods: {
            getLiveTimetable() {
            // this is called when plaform selected and renders correct timetable info
                this.isLoaded = true;
                this.refresh();
                // eslint-disable-next-line no-console
                console.log('platform:', this.platform, 'line', this.lineId)
                const platform = this.$route.params.platform
                const line = this.$route.params.lineId

                this.platformArrivals = this.timetable.filter(x => {
                    return x.platformName === platform && x.lineId === line
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
                this.seconds = 60
                this.timer = null
                this.countdown()  
            }
        },
        created: function() {
            this.getLiveTimetable()
        }
    }
</script>