import { runApp, IAppConfig } from 'ice';
import loading from '@/components/Loading';

const appConfig: IAppConfig = {
  app: {
    rootId: 'ice-container',
  },
  router: {
    type: 'browser',
    basename: '/',
    fallback: loading(),
    modifyRoutes: (routes) => {
      return routes;
    },
  },
};

runApp(appConfig);
