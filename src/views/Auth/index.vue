<template>
    <div>
        <v-alert
            :value="alert.show"
            :color="alert.color"
            icon="new_releases"
            >
            {{alert.message}}
        </v-alert>
        <v-list two-line v-if="deviceUsers && deviceUsers.length">
          <template v-for="(user) in deviceUsers">
            <v-list-tile
              :key="user.id"
              avatar
              @click="$helper.getProp(user, 'pivot.active') !== 'Yes' ? null :goTolandingPage(user.role.landing_portal, user.pivot.login_index)"
            >
              <v-list-tile-avatar>
                <v-avatar class="primary" size="48px">
                    <v-icon dark>person</v-icon>
                </v-avatar>
              </v-list-tile-avatar>

              <v-list-tile-content>
                <v-list-tile-title >
                    {{user.name}}
                    {{$helper.getProp(user, 'pivot.active') === 'No' ? ' (Logged Out)' : ''}}
                </v-list-tile-title>
                <v-list-tile-sub-title>
                    {{user.role.title}}
                </v-list-tile-sub-title>
              </v-list-tile-content>
              <v-list-tile-action >
                  <v-btn icon ripple @click.stop="revoke(user.id)" v-if="$helper.getProp(user, 'pivot.active') === 'No'">
                    <v-icon  color="grey lighten-1">delete</v-icon>
                  </v-btn>
                  <v-btn icon ripple v-else @click.stop="logOut(user.role.landing_portal, user.pivot.login_index)">
                      <v-icon color="grey lighten-1">lock_open</v-icon>
                  </v-btn>
              </v-list-tile-action>
            </v-list-tile>
          </template>
        </v-list>
        <lq-v-form name="login" 
            action="login" 
            :rules="rules" 
            ref="form" 
            @submited-success="loginSuccess"
            @submited-error="loginError"
            autocomplete="off">
            <lq-v-text-field
                label="Enter your e-mail address"
                autocomplete="new-password"
                :autofocus="true"
                @keyup.enter="() => $refs.form.submit()"
                id="email" />
            <lq-v-text-field
                label="Enter your password"
                id="password"
                maxlength="12"
                :append-icon="e1 ? 'visibility' : 'visibility_off'"
                @click:append="() => (e1 = !e1)"
                @keyup.enter="() => $refs.form.submit()"
                :type="e1 ? 'password' : 'text'"
                browser-autocomplete="new-password"
                counter
                :max="4"
            ></lq-v-text-field>
            <v-layout justify-space-between>
                <lq-v-submit-btn label="Login" />
                <a href="">Forgot Password</a>
            </v-layout>
        </lq-v-form>
    </div>
</template>
<script>

import { setTokens, getPortalUrl } from '@/utils/auth';

export default {
    name: 'Login-page',
    data: function () {
        return {
            e1: false,
            rules: {
                email: {presence: true, email: true},
                password: {presence: {allowEmpty: false}},
            },
            alert: {
                show: false,
                color: 'success',
                message: ''
            }
        }
    },
    computed: {
        deviceUsers: function () {
            return this.$helper.getProp(this.$store.state, 'app.device_users')
        }
    },
    methods: {
        loginSuccess: function(response) {
            const portal = this.$helper.getProp(response, 'data.user.role.landing_portal');
            if (portal) {
                const login_index = this.$helper.getProp(response, 'data.device.login_index')
                const url = getPortalUrl(portal, login_index)
                const tokens = this.$helper.getProp(response, 'data.token')
                setTokens(tokens, url.pathname, url.hostname)
                window.location.href = url.toString()

            } else {
                this.alert = {
                    show: true,
                    color: 'error',
                    message: 'You do not have the access of Web Portal, Please contact to Admin.'
                }
            }
        },
        loginError: function(response) {

        },
        goTolandingPage: function(portal, login_index) {
            window.location.href =  getPortalUrl(portal, login_index).toString()
        },
        logOut: function(portal, login_index) {
            window.location.href =  getPortalUrl(portal, login_index).toString() + '/logout'
        },
        revoke: function (user_id) {
            
            this.deviceUsers.forEach( (user, index) => {
                if(user.id === user_id) {
                    this.$store.dispatch('deleteAppKey', {key: `device_users.${index}`})
                }
            })
            this.$axios({
                url: 'device/user/' + user_id + '/revoke',
                method: 'PATCH'
            })
        }
    }
}
</script>

