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
    id: 'carrellodetail',
    config: {
        fullscreen: true,
        height: 400,
        layout: 'vbox',
        items: [
            {
                xtype: 'fieldset',
                title: 'Dettaglio Prodotto',
                height: 300,
                items: [
                    {
                        xtype: 'textfield',
                        name: 'Titolo',
                        label: 'Titolo:',
                        disabled: true,
                        //value: 'titolo',
                        id: 'titolo',
                        flex: 1
                    },
                    {
                        xtype: 'textfield',
                        name: 'IDProdotto',
                        label: 'IDProdotto:',
                        hidden: true,
                        //value: 123,
                        id: 'idprodotto',
                        flex: 1
                    },
                    {
                        xtype: 'textfield',
                        name: 'Descrizione',
                        label: 'Descrizione:',
                        hidden: true,
                        //value: 'descr',
                        id: 'descrizione',
                        flex: 1
                    },
                    {
                        xtype: 'numberfield',
                        align: 'right',
                        name: 'Prezzo',
                        label: 'Prezzo:',
                        disabled: true,
                        id: 'prezzo',
                        flex: 1
                    },
                    {
                        xtype: 'numberfield',
                        align: 'right',
                        name: 'Importo',
                        label: 'Importo:',
                        hidden: true,
                        id: 'importo',
                        flex: 1
                    },
                    {
                        xtype: 'spinnerfield',
                        name: 'Quantita',
                        label: 'Quantità da ordinare:',
                        minValue: 1,
                        maxValue: 100,
                        increment: 1,
                        cycle: true,
                        defaultValue: 1,
                        stepValue: 1,
                        padding: 10,
                        flex: 1

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
                        //text: 'Salva',
                        iconCls: 'action',
                        ui: 'confirm',
                        action: 'updateToCarrello'
                    },
                    {
                        xtype: 'button',
                        //text: 'Cancella',
                        iconCls: 'trash',
                        ui: 'decline',
                        action: 'deleteToCarrello'
                    }
//                    ,
//                    {
//                        xtype: 'button',
//                        //text: 'Indietro',
//                        iconCls: 'reply',
//                        ui: 'normal',
//                        action: 'backToCarrello'
//                    }
                ] // items (toolbar)
            }
        ] // items (formpanel)
    }
});

