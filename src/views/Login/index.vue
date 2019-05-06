<template>
    <lq-v-form name="login" action="test" :rules="rules" ref="form" autocomplete="off">
        <lq-v-text-field
            label="Enter your e-mail address"
            autocomplete="new-password"
            :autofocus="true"
            @click.enter="() => $refs.form.submit()"
            id="email" />
        <lq-v-text-field
            label="Enter your password"
            id="password"
            maxlength="12"
            :append-icon="e1 ? 'visibility' : 'visibility_off'"
            @click:append="() => (e1 = !e1)"
            @click.enter="() => $refs.form.submit()"
            :type="e1 ? 'password' : 'text'"
            browser-autocomplete="new-password"
            counter
            :max="4"
        ></lq-v-text-field>
        <v-layout justify-space-between>
            <v-btn color="info" type="submit">Login</v-btn>
            <a href="">Forgot Password</a>
        </v-layout>
    </lq-v-form>
</template>
<script>
export default {
    name: 'Login-page',
    data: function () {
        return {
            e1: true,
            rules: {
                email: {presence: true, email: true},
                password: {presence: {allowEmpty: false}},
            }
        }
    }
}
</script>

