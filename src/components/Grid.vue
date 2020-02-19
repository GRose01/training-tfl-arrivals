<template>
    <div class="grid">
        <h3>{{ title }}</h3>
        <div class="card">
            <div>
                <h5 
                v-for="card in grid" 
                :key="card.value" 
                :value="card.value"
                @click="changeLine(card.value)"               
                >{{ card.name }}</h5>
            </div>
        </div>
        
    </div>
</template>

<script>
import { mapActions } from 'vuex'
export default {
    props: {
        grid: {
            type: Array,
            required: true
        },
        title: String
    },
    data() {
        return {

        }
    },
    methods: {
        ...mapActions(['changeLine']),
    }
}
</script>