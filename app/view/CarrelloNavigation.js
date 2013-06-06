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
        /*navigationBar: {
         ui: 'light',
         docked: 'top',
         height: 40,
         items: [
         {
         xtype: 'button',
         text: 'Log Out',
         action: 'logout',
         align: 'left'
         },
         {
         xtype: 'button',
         //text: 'Setting',
         action: 'userSetting',
         align: 'right',
         iconCls: 'settings'
         }
         ]
         },*/
        items: [
            {
                xtype: 'CarrelloList'

            }
        ]

    }
});
