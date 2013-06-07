/**
 * Created with JetBrains WebStorm.
 * User: mauro
 * Date: 28/05/13
 * Time: 15.36
 * To change this template use File | Settings | File Templates.
 */
Ext.define('GAS.view.ProdottiNavigation', {
    extend: 'Ext.navigation.View',
    alias: 'widget.ProdottiNavigation',
    id: 'prodottinavigation',
    requires: [
        'GAS.view.ProdottiList'
    ],
    config: {
        fullscreen: true,
        navigationBar: {
            //ui: 'light',
            docked: 'top',
            height: 5,
            items: [
                {
                    xtype: 'button',
                    text: 'Categorie',
                    action: 'backToCategorie',
                    ui: 'back'
                },
                {
                    xtype: 'textfield',
                    //text: 'Fornitori',
                    disabled: true,
                    hidden: true,
                    id: 'fornitore'

                }
                ,
                {
                    xtype: 'spacer'
                },
                {
                    xtype: 'searchfield',
                    placeHolder: 'Search...',
                    name: 'searchProdotti'
//                    listeners: {
//                        scope: this,
//                        clearicontap: this.onSearchClearIconTap,
//                        keyup: this.onSearchKeyUp
//                    }
                },
                {
                    xtype: 'spacer'
                },
                {
                    xtype: 'button',
                    action: 'carrello',
                    align: 'right',
                    //iconCls: 'iconBasketFull',
                    text: 'Carrello'

                }
            ]
        },
        items: [
            {
                xtype: 'ProdottiList'
            }
// ,
//            {
//                xtype: 'ProdottiDetail'
//            }
        ]

    }
});
