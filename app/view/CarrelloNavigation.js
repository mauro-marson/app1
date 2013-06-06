/**
 * Created with JetBrains WebStorm.
 * User: mauro
 * Date: 28/05/13
 * Time: 15.36
 * To change this template use File | Settings | File Templates.
 */
Ext.define('GAS.view.CarrelloNavigation', {
    extend: 'Ext.navigation.View',
    alias: 'widget.CarrelloNavigation',
    //xtype: 'fornitorinavigation',
    requires: [
        'GAS.view.CarrelloList'
    ],
    config: {
        //useTitleForBackButtonText: true,
        //defaultBackButtonText: 'indietro',
        fullscreen: true,
        title: 'Carrello',
        height: 5,
        navigationBar: {
            //ui: 'light',
            height: 5,
            items: [
                {
                    xtype: 'button',
                    text: 'Prodotti',
                    action: 'backToProdotti'
                }
            ]
        },
        items: [
            {
                xtype: 'CarrelloList'

            }
        ]

    }
});
