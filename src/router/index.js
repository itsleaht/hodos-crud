import Vue from 'vue'
import Router from 'vue-router'
import Personnage from '@/components/Personnage/Personnage'
import FormPersonnage from '@/components/Personnage/FormPersonnage'
import ListPersonnage from '@/components/Personnage/ListPersonnage'
import Lieu from '@/components/Lieu/Lieu'
import FormLieu from '@/components/Lieu/FormLieu'
import ListLieu from '@/components/Lieu/ListLieu'
import ViewPersonnage from '../components/Personnage/ViewPersonnage'
import ViewLieu from '../components/Lieu/ViewLieu'

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
          component: ListPersonnage
        },
        {
          path: 'create',
          name: 'createPersonnage',
          component: FormPersonnage
        },
        {
          path: 'edit/:id',
          name: 'editPersonnage',
          component: FormPersonnage
        },
        {
          path: 'view/:id',
          name: 'viewPersonnage',
          component: ViewPersonnage
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
          component: ListLieu
        },
        {
          path: 'create',
          name: 'createLieu',
          component: FormLieu
        },
        {
          path: 'edit/:id',
          name: 'editLieu',
          component: FormLieu
        },
        {
          path: 'view/:id',
          name: 'viewLieu',
          component: ViewLieu
        }
      ]
    }
  ]
})
