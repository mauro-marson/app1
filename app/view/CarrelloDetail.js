/**
 * Created with JetBrains WebStorm.
 * User: mauro
 * Date: 28/05/13
 * Time: 15.32
 * To change this template use File | Settings | File Templates.
 */
Ext.define('GAS.view.CarrelloDetail', {
    extend: 'Ext.form.Panel',
    alias: 'widget.CarrelloDetail',
    //xtype: 'fornitoridetail',
    config: {
        layout: 'auto',
        items: [
            {
                xtype: 'textfield',
                name: 'Titolo',
                label: 'Titolo'
            },
            {
                xtype: 'textfield',
                name: 'Descrizione',
                label: 'Descrizione'
            }
        ]

        //html: 'Hello Word!'
        /*tBar: {
         ui: 'light',
         docked: 'top',
         height: 40,
         items: [
         {
         xtype: 'button',
         text: 'Prodotti',
         action: 'prodotti'
         }
         ]
         }*/
    }
});

