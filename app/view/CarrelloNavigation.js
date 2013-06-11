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
    requires: [
        'GAS.view.CarrelloList'
    ],
    config: {
        fullscreen: true,
        navigationBar: {
            //ui: 'light',
            height: 5,
            items: [
                {
                    xtype: 'button',
                    text: 'Indietro',
                    action: 'backToLastActiveItem',
                    ui: 'back'
                },
                {
                    xtype: 'button',
                    action: 'confirm',
                    align: 'right',
                    iconCls: 'action',
                    ui: 'confirm',
                    cls: 'action',
                    hidden: true
                },
                {
                    xtype: 'button',
                    action: 'refresh',
                    align: 'right',
                    iconCls: 'refresh',
                    cls: 'refresh',
                    hidden: true
                },
                {
                    xtype: 'button',
                    action: 'trash',
                    align: 'right',
                    iconCls: 'trash',
                    cls: 'trash',
                    hidden: true
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
