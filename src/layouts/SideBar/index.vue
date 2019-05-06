<template>
    <v-navigation-drawer
        width="250"
        class="blue-grey darken-4"
        dark
        persistent
        :mini-variant="miniVariant"
        v-model="drawer"
        fixed
        app>
        <v-toolbar flat class="transparent" dense>
            <v-list class="pa-0" :class="{'list-border-bottom' : miniVariant}">
                <v-list-tile>
                    <v-list-tile-action v-if="!miniVariant">
                        <v-icon large color="orange">invert_colors</v-icon>
                    </v-list-tile-action>
                    <v-list-tile-content v-if="!miniVariant">
                        <v-list-tile-title>
                            <h2 v-text="currentRouteName"></h2>
                        </v-list-tile-title>
                    </v-list-tile-content>
                    <v-list-tile-action>
                        <v-btn icon @click.stop="miniVariant = !miniVariant">
                            <v-icon v-html="miniVariant ? 'chevron_right' : 'chevron_left'"></v-icon>
                        </v-btn>
                    </v-list-tile-action>
                </v-list-tile>
            </v-list>
        </v-toolbar>
        <v-divider></v-divider>
        <v-toolbar flat class="transparent" dense>
            <v-list class="pa-0" :class="{'list-border-bottom' : miniVariant}">
                <sidebar-item 
                    :item="route" 
                    :mini-variant="miniVariant"
                    v-for="route in routes" 
                    :key="route.name || route.title">
                </sidebar-item>
            </v-list>
        </v-toolbar>
    </v-navigation-drawer>
    
</template>

<script>
import SidebarItem from './sidebar-item'
export default {
    name: 'sidebar',
    components: {
        SidebarItem
    },
    data: function() {
        return {
            miniVariant: false,
            appName: 'Singsys',
            drawer: true
        }
    },
    computed: {
        routes() {
            return this.$router.options.routes
        },
        currentRouteName() {
            console.log('this.$router.currentRoute', this.$router.currentRoute);
            return this.$router.currentRoute.name;
        }
    }
}
</script>

<style>

</style>
