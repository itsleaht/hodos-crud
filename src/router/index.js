import Vue from 'vue'
import Router from 'vue-router'
// Character
import Character from '../components/Character/Character'
import FormCharacter from '../components/Character/FormCharacter'
import ListCharacter from '../components/Character/ListCharacter'
import ViewCharacter from '../components/Character/ViewCharacter'
// Place
import Place from '../components/Place/Place'
import FormPlace from '../components/Place/FormPlace'
import ListPlace from '../components/Place/ListPlace'
import ViewPlace from '../components/Place/ViewPlace'
// Chapter
import Chapter from '../components/Chapter/Chapter'
import ListChapter from '../components/Chapter/ListChapter'
import FormChapter from '../components/Chapter/FormChapter'
import ViewChapter from '../components/Chapter/ViewChapter'

import Skill from '../components/Skill/Skill'
import ListSkill from '../components/Skill/ListSkill'
import FormSkill from '../components/Skill/FormSkill'
import ViewSkill from '../components/Skill/ViewSkill'

Vue.use(Router)

export default new Router({
  mode: 'history',
  base: '/hodos-bo/',
  routes: [
    {
      path: '/',
      redirect: {
        name: 'listCharacter'
      }
    },
    {
      path: '/personnages',
      name: 'characters',
      component: Character,
      children: [
        {
          path: 'list',
          name: 'listCharacter',
          component: ListCharacter
        },
        {
          path: 'create',
          name: 'createCharacter',
          component: FormCharacter
        },
        {
          path: 'edit/:id',
          name: 'editCharacter',
          component: FormCharacter
        },
        {
          path: 'view/:id',
          name: 'viewCharacter',
          component: ViewCharacter
        }
      ]
    },
    {
      path: '/lieux',
      name: 'place',
      component: Place,
      children: [
        {
          path: 'list',
          name: 'listPlace',
          component: ListPlace
        },
        {
          path: 'create',
          name: 'createPlace',
          component: FormPlace
        },
        {
          path: 'edit/:id',
          name: 'editPlace',
          component: FormPlace
        },
        {
          path: 'view/:id',
          name: 'viewPlace',
          component: ViewPlace
        }
      ]
    },
    {
      path: '/chapitre',
      name: 'chapter',
      component: Chapter,
      children: [
        {
          path: 'list',
          name: 'listChapter',
          component: ListChapter
        },
        {
          path: 'create',
          name: 'createChapter',
          component: FormChapter
        },
        {
          path: 'edit/:id',
          name: 'editChapter',
          component: FormChapter
        },
        {
          path: 'view/:id',
          name: 'viewChapter',
          component: ViewChapter
        }
      ]
    },
    {
      path: '/competences',
      name: 'skill',
      component: Skill,
      children: [
        {
          path: 'list',
          name: 'listSkill',
          component: ListSkill
        },
        {
          path: 'create',
          name: 'createSkill',
          component: FormSkill
        },
        {
          path: 'edit/:id',
          name: 'editSkill',
          component: FormSkill
        },
        {
          path: 'view/:id',
          name: 'viewSkill',
          component: ViewSkill
        }
      ]
    }
  ]
})
