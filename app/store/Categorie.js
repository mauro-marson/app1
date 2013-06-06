Ext.define('GAS.store.Categorie', {
    extend: 'Ext.data.Store',
    requires: [
        'GAS.model.Categoria'
    ],
    config: {
        model: 'GAS.model.Categoria',
        grouper: function (record) {
            return record.get('Titolo')[0];
        },
        storeId: 'Categorie',
        autoLoad: false,
        autoSync: false,
        sorters: 'Titolo'
    }
});