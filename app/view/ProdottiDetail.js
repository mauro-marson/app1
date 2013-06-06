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
    config: {
        fullscreen: true,
        items: [
            {
                xtype: 'fieldset',
                title: 'Dettaglio Prodotti',
                items: [
                    {
                        xtype: 'textfield',
                        name: 'Titolo',
                        label: 'Titolo:',
                        disabled: true
                    }
                ] // items
            },
            {
                xtype: 'spinnerfield',
                label: 'Quantità da ordinare:',
                minValue: 1,
                maxValue: 100,
                increment: 1,
                cycle: true,
                defaultValue: 1,
                stepValue: 1

            },
            {
                xtype: 'toolbar',
                layout: 'hbox',
                ui: 'plain',
                items: [
                    {
                        xtype: 'button',
                        text: 'Back',
                        ui: 'decline',
                        action: 'declineCarrello'
                    },
                    {
                        xtype: 'button',
                        text: 'Aggiungi al carrello',
                        ui: 'confirm',
                        action: 'addToCarrello'
                    }
                ] // items (toolbar)
            }
        ] // items (formpanel)
    }
})
;

