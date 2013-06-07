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

Ext.define('GAS.view.FornitoriList', {
    extend: 'Ext.List',
    alias: 'widget.FornitoriList',
    requires: [
        'GAS.store.Fornitori'
    ],
    config: {
        title: 'Fornitori',
        grouped: true,
        indexBar: true,
        store: 'Fornitori',
        loadingText: "Loading...",
        onItemDisclosure: /*function(){
         console.log('Disclosure more info!');
         },*/
            true,
        itemTpl: '<img src="http://www.gasmonastier.it/gasstore/allegati/{Image1}" height="50" width="100" />  {Titolo} - {DescrizioneBreve}'
    }
});