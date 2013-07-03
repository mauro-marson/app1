/**
 * Created with JetBrains WebStorm.
 * User: mauro
 * Date: 28/05/13
 * Time: 15.32
 * To change this template use File | Settings | File Templates.
 */
Ext.define('GAS.view.ProdottiDetail', {
    extend: 'Ext.form.Panel',
    alias: 'widget.ProdottiDetail',
    id: 'prodottidetail',
    config: {
        fullscreen: true,
        store: 'Prodotti',
        items: [
            {
                xtype: 'fieldset',
                title: 'Dettaglio Prodotti',
                items: [
                    {
                        xtype: 'textfield',
                        name: 'UserName',
                        label: 'UserName:',
                        disabled: true,
                        hidden: true,
                        id: 'username'
                    },
                    {
                        xtype: 'textfield',
                        name: 'Fornitore',
                        label: 'Fornitore:',
                        disabled: true,
                        hidden: true,
                        id: 'fornitore'
                    },
                    {
                        xtype: 'textfield',
                        name: 'Titolo',
                        label: 'Titolo:',
                        disabled: true,
                        id: 'titolo'
                    },
                    {
                        xtype: 'textfield',
                        name: 'IDProdotto',
                        label: 'IDProdotto:',
                        hidden: true,
                        id: 'idprodotto'
                    },
                    {
                        xtype: 'textfield',
                        name: 'Descrizione',
                        label: 'Descrizione:',
                        hidden: true,
                        id: 'descrizione'
                    },
                    {
                        xtype: 'textfield',
                        name: 'CodiceProdotto',
                        label: 'CodiceProdotto:',
                        hidden: true,
                        id: 'codiceProdotto'
                    },
                    {
                        xtype: 'numberfield',
                        align: 'right',
                        name: 'Prezzo',
                        label: 'Prezzo:',
                        disabled: true,
                        id: 'prezzo'
                    },
                    {
                        xtype: 'spinnerfield',
                        label: 'Quantità da ordinare:',
                        name: 'Quantita',
                        minValue: 1,
                        maxValue: 100,
                        increment: 1,
                        cycle: true,
                        defaultValue: 1,
                        stepValue: 1,
                        padding: 10
                    },
                    {
                        xtype: 'numberfield',
                        name: 'IDFornitore',
                        label: 'IDFornitore:',
                        hidden: true,
                        id: 'idFornitore'
                    },
                    {
                        xtype: 'numberfield',
                        name: 'IDUtente',
                        label: 'IDUtente:',
                        hidden: true,
                        id: 'idUtente'
                    }
                ] // items
            },
            {
                xtype: 'toolbar',
                layout: 'hbox',
                ui: 'plain',
                items: [
                    {
                        xtype: 'button',
                        //text: 'Indietro',
                        iconCls: 'delete',
                        ui: 'normal',
                        action: 'declineCarrello'
                    },
                    {
                        xtype: 'button',
                        //text: 'Aggiungi al carrello',
                        ui: 'confirm',
                        iconCls: 'action',
                        action: 'addToCarrello'
                    }
                ] // items (toolbar)
            }
        ] // items (formpanel)
    }
})
;

