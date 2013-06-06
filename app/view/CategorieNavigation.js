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
            docked: 'top',
            height: 40,
            items: [
                {
                    xtype: 'button',
                    text: 'Fornitori',
                    action: 'fornitori'
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
