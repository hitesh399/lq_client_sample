<template>
    <div>
     <v-toolbar
        app
        flat
        dense
        color="primary"
        dark>
             <v-toolbar-side-icon
                @click.stop="$emit('toggle-left-drawer')"
                class="hidden-lg-and-up"
                :class="searching ? 'hidden-xs-only' : ''"
            />
            <v-spacer></v-spacer>
            <v-btn icon @click.native.stop="searchBegin">
                <v-icon>search</v-icon>
            </v-btn>
            <div :class="{'searching--closed': !searching}" class="searching">
                <v-text-field
                    id="search"
                    v-model="search"
                    append-icon="close"
                    @click:append="searchEnd"
                    label="Search"
                    hide-details
                    single-line
                    color="white"
                    @blur="onBlur"
                ></v-text-field>
            </div>

            <v-tooltip bottom>
                <v-btn icon @click.stop="rightDrawer = !rightDrawer" slot="activator">
                    <v-badge color="red" overlap>
                        <span slot="badge">2</span>
                        <v-icon>notifications</v-icon>
                    </v-badge>
                </v-btn>
                <span>2 unread notifications</span>
            </v-tooltip>
            <v-menu>
                <v-btn icon slot="activator">
                    <v-avatar class="white" size="32">
                        <v-icon color="primary">person</v-icon>
                    </v-avatar>
                </v-btn>
                <v-list class="pa-0" light>
                    <v-list-tile avatar>
                        <v-list-tile-avatar>
                            <v-avatar class="primary" size="48px">
                                <v-icon dark>person</v-icon>
                            </v-avatar>
                        </v-list-tile-avatar>
                        <v-list-tile-content>
                            <v-list-tile-title>{{ $helper.getProp(authProfile, 'name')}}</v-list-tile-title>
                            <v-list-tile-sub-title>{{ $helper.getProp(authProfile, 'role.title')}}</v-list-tile-sub-title>
                        </v-list-tile-content>
                    </v-list-tile>
                    <v-divider></v-divider>

                    <v-list-tile key="profile" @click="">
                        <v-list-tile-action>
                            <v-icon>person</v-icon>
                        </v-list-tile-action>
                        <v-list-tile-content>
                            <v-list-tile-title>My Profile</v-list-tile-title>
                        </v-list-tile-content>
                    </v-list-tile>
                    <v-divider></v-divider>

                    <v-list-tile key="lock_open" @click="logOut">
                        <v-list-tile-action>
                            <v-icon>lock_open</v-icon>
                        </v-list-tile-action>
                        <v-list-tile-content>
                            <v-list-tile-title>Logout</v-list-tile-title>
                        </v-list-tile-content>
                    </v-list-tile>
                </v-list>
            </v-menu>
        </v-toolbar>
        <notification :drawer="rightDrawer" @close="rightDrawer=false"/>
    </div>
</template>

<script>
import notification from './notification'
import { logOutUser } from '@/utils/auth'
import { mapGetters } from 'vuex'

export default {
    name: 'top-bar',
    components: {
        notification
    },
    computed: {
        ...mapGetters([
        'sidebar',
        'authProfile'
        ])
    },
    data: function() {
        return {
            search: '',
            searching: false,
            tabsItems: [
                {
                    id: 1,
                    title: 'Indicators',
                    link: 'indicators'
                },
                {
                    id: 2,
                    title: 'Backup',
                    link: 'backup'
                },
                {
                    id: 3,
                    title: 'Logs',
                    link: 'logs'
                }
            ],
            rightDrawer: false
        }
    },
    methods: {
        onBlur() {
            this.searching = false
            this.search = ''
        },

        searchBegin() {
            this.searching = true
            setTimeout(() => document.querySelector('#search').focus(), 50)
        },
        searchEnd() {
            this.searching = false
            this.search = ''
            document.querySelector('#search').blur()
        },
        logOut() {
            return logOutUser()
        }
    }
}
</script>

<style scoped lang="stylus">
    @import '../../../node_modules/lq-vuetify/src/stylus/settings/_variables.styl';
    .searching {
        overflow: hidden;
        width: 208px;
        padding-left: 8px;
        transition: $primary-transition;
    }

    .searching--closed {
        padding-left: 0;
        width: 0;
    }

    .searching > * {
        right: 8px;
    }

    .searching--closed > * {
        display: none;
    }

    .hidden-searching {
        @media $display-breakpoints.sm-and-down {
            display: none !important;
        }
    }

</style>
