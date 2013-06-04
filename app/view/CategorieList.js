/*
 * File: app/view/MainMenu.js
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

Ext.define('GAS.view.CategorieList', {
    extend: 'Ext.List',
    alias: 'widget.CategorieList',
    //xtype: 'fornitorilist',
    requires: [
        'GAS.store.Categorie'
    ],
    config: {
        title: 'Categorie',
        grouped: true,
        indexBar: true,
        store: 'Categorie',
        onItemDisclosure: true,
        itemTpl: /*
         "<tpl if='Image ==1 '>"+
         '<img src="http://www.gasmonastier.it/gasstore/allegati/{Image}" height="50" width="100" />  {Titolo}'+
         '</tpl>'+
         '<tpl else>'+
         '<img src="http://www.gasmonastier.it/gasstore/allegati/noImage.jpg" height="50" width="100" />  {Titolo}'+
         '</tpl>'
         */
            '<p> {Titolo}'
    }
});