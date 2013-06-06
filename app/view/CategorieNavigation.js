/**
 * Created with JetBrains WebStorm.
 * User: mauro
 * Date: 28/05/13
 * Time: 15.36
 * To change this template use File | Settings | File Templates.
 */
Ext.define('GAS.view.CategorieNavigation', {
    extend: 'Ext.navigation.View',
    alias: 'widget.CategorieNavigation',
    requires: [
        'GAS.view.CategorieList'
    ],
    config: {
        fullscreen: true,
        title: 'Categorie',
        navigationBar: {
            //ui: 'light',
            height: 5,
            items: [
                {
                    xtype: 'button',
                    text: 'Fornitori',
                    action: 'backToFornitori'
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
                xtype: 'CategorieList'

            }
        ]

    }
});
