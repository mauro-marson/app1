/*
 * File: app/model/Articoli.js
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

Ext.define('GAS.model.Categoria', {
    extend: 'Ext.data.Model',
    config: {
        fields: [
            { name: 'IDCategoria', type: 'string' },
            { name: 'Titolo', type: 'string' },
            { name: 'Image', type: 'string' },
            { name: 'ImageT', type: 'string' },
            { name: 'Ordine', type: 'int' },
            { name: 'IDNegozio', type: 'int' }
        ],
        proxy: {
            type: 'ajax',
            actionMethods: 'POST',
            extraParams: {
                tableName: 'Categorie',
                orderBy: 'Titolo',
                where: ''
            },
            api: {
                read: 'getTable.php',
                create: 'TODO/Create',
                destroy: 'TODO/Delete',
                update: 'TODO/Update'
            },
            reader: {
                type: 'json',
                rootProperty: 'data',
                idProperty: 'IDCategoria',
                successProperty: 'success',
                messageProperty: 'message'
            },
            writer: {
                type: 'json',
                root: 'data',
                encode: true,
                writeAllFields: true
            },
            listeners: {
                exception: function () {
                    console.log("Exception on Categorie");
                }
            }
        }
    },
    fullName: function () {
        var d = this.data,
            names = [
                d.Titolo
            ];
        return names.join(" ");
    }
})
;