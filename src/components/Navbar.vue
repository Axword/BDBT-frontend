<template lang="">
    <nav>
        <v-app-bar flat>
            <v-app-bar-nav-icon 
            class="grey--text"
            @click="drawer =!drawer">
            </v-app-bar-nav-icon>
            <v-app-bar-title class="text-uppercase">
                <span class="font-weight-bold">Park Rozrywki</span>
            </v-app-bar-title>
            <v-spacer></v-spacer>
            <v-btn color="red">
                <span>Wyloguj się</span>
                <v-icon right>mdi-exit-to-app</v-icon>
            </v-btn>
        </v-app-bar>
        <v-navigation-drawer v-model="drawer" app class="pink">
            <v-list>
            <v-list-item v-for="link in links" :key="link.text" :to="link.route">
              <v-list-item-action>
                <v-icon class="white--text">{{ link.icon}}</v-icon>
              </v-list-item-action>    
              <v-list-item-content>
                <v-list-item-title class="white--text">
                {{ link.text }}
                </v-list-item-title>
              </v-list-item-content>
            </v-list-item>
            </v-list>
        </v-navigation-drawer>
    </nav>
</template>
<script>
export default {
    data() {
        return {
            drawer: false,
            links: [
                { icon: 'mdi-view-dashboard', text: 'Parki rozrywki', route: '/home' },
                { icon: 'mdi-view-dashboard', text: 'Adresy', route: '/about' },
                { icon: 'mdi-view-dashboard', text: 'Języki', route: '/' }
                // do dodania na każdy widok co będziemy robić 
            ]
        }
    }
}
</script>