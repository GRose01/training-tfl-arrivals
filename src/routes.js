import Home from './pages/Home.vue'
import Stations from './pages/Stations.vue'
import Platforms from './pages/Platforms.vue'
import ArrivalsBoard from './pages/ArrivalsBoard.vue'

const routes = [
    { path: '/', component: Home},
    { path: '/:lineId', name: 'Stations', component: Stations, props: true,
        children: [
            { path: ':stopPoint', name: 'Platforms', component: Platforms, props: true,
                children: [
                    { path: ':platform', name: 'Arrivals', component: ArrivalsBoard, props: true}
                ]    
            }
        ]
    }
];

export default routes;