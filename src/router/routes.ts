import { RouteRecordRaw } from 'vue-router';

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    component: () => import('layouts/TravelBookLayout.vue'),
    children: [
      { path: '', 
        name: 'home',
        component: () => import('pages/BookPage.vue') 
      },
      { path: '/:id', 
        name: 'book-detail',
        component: () => import('pages/TravelBookDetail.vue')
      }
    ],
  },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: '/:catchAll(.*)*',
    component: () => import('pages/ErrorNotFound.vue'),
  },
];

export default routes;
