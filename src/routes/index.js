import { createRouter, createWebHistory } from "vue-router";
const routes = [{
    path:'/',
    redirect:'/dashboard'
},
{
    path:'/dashboard',
    name: 'Dashboard',
    component: ()=> import('../components/Movies/MoviesList.vue')
},
{
    path:'/movieDetails',
    name: 'MovieDetails',
    component: ()=> import('../components/Movies/MovieDetails.vue'),
},
{
    path:'/:pathMatch(.*)*',
    redirect: '/dashboard'
}
]
const router = createRouter({
    history: createWebHistory(),
    routes,
})
export default router