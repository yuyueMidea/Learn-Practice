import {createRouter, createWebHistory} from 'vue-router'
import Home from '../components/Home.vue'
// import Contact from '../components/Contact.vue'
const router = createRouter(
    {
        history: createWebHistory(),
        routes: [
            {path: '/', component: Home},
            { path: '/eggs/:eggType', name: 'eggs', component: () => import('../components/Contact.vue') },
            { path: '/eggs', redirect: '/eggs/chicken-egg' },
            { path: '/:pathMatch(.*)*', component: () => import('../components/NotFound.vue') }
        ]
    }
)

export default router