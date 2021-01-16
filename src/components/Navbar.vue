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
            <v-btn color="red">
                <span>Wyloguj się</span>
                <v-icon right>mdi-exit-to-app</v-icon>
            </v-btn>
        </v-app-bar>
        <v-navigation-drawer 
        v-model="drawer"
        app
        temporary 
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
export default {
    data() {
        return {
            drawer: false,
            links: [
                { icon: 'mdi-view-dashboard', text: 'Strona główna', route: '/' },
                { icon: 'mdi-view-dashboard', text: 'Stanowiska', route: '/stanowiska' },
                { icon: 'mdi-view-dashboard', text: 'Języki', route: '/jezyki' },
                { icon: 'mdi-view-dashboard', text: 'Sektor', route: '/sektor' },
                { icon: 'mdi-view-dashboard', text: 'Pracownicy', route: '/pracownicy' },
                { icon: 'mdi-view-dashboard', text: 'Wynagrodzenia', route: '/sekretarka' },
                { icon: 'mdi-view-dashboard', text: 'Atrakcje', route: '/atrakcje' },
                // do dodania na każdy widok co będziemy robić 
            ]
        }
    }
}
</script>