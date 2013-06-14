/* disegno dell'applicazione
 +--> Main
 |
 +--> Home
 |
 +--> Login
 |
 +--> FornitoriNavigation
 |       |
 |       +--> FornitoriList
 |
 +--> CategorieNavigation
 |      |
 |      +--> CategorieList
 |
 +--> ProdottiNavigation
 |      |
 |      +--> ProdottiList
 |
 +--> ProdottiDetail
 |
 +--> UserSetting
 |
 +--> CarrelloNavigation
 |      |
 |      +--> CarrelloList
 |
 +--> CarrelloDetail
 |
 +--> Blog
 +--> Contacts  (form panel)
 +--> Info      (panel)
 */

Ext.application({
    name: 'GAS',
    appFolder: 'app',
    userName: null,
    lastActiveItem: null,

    controllers: [
        'Main',        // gestisce le schermate pubbliche
        'Ordini'    // gestisce le schermate private per gli ordini
    ],
    views: [
        'Main',
        'Blog',
        'Contact',
        'Login',
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
        'CarrelloDetail',
        'UserSetting'
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

    requires: [
        'Ext.MessageBox'
    ],
    //autoCreateViewport	: false,

    launch: function () {
        console.log('on launch from app.js');

        Ext.create('GAS.view.Main');
    }
});
