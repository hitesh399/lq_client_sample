<template>
    <component v-if="hasChildren(item)"
        v-bind:is="rootComponent"
        :sub-group="subGroup"
        :value="matchedInCurrentRoute(item)"
        no-action>
        <template v-slot:activator>
            <v-list-tile>
                <v-list-tile-action v-if="$helper.getProp(item, 'meta.icon')">
                    <v-icon>{{item.meta.icon}}</v-icon>
                </v-list-tile-action>
                <v-list-tile-content>
                    <v-list-tile-title>{{ item.title }}</v-list-tile-title>
                </v-list-tile-content>
            </v-list-tile>
        </template>
        <sidebar-item 
            :item="subItem" 
            :mini-variant="miniVariant"
            :sub-group="true"
            :key="subItem.name || subItem.title" 
            v-for="subItem in item.children">
        </sidebar-item>
    </component>
    <component v-else v-bind:is="rootComponent" right :disabled="!miniVariant" >
        <v-list-tile
            :to="item.path"
            exact
            slot="activator">
            <v-list-tile-action v-if="$helper.getProp(item, 'meta.icon')">
                <v-icon>{{item.meta.icon}}</v-icon>
            </v-list-tile-action>
            <v-list-tile-content>
                <v-list-tile-title> {{item.title}}</v-list-tile-title>
            </v-list-tile-content>
        </v-list-tile>
        <span>{{item.title}}</span>
    </component>
</template>

<script>
export default {
    name: 'sidebar-item',
    props: {
        miniVariant: {
            type: Boolean,
            default: false
        },
        isNested: {
            type: Boolean,
            default: false
        },
        item: {
            type: Object,
            required: true
        },
        subGroup: {
            type: Boolean,
            default: false
        }
    },
    computed: {
        rootComponent: function() {
            return this.hasChildren(this.item) ? 'v-list-group' : 'v-tooltip';
        },
        
    },
    methods: {
        hasChildren: function(route) {
            return route.children ? route.children.some(r => r.hidden !== true) : false;
        },
        matchedInCurrentRoute: function(item) {
            if (this.hasChildren(item)) {
                this.item.children.forEach(itemChild => {
                    return this.matchedInCurrentRoute(itemChild);
                })
            }
            let matched = this.$route.matched.filter( r => r.name === item.name);
            return matched.length > 0;
        }
    }
}
</script>

<style>

</style>
