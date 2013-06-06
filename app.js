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
        'Carrello',
        'Blog',
        'Contact',
        'Login',
        'Options',
        'FornitoriNavigation',
        'FornitoriList',
        'FornitoriDetail',
        'CategorieNavigation',
        'CategorieList',
        'CategorieDetail',
        'ProdottiNavigation',
        'ProdottiList',
        'ProdottiDetail',
        'CarrelloNavigation',
        'CarrelloList',
        'CarrelloDetail'



    ],

    models: [
        'Fornitore',
        'Categoria',
        'Prodotto',
        'Carrello'
    ],

    stores: [
        'Fornitori',
        'Categorie',
        'Prodotti',
        'Carrello'
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
