Ext.define('GAS.store.ProdottiLike', {
    extend: 'Ext.data.Store',

    requires: [
        'GAS.model.ProdottoLike'
    ],

    config: {
        model: 'GAS.model.ProdottoLike',
        grouper: function (record) {
            return record.get('id')[0];
        },
        storeId: 'ProdottiLike',
        autoLoad: false,
        autoSync: false
    }
});