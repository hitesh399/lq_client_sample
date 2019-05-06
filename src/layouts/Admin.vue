<template>
    <v-app>
        <side-bar />
        <top-bar />
        <v-content>
            <v-slide-y-transition mode="out-in">
                <router-view/>
            </v-slide-y-transition>
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
}
</script>
