/**
 * Created with JetBrains WebStorm.
 * User: mauro
 * Date: 30/05/13
 * Time: 16.31
 * To change this template use File | Settings | File Templates.
 */
Ext.define('GAS.profile.Tablet', {
    extend: 'Ext.app.Profile',

    views: ['Main'],

    isActive: function () {
        return Ext.os.is('Tablet');
    }
});