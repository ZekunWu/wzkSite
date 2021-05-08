import { lazy } from 'ice';
import BasicHeader from '@/layouts/BasicHeader';
const BasicLayout = lazy(() => import('@/layouts/BasicLayout')) ;
const Dashboard = lazy(() => import('@/pages/Dashboard')) ;
const Home = lazy(() => import('@/pages/Home'));
const Effect = lazy(() => import('@/pages/Effect'));
const Editor = lazy(() => import('@/pages/Editor'));

const routerConfig = [
  {
    path: '/',
    component: BasicHeader,
    children: [
      {
        path: '/',
        exact: true,
        component: Home,
      },
      {
        path: '/effect',
        exact: true,
        component: Effect,
      },
      {
        path: '/editor',
        exact: true,
        component: Editor,
      },
    ],
  },
  {
    path: '/init',
    component: BasicLayout,
    children: [
      {
        path: '/',
        exact: true,
        component: Dashboard,
      },
      {
        path: '/test',
        redirect: '/init',
      },
    ],
  },
];
export default routerConfig;
