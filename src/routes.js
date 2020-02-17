import Home from './pages/Home.vue'
import Stations from './pages/Stations.vue'
import Platforms from './pages/Platforms.vue'
import ArrivalsBoard from './pages/ArrivalsBoard.vue'

const routes = [
    {path: '/', component: Home},
    {path: '/stations', component: Stations},
    {path: '/platforms', component: Platforms},
    {path: '/arrivals', component: ArrivalsBoard}
];

export default routes;


// to make it dynamic:
// const routes = [
//     { path: '/', component: () => import('./Home.vue') }
//     { path: '/about', component: () => import('./About.vue') }
//   ]