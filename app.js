/* disegno dell'applicazione
 Main
 |
 +--> Home   (tab panel)
 +--> Ordini (card layout)
 |       |
 |       +--> Login   (form panel)
 |       +--> Options (card layout)
 |              |
 |              +--> FornitoriNavigation
 |              |       |
 |              |       +--> FornitoriList
 |              |       +--> CategorieNavigation
 |              |               |
 |              |               +--> CategorieList
 |              |               +--> ArticoliNavigation
 |              |                       |
 |              |                       +--> ArticoliList
 |              |                       +--> ArticoliDetail
 |              |
 |              +--> ArticoliSearch
 |              |       |
 |              |       +--> ArticoliList
 |              |       +--> ArticoliDetail
 |              |
 |              +--> CarrelloNavigation
 |                      |
 |                      +--> ArticoliList
 |                      +--> ArticoliDetail
 |
 +--> Blog
 +--> Contacts  (form panel)
 +--> Info      (panel)
 */

Ext.application({
    name: 'GAS',
    appFolder: 'app',

    controllers: [
        'Main',        // gestisce le schermate pubbliche
        'Ordini'    // gestisce le schermate private per gli ordini
    ],
    views: [
        'Main',
        'Ordini',
        'Blog',
        'Contact',
        'Login',
        'Options',
        'FornitoriNavigation',
        'FornitoriList',
        'FornitoriDetail',
        'CategorieNavigation',
        'CategorieList',
        'CategorieDetail'


    ],

    models: [
        'Fornitore',
        'Categoria'
    ],

    stores: [
        'Fornitori',
        'Categorie'
    ],

    profiles: [
        'Phone',
        'Tablet'
    ],

    //autoCreateViewport	: false,

    launch: function () {
        console.log('on launch from app.js');

        Ext.create('GAS.view.Main');
    }
});
