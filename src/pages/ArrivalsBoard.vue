<template>
    <div>
        <h1>Arrivals board</h1>

        <p>current line: {{ lineId }} </p>
        <p>current stoppoint: {{ stopPoint }} </p> 
        <p>current platform: {{ platform }} </p>  

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
                seconds: 30,
                isLoaded: false
            }
        },
        components: {
            
        },
        computed: {
          ...mapState(['lineId']),
          ...mapState(['stopPoint']),
          ...mapState(['platform'])
        },
        methods: {
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
        }
    }
</script>