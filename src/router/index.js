import Vue from 'vue'
import Router from 'vue-router'
import store from '../store'

import BriefTC from '@/components/pages/Onboarding/BriefTC'
import CompanyProfile from '@/components/pages/CompanyProfile/index'
import ConfidenceMatching from '@/components/pages/ConfidenceMatching/index'
import ContactOrgAdmin from '@/components/pages/Errors/ContactOrgAdmin'
import Dashboard from '@/components/pages/Dashboard/Dashboard'
import Error404 from '@/components/pages/Errors/Error404'
import Error500 from '@/components/pages/Errors/Error500'
import Error503 from '@/components/pages/Errors/Error503'
import MasterFileUploaded from '@/components/pages/Errors/MasterFileUploaded'
import GenericError from '@/components/pages/Errors/GenericError'
import NoSearchResults from '@/components/pages/Search/NoResults'
import Onboarding from '@/components/pages/Onboarding/Onboarding'
import OrganizationUnderReview from '@/components/pages/Errors/OrganizationUnderReview'
import OrgRegistration from '@/components/pages/Onboarding/OrgRegistration'
import RegistrationSuccess from '@/components/pages/Errors/RegistrationSuccess'
import SearchResults from '@/components/pages/Search/ResultsTable'
import Settings from '@/components/pages/Settings/index'
import SignOut from '@/components/pages/SignOut'
import Start from '@/components/pages/Start'
import UploadMasterList from '@/components/pages/UploadMasterList/index'

Vue.use(Router)

const router = new Router({
  routes: [
    {
      path: '/',
      name: 'Start',
      component: Start
    },
    {
      path: '/manage-subscription',
      name: 'ManageSubscription',
      component: Settings,
      meta: {
        authRequired: true
      }
    },
    {
      path: '/onboarding',
      name: 'Onboarding',
      component: Onboarding,
      meta: {
        authRequired: true
      }
    },
    {
      path: '/org-reg',
      name: 'OrgRegistration',
      component: OrgRegistration,
      meta: {
        authRequired: true
      }
    },
    {
      path: '/pricing',
      name: 'Pricing',
      component: Settings,
      meta: {
        authRequired: true
      }
    },
    {
      path: '/brieftc',
      name: 'BriefTC',
      component: BriefTC,
      meta: {
        authRequired: true
      }
    },
    {
      path: '/dashboard',
      name: 'Dashboard',
      component: Dashboard,
      meta: {
        authRequired: true
      }
    },
    {
      path: '/dashboard/master',
      name: 'DashboardMaster',
      component: Dashboard,
      meta: {
        authRequired: true
      }
    },
    {
      path: '/dashboard/monitored',
      name: 'DashboardMonitored',
      component: Dashboard,
      meta: {
        authRequired: true
      }
    },
    {
      path: '/no-search-results',
      name: 'NoSearchResults',
      component: NoSearchResults,
      meta: {
        authRequired: true
      }
    },
    {
      path: '/my-company-profile',
      name: 'MyCompanyProfile',
      component: CompanyProfile,
      meta: {
        authRequired: true
      }
    },
    {
      path: '/company-profile/:trackId',
      name: 'CompanyProfile',
      component: CompanyProfile,
      meta: {
        authRequired: true
      }
    },
    {
      path: '/upload-master-list',
      name: 'UploadMasterList',
      component: UploadMasterList,
      meta: {
        authRequired: true
      }
    },
    {
      path: '/confidence-matching',
      name: 'ConfidenceMatching',
      component: ConfidenceMatching,
      meta: {
        authRequired: true
      }
    },
    {
      path: '/search-results',
      name: 'SearchResults',
      component: SearchResults,
      meta: {
        authRequired: true
      }
    },
    {
      path: '/sign-out',
      name: 'SignOut',
      component: SignOut
    },
    {
      path: '/generic-error',
      name: 'GenericError',
      component: GenericError,
      meta: {
        authRequired: true
      }
    },
    {
      path: '/organization-under-review',
      name: 'OrganizationUnderReview',
      component: OrganizationUnderReview,
      meta: {
        authRequired: true
      }
    },
    {
      path: '/contact-org-admin',
      name: 'ContactOrgAdmin',
      component: ContactOrgAdmin,
      meta: {
        authRequired: true
      }
    },
    {
      path: '/registration-success',
      name: 'RegistrationSuccess',
      component: RegistrationSuccess,
      meta: {
        authRequired: true
      }
    },
    {
      path: '/error-404',
      name: 'Error404',
      component: Error404,
      meta: {
        authRequired: true
      }
    },
    {
      path: '/master-file-uploaded',
      name: 'MasterFileUploaded',
      component: MasterFileUploaded,
      meta: {
        authRequired: true
      }
    },
    {
      path: '/error-503',
      name: 'Error503',
      component: Error503,
      meta: {
        authRequired: true
      }
    },
    {
      path: '/error-500',
      name: 'Error500',
      component: Error500,
      meta: {
        authRequired: true
      }
    },
    {
      path: '*',
      component: Error404
    }
  ]
})

router.beforeEach((to, from, next) => {
  const authRequired = to.matched.some(page => page.meta.authRequired)
  if (authRequired && !store.getters.isAuth) {
    next('/')
  } else {
    next()
  }
})

export default router
