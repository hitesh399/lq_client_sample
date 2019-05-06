/**
 * Created by jiachenpan on 16/11/18.
 */

// import store from '@/store'

export function isExternal(path) {
  return /^(https?:|mailto:|tel:)/.test(path)
}

export function guidGenerator() {
  var S4 = function() {
     return (((1+Math.random())*0x10000)|0).toString(16).substring(1);
  };
  return (S4()+S4()+"-"+S4()+"-"+S4()+"-"+S4()+"-"+S4()+S4()+S4());
}

export function getRouterBaseUrl() {
  const login_index = window.location.toString().match(/\/u\/[0-9]+\/?/g);
  let  prefix = [];
  if (process.env.VUE_APP_DOMAIN_PREFIX) {
    prefix.push(removeSlashes(process.env.VUE_APP_DOMAIN_PREFIX))
  }

  if (login_index && process.env.VUE_APP_MULTI_LOGIN) {
    prefix.push(removeSlashes(login_index[0]));
  }
  // console.log('prefix', prefix)
  return removeSlashes(prefix.filter(f => f).join('/')) + '/'
}
export function landingUrl(suffix) {
  return [
    removeSlashes(process.env.VUE_APP_BASE_URL), 
    removeSlashes(process.env.VUE_APP_DOMAIN_PREFIX),
    suffix ? removeSlashes(suffix) : ''
  ].filter(f => f).join('/').toString();
}
export function removeSlashes(path) {
  return path.replace(/^\/+/g, '').replace(/\/+$/g, '');
}

// /**
//  * Check the Authority.
//  * @param {String|Array} permissions 
//  */
// export function canAccess (permissions) {
  
//   if(!permissions) {
//     return true;
//   }

//   if(typeof permissions ==='string') {
//     permissions = [permissions];
//   }

//   let has_access = false;
//   permissions.map(function(permission) {
    
//     if(store.getters.permissions.indexOf(permission) !== -1 || (store.getters.authProfile && store.getters.authProfile.role_id === 1) ) {
//       has_access = true;
//     }
//   })

//   return has_access;
// }