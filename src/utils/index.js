import { intersection } from 'lodash';
// import roles from './roles'

export const isArrayWithLength = (arr) => {
 return (Array.isArray(arr) && arr.length)
}

export const getAllowedRoutes = (routes) => {
 const roles = JSON.parse(sessionStorage.getItem('roles'));
 return routes.filter(({ permission }) => {
  if(!permission) return true;
  else if(!isArrayWithLength(permission)) return true;
  else return intersection(permission, roles).length;
 });
}