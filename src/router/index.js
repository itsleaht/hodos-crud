import Vue from 'vue'
import Router from 'vue-router'
import Personnage from '@/components/Personnage/Personnage'
import FormPersonnage from '@/components/Personnage/FormPersonnage'
import ListPersonnage from '@/components/Personnage/ListPersonnage'
import Lieu from '@/components/Lieu/Lieu'
import FormLieu from '@/components/Lieu/FormLieu'
import ListLieu from '@/components/Lieu/ListLieu'

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/personnages',
      name: 'personnages',
      component: Personnage,
      children: [
        {
          path: 'list',
          name: 'listPersonnage',
          component: ListPersonnage,
        },
        {
          path: 'create',
          name: 'createPersonnage',
          component: FormPersonnage,
        },
        {
          path: 'edit/:id',
          name: 'editPersonnage',
          component: FormPersonnage,
        }
      ]
    },
    {
      path: '/lieux',
      name: 'lieux',
      component: Lieu,
      children: [
        {
          path: 'list',
          name: 'listLieu',
          component: ListLieu,
        },
        {
          path: 'create',
          name: 'createLieu',
          component: FormLieu,
        },
        {
          path: 'edit/:id',
          name: 'editLieu',
          component: FormLieu,
        }
      ]
    },
  ]
})
