import { defineConfig } from 'umi';
import pageRouter from './router/index'
export default defineConfig({
  nodeModulesTransform: {
    type: 'none',
  },
  layout: {
    name: 'Sunry Design',
    locale: true,
  },
  routes: pageRouter.routes,
  hash: true
});
