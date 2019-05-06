<template>
    <v-app>
        <side-bar ref="sidebar"/>
        <top-bar @toggle-left-drawer="toggleLeftDrawer"/>
        <v-content>
            <router-view/>
        </v-content>
    </v-app>
</template>
<script>
import SideBar from './SideBar';
import TopBar from './TopBar';
export default {
    components: {
        SideBar,
        TopBar
    },
    name: 'admin-layout',
    methods: {
        toggleLeftDrawer: function() {
            if (this.$refs.sidebar) {
                this.$refs.sidebar.drawer = !this.$refs.sidebar.drawer 
            }
        }
    }
}
</script>
