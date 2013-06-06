Ext.define('GAS.store.Prodotti', {
    extend: 'Ext.data.Store',

    requires: [
        'GAS.model.Prodotto'
    ],

    config: {
        model: 'GAS.model.Prodotto',
        grouper: function (record) {
            return record.get('Titolo')[0];
        },
        storeId: 'Prodotti',
        autoLoad: false,
        autoSync: false,
        sorters: 'Titolo'
    }
});