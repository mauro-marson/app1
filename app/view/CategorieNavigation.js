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
    id: 'categorienavigation',
    requires: [
        'GAS.view.CategorieList'
    ],
    config: {
        fullscreen: true,
        navigationBar: {
            //ui: 'light',
            height: 5,
            items: [
                {
                    xtype: 'button',
                    text: 'Fornitori',
                    action: 'backToFornitori',
                    ui: 'back'

                },
                {
                    xtype: 'textfield',
                    //text: 'Fornitori',
                    disabled: true,
                    hidden: true,
                    id: 'fornitore'
                },
                {
                    xtype: 'numberfield',
                    //text: 'Fornitori',
                    disabled: true,
                    hidden: true,
                    id: 'idFornitore'

                },
                {
                    xtype: 'numberfield',
                    //text: 'Fornitori',
                    disabled: true,
                    hidden: true,
                    id: 'idUtente'

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
                xtype: 'CategorieList'

            }
        ]

    }
});
