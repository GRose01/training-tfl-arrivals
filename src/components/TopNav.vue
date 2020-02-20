<template>
    <div>
        <p>--------------Header-----------------</p>
        <nav>
            <router-link to='/'>Back to Start</router-link>
            <a href="#" @click="goBack">Go Back a step</a>
            <!-- <router-link to='/stations'>Stations</router-link>
            <router-link to='/platforms'>Platforms</router-link>
            <router-link to='/arrivals'>Arrivals Board</router-link> -->
        </nav>  
        <p>-------------------------------------</p>     
    </div>
</template>

<script>
export default {
     methods: {
        goBack() {
            window.history.length > 1 ? this.$router.go(-1) : this.$router.push('/')
        }
    }
}
</script>