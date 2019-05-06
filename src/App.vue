<template>
    <component v-bind:is="layout">
        <slot/>
    </component>
</template>

<script>
    import AdminLayout from './layouts/Admin'
    import AuthLayout from './layouts/Auth'

    export default {
        name: 'App',
        props: {
            layout: String
        },
        components: {
            AdminLayout,
            AuthLayout
        },
        created: function() {
            this.$axios('site-general-config')
                .then((response) => {
                    this.$store.dispatch('updateAppKey', {key: 'configs', value:  response.data.data});
                })

            this.$axios('device/user')
                .then((response) => {
                    this.$store.dispatch('updateAppKey', {key: 'device_users', value:  response.data.device_users});
                })
        }
    }
</script>
