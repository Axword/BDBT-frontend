const state = {
    links: [
        { icon: 'mdi-card-account-details', text: 'Stanowiska', route: '/stanowiska', requiredPerm: 'pracownicy.view_stanowisko' },
        { icon: 'mdi-globe-model', text: 'Języki', route: '/jezyki', requiredPerm: 'jezyki.view_jezyk', },
        { icon: 'mdi-view-dashboard', text: 'Sektory', route: '/sektor', requiredPerm: 'parki.view_sektor', },
        { icon: 'mdi-account-multiple', text: 'Pracownicy', route: '/pracownicy', requiredPerm: 'pracownicy.view_pracownik',},
        { icon: 'mdi-account-cash', text: 'Wynagrodzenia', route: '/wynagrodzenia', requiredPerm: 'pracownicy.view_wynagrodzenie', },
        { icon: 'mdi-ferris-wheel', text: 'Atrakcje', route: '/atrakcje', requiredPerm: 'atrakcje.view_atrakcja', }
    ]
};
