<template>
    <!-- <component :is="component">
        <slot/>
    </component> -->
    <login-layout />
</template>

<script>
    import VuebaseLayout from './layouts/VuebaseLayout'
    import AdminLayout from './layouts/Admin'
    import LoginLayout from './layouts/Login'

    export default {
        name: 'App',

        components: {
            VuebaseLayout,
            AdminLayout,
            LoginLayout
        },

        computed: {
            component() {
                return AdminLayout
            }
        }
    }
</script>
