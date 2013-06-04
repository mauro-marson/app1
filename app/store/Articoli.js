/*
 * File: app/store/Articoli.js
 *
 * This file was generated by Sencha Architect version 2.2.2.
 * http://www.sencha.com/products/architect/
 *
 * This file requires use of the Sencha Touch 2.2.x library, under independent license.
 * License of Sencha Architect does not include license for Sencha Touch 2.2.x. For more
 * details see http://www.sencha.com/license or contact license@sencha.com.
 *
 * This file will be auto-generated each and everytime you save your project.
 *
 * Do NOT hand edit this file.
 */

/*
 IDCategoria=250
 */
* /
Ext.define('GAS.store.Articoli', {
    extend: 'Ext.data.Store',

    requires: [
        'GAS.model.Articoli'
    ],

    config: {
        model: 'GAS.model.Articoli',
        storeId: 'ArticoliStoreID',
        autoLoad: true,
        proxy: {
            type: 'ajax',
            actionMethods: 'POST',
            extraParams: {
                tableName: 'categorie'
            },

            api: {
                read: '../../../gas/getTable.php',
                create: 'TODO/Create',
                destroy: 'TODO/Delete',
                update: 'TODO/Update'
            },
            reader: {
                type: 'json',
                root: 'data'
            },
            writer: {
                type: 'json',
                root: 'data',
                encode: true
            },
            listeners: {
                exception: function () {
                    console.log("Exception on table articoli");
                }
            }
        }
    }
});