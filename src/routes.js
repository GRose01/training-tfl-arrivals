import Home from './pages/Home.vue'
import Stations from './pages/Stations.vue'
import Platforms from './pages/Platforms.vue'
import ArrivalsBoard from './pages/ArrivalsBoard.vue'

const routes = [
    {path: '/', component: Home},
    {path: '/stations/:id', name: 'Stations', component: Stations},
    {path: '/platforms/:id', name: 'Platforms', component: Platforms},
    {path: '/arrivals/:id', name: 'Arrivals', component: ArrivalsBoard}
];

export default routes;