<template
    min-height:500
     lang="">
    <nav>
        <v-app-bar
            src='/amusment.jpg'
        >
      <template v-slot:img="{ props }">
            <v-img
            v-bind="props"
            gradient="to top right, rgba(19,84,122,0.8), rgba(128,208,199,.8)"
            ></v-img>
      </template>
            <v-app-bar-nav-icon 
            color="white"
            @click="drawer =!drawer">
            </v-app-bar-nav-icon>
            <v-app-bar-title class="text-uppercase">
                <span class="font-weight-light white--text">Park Rozrywki</span>
            </v-app-bar-title>
            <v-spacer></v-spacer>
            <v-btn 
            color="pink"
            @click="logout()"        >
                <span>Wyloguj się</span>
                <v-icon right>mdi-exit-to-app</v-icon>
            </v-btn>
        </v-app-bar>
        <v-navigation-drawer 
        v-model="drawer"
        app
         class="pink">
            <v-row column justify='center'>
                <v-col class='mt-5' cols='6'>
                   <v-avatar size='100'>
                       <img src='/avatar1.jpeg'>
                   </v-avatar>
                </v-col>
            </v-row>
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
import {vm} from '../main.js'
import Auth from '../service/auth'
import { mapMutations} from 'vuex';
export default {
    data() {
        return {
            drawer: false,
            links: [
                { icon: 'mdi-card-account-details', text: 'Stanowiska', route: '/stanowiska', requiredPerm: 'pracownicy.view_stanowisko' },
                { icon: 'mdi-globe-model', text: 'Języki', route: '/jezyki', requiredPerm: 'jezyki.view_jezyk', },
                { icon: 'mdi-view-dashboard', text: 'Sektory', route: '/sektor', requiredPerm: 'parki.view_sektor', },
                { icon: 'mdi-account-multiple', text: 'Pracownicy', route: '/pracownicy', requiredPerm: 'pracownicy.view_pracownik',},
                { icon: 'mdi-account-cash', text: 'Wynagrodzenia', route: '/wynagrodzenia', requiredPerm: 'pracownicy.view_wynagrodzenie', },
                { icon: 'mdi-ferris-wheel', text: 'Atrakcje', route: '/atrakcje', requiredPerm: 'atrakcje.view_atrakcja', },
                // do dodania na każdy widok co będziemy robić 
            ]
        }
    },
    methods: {
    async logout() {
        vm.$forceUpdate();
        await Auth.logout()
        this.showMessage({ message: 'Zostałeś wylogowany!.' });
    },
    async filterAuthenticated(){
        for(let i=0; i < this.links.length; i++) {
            this.links[0].requiredPerm = 1
        }
    },
    ...mapMutations([
      'showMessage'
    ]),
    }
}
</script>