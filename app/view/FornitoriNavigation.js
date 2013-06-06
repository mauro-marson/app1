/**
 * Created with JetBrains WebStorm.
 * User: mauro
 * Date: 28/05/13
 * Time: 15.36
 * To change this template use File | Settings | File Templates.
 */
Ext.define('GAS.view.FornitoriNavigation', {
    extend: 'Ext.navigation.View',
    alias: 'widget.FornitoriNavigation',
    requires: [
        'GAS.view.FornitoriList'
    ],
    config: {
        fullscreen: true,
        title: 'Fornitori',
        navigationBar: {
            //ui: 'light',
            docked: 'top',
            height: 5,
            items: [
                {
                    xtype: 'button',
                    text: 'Log Out',
                    action: 'logout',
                    align: 'left'
                },
                {
                    xtype: 'button',
                    action: 'userSetting',
                    align: 'right',
                    iconCls: 'settings'
                },
                {
                    xtype: 'button',
                    action: 'carrello',
                    align: 'right',
                    iconCls: 'iconBasketFull',
                    tooltip: 'carrello'

                }
            ]
        },
        items: [
            {
                xtype: 'FornitoriList'

            }
        ]

    }
});
