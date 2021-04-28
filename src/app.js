import uuid from 'uuid/v4';
import { getPageQuery } from '@/utils/utils';
import { getRoutes } from './services/user';

let serverRoutes = null;

function filterRoutes(routes, newRoutes) {
  routes.forEach((route) => {
    if (route.public) {
      return;
    }
    if (Array.isArray(newRoutes)) {
      const newRoute = newRoutes.find((nr) => nr.path === route.path);
      if (newRoute) {
        Object.assign(route, { name: newRoute.name, hideInMenu: !!newRoute.hideInMenu });
        if (route.routes) {
          filterRoutes(route.routes, newRoute.routes);
        }
      } else if (route.path) {
        Object.assign(route, { authority: uuid() });
      }
    }
  });
}

export function patchRoutes(routes) {
  filterRoutes(routes.routes[0].routes[0].routes, serverRoutes);
}

export function render(oldRender) {
  const params = getPageQuery();
  const { token } = params;
  if (!token) {
    getRoutes()
      .then((res) => {
        serverRoutes = res;
        oldRender();
      })
      .catch(() => oldRender());
  } else {
    oldRender();
  }
}
