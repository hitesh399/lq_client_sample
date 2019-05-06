import { landingUrl, removeSlashes } from '@/utils'
import {
    getToken, 
    myProfile, 
    removeToken, 
    getRefreshToken, 
    setTokens, 
    generateToken,
    removeRefreshToken,
    makeLandingUrlForMultiLogin,
    makeLandingUrlForSingleLogin 
} from '@/utils/auth'

import store from '../store'

export default (layoutName, router, main) => { 
    // Add the login index in url, if portal allows the multi login feature
    const login_index = window.location.toString().match(/\/u\/[0-9]+\/?/g);
    if (!login_index && process.env.VUE_APP_MULTI_LOGIN) {
        window.location.href = landingUrl('/u/0')
    } else if (getToken()) {
        myProfile()
        .then((response) => {
            store.dispatch('profile/set', { data: response.data.user });
            main({ layout: layoutName }, router)
        }).catch(() => {
            const refreshToken = getRefreshToken();
            if(refreshToken) {
                generateToken({refresh_token: refreshToken})
                    .then((response) => {
                        const landing_page = [
                                removeSlashes(process.env.VUE_APP_BASE_URL),
                                removeSlashes(process.env.VUE_APP_DOMAIN_PREFIX)
                        ].join('/');
                        const { device, token } = response.data
                        const multi_login  = process.env.VUE_APP_MULTI_LOGIN
                        const login_index = device.login_index
                        const url = multi_login ? makeLandingUrlForMultiLogin(landing_page, login_index) : makeLandingUrlForSingleLogin(landing_page)
                        setTokens(token, url.pathname, url.hostname)
                        store.dispatch('profile/set', {data: response.data.user})
                        main({ layout: layoutName }, router)

                    }).catch(() => {
                        removeToken();
                        removeRefreshToken();
                        window.location.href = process.env.VUE_APP_AUTH_URL;
                    })
            } else {
                removeToken();
                window.location.href = process.env.VUE_APP_AUTH_URL;
            }
        })
    }
    else {
        window.location.href = process.env.VUE_APP_AUTH_URL;
    }
}