Ext.define('GAS.store.Carrello', {
    extend: 'Ext.data.Store',

    requires: [
        'GAS.model.Carrello'
    ],

    config: {
        model: 'GAS.model.Carrello',
        grouper: function (record) {
            return record.get('Titolo')[0];
        },
        storeId: 'Carrello',
        autoLoad: false,
        autoSync: false,
        sorters: 'Titolo'
    }
});