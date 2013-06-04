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
    //xtype: 'fornitorinavigation',
    requires: [
        'GAS.view.FornitoriList',
        'GAS.view.FornitoriDetail'
    ],
    config: {
        useTitleForBackButtonText: true,
        fullscreen: true,
        navigationBar: {
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
        },
        items: [
            {
                xtype: 'FornitoriList'

            }
        ]

    }
});
