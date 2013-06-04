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


Ext.define('GAS.view.Options', {
    extend: 'Ext.TabPanel',
    alias: "widget.Options",

    config: {

        fullscreen: true,
        tabBarPosition: 'bottom',

        items: [
            // This is the home page, just some simple html
            {
                xtype: 'FornitoriNavigation',
                title: 'Fornitori',
                iconCls: 'bookmarks',
                cls: 'bookmarks'
            },
            {
                xtype: 'CategorieNavigation',
                title: 'Categorie',
                iconCls: 'bookmarks',
                cls: 'bookmarks'
            }
            /*{
             xtype: 'Ordini',
             title: 'Ordini',
             iconCls: 'bookmarks',
             cls: 'bookmarks'
             },
             {
             xtype: 'Ordini',
             title: 'Ordini',
             iconCls: 'bookmarks',
             cls: 'bookmarks'
             },
             */

        ]
    }
    /*,
     initialize: function () {
     console.log('initialize function di Main');
     }*/
});