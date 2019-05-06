<template>
    <h3>Requesting to Log Out...</h3>
</template>

<script>
import { logOutUser } from '@/utils/auth'

export default {
    name: 'logout',
    created: function() {
        logOutUser()
    }
}
</script>

<style>

</style>
