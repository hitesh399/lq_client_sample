import Cookies from 'js-cookie'

const TokenKey = 'X-TOKEN';
const RefreshTokenKey = 'X-REFRESH-TOKEN';
const ReviceIdKey = 'DEVICE-ID';
import { _axios } from '@/plugins/axios';
import { removeSlashes } from '@/utils';
import portals from '../../portals';
/**
 * To get the Authentication token
 */
export function getToken() {
  return Cookies.get(TokenKey)
}

/**
 * To Get the Refresh Token
 */
export function getRefreshToken() {
  return Cookies.get(RefreshTokenKey)
}
/**
 * To get the device token
 */
export function getDeviceId() {
  return Cookies.get(ReviceIdKey)
}

export function setToken(token, path, domain) {
  return Cookies.set(TokenKey, token, {expires: 30, path, domain})
}

export function setRefreshToken(token, path, domain) {
  return Cookies.set(RefreshTokenKey, token, {expires: 45, path, domain})
}

export function setDeviceId(deviceId) {
  return Cookies.set(ReviceIdKey, deviceId, {expires: 200000})
}

export function removeToken() {
  return Cookies.remove(TokenKey)
}

export function removeRefreshToken() {
  return Cookies.remove(RefreshTokenKey)
}

export function removeDeviceId() {
  return Cookies.remove(ReviceIdKey)
}

export function setTokens(token, path, domain) {
  path = '/' + removeSlashes(path)
  setToken(token.access_token, path , domain)
  setRefreshToken(token.access_token, path, domain)
}
export function makeLandingUrlForMultiLogin (url, login_index) {
  return new URL([ url.replace(/\/+$/g, ''), 'u', login_index ].join('/'));
}
export function makeLandingUrlForSingleLogin (url) {
  return new URL(url.replace(/\/+$/g, ''));
}
export function getPortalUrl(name, login_index) {

  const my_portal = portals[name]
  const multi_login  = my_portal.VUE_APP_MULTI_LOGIN
  const landing_page = [
          removeSlashes(my_portal.VUE_APP_BASE_URL),
          removeSlashes(my_portal.VUE_APP_DOMAIN_PREFIX)
  ].join('/');
  return multi_login ? makeLandingUrlForMultiLogin(landing_page, login_index) : makeLandingUrlForSingleLogin(landing_page)
}
/**
 * To logout the user and redirect to login page.
 */
export function logOutUser() {
  return _axios({
    url: 'logout',
    method: 'PATCH',    
  })
    .then(() => {
      removeToken();
      removeRefreshToken();
      window.location.href = process.env.VUE_APP_AUTH_URL;
    })
    .catch(() => {
      removeToken();
      removeRefreshToken();
      window.location.href = process.env.VUE_APP_AUTH_URL;

    })
}
export function myProfile() {
  return _axios({
    url: 'my-profile',
    method: 'GET',    
  })
}
export function generateToken() {
  return _axios({
    url: 'generate-token',
    method: 'POST',    
  })
}