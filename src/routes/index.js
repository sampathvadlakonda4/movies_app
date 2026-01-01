import { createRouter, createWebHistory } from "vue-router";
const routes = [{
    path: '/',
    redirect: '/dashboard'
},
{
    path: '/dashboard',
    name: 'Dashboard',
    component: () => import('@/pages/MoviesList.vue')
},
{
    path: '/movieDetails',
    name: 'MovieDetails',
    component: () => import('@/pages/MovieDetails.vue'),
},
{
    path: '/:pathMatch(.*)*',
    redirect: '/dashboard'
}
]
const router = createRouter({
    history: createWebHistory(),
    routes,
})
export default router