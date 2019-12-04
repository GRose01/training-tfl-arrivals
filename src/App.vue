<template>
  <div id="main-app" class="container">
    <h2>{{title}}</h2>
    <!-- <h4>{{currentTime}}</h4> -->
    <div v-for="(item, i) in tubeLine" v-bind:key="i">
        <table>
            <tr>
                <th>{{i}}</th>
                <th>{{item.lineName}}</th>
                <th>to {{item.destinationName}}</th>
            </tr>
            <tr>
                <td>Time until arrival:</td>
                <td>{{Math.floor(item.timeToStation/60)}} mins</td>
            </tr>
        </table>
    </div>
  </div>
</template>

<script>
import axios from "axios";
// import moment from "moment";

export default {
  name: "MainApp",
  data () {
    return {
      title: "Arrivals board",
      // currentTime: moment("dddd, MMMM Do YYYY, h:mm:ss a"),
      tubeLine: [],
      stopPoint: "940GZZLUASL",
      serviceType: "Night"
    };
  },
  mounted() {
    axios
      .get('https://api.tfl.gov.uk/StopPoint/' + this.stopPoint + '/Arrivals')
      .then(response => (this.tubeLine = response.data))
      // .catch(error => console.log(error))
  }
};
</script>


