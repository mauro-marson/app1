/**
 * Created with JetBrains WebStorm.
 * User: mauro
 * Date: 30/05/13
 * Time: 16.30
 * To change this template use File | Settings | File Templates.
 */
Ext.define('GAS.profile.Phone', {
    extend: 'Ext.app.Profile',

    views: ['Main'],

    isActive: function () {
        return Ext.os.is('Phone');
    }
});