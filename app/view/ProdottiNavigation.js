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
    requires: [
        'GAS.view.ProdottiList'
    ],
    config: {
        fullscreen: true,
        title: 'Prodotti',
        navigationBar: {
            //ui: 'light',
            docked: 'top',
            height: 40,
            items: [
                {
                    xtype: 'button',
                    text: 'Categorie',
                    action: 'categorie'
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
