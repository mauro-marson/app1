Ext.define('GAS.controller.Ordini', {
    extend: 'Ext.app.Controller',

    views: [

    ],
    model: [
        'Fornitore'
    ],
    stores: [
        'Fornitori'
    ],

    config: {

        refs: {
            loginButton: 'button[action=login]',
            logoutButton: 'button[action=logout]',
            userSettingButton: 'button[action=userSetting]',
            fornitoriList: 'FornitoriList'
        },

        control: {
            loginButton: {
                tap: 'doLogin'
            },
            logoutButton: {
                tap: 'doLogout'
            },
            userSettingButton: {
                tap: 'doUserSetting'
            },
            fornitoriList: {
                disclose: 'onDisclose'
            }
        }
    },

    launch: function () {
        console.log('on launch from controller Ordine');
    },

    init: function () {
        console.log('init function di controller Ordine');
    },
    doLogin: function (button, e, options) {
        console.log('tap from login button from controller');
        var me = this;

        var panel = button.up('panel'),
            usernameField = panel.down('#userNameTextField'),
            passwordField = panel.down('#passwordTextField'),
            label = panel.down('#signInFailedLabel');

        label.hide();

        var username = usernameField.getValue(),
            password = passwordField.getValue();

        console.log('Username: ' + username + '\n' + 'Password: ' + password);


        if (username.length === 0 || password.length === 0) {

            //panel.showSignInFailedMessage('Please enter your username and password.');
            return;
        }

        panel.setMasked({
            xtype: 'loadmask',
            message: 'Signing In...'
        });

        Ext.Ajax.request({
            url: '../../../gas/mobile/app1/login.php',
            method: 'POST',
            root: 'data',
            params: {
                userName: username,
                password: password
            },
            success: function (response) {

                var loginResponse = Ext.JSON.decode(response.responseText);

                if (loginResponse.success == true) {
                    // The server will send a token that can be used throughout the app to confirm that the user is authenticated.
                    me.sessionToken = loginResponse.sessionToken;
                    panel.setMasked(false);
                    //me.signInSuccess();     //Just simulating success.
                    var parent = panel.getParent();
                    parent.setActiveItem(1);
                    console.log('dovrebbe esserci');

                } else {
                    //GAS.controller.Login.prototype.signInFailure(loginResponse.message);
                    //var loginView = me.getLoginView();
                    //main.showSignInFailedMessage(loginResponse.message);
                    panel.setMasked(false);
                }
            },
            failure: function (response) {
                me.sessionToken = null;
                //me.signInFailure('Login failed. Please try again later.');
            }
        });

    },

    doLogout: function (button, e, options) {
        console.log('tap from logout button from controller');
        var me = this;

        var panel = button.up('panel'),
            usernameField = panel.down('#userNameTextField'),
            passwordField = panel.down('#passwordTextField'),
            label = panel.down('#signInFailedLabel')
            ;

        var parent = panel.getParent()
            ;

        panel.setActiveItem(0);


        Ext.Ajax.request({
            url: '../../../gas/mobile/app1/logout.php',
            method: 'POST',
            root: 'data',
            params: {
                userName: usernameField.getValue()
            }
        });
    },
    doUserSetting: function (button, e, options) {
        alert('userSetting');
    },
    onDisclose: function (view, record, target, index, event) {
        console.log('Disclosure icon was tapped on the List');
        console.log(view, record, target, index, event);
//        Ext.Msg.alert('Clicked on the disclosure icon',
//            'il fornitore scelto è: ' + record.get('Titolo')
//        );

        // qui devo fare la load dello store categorie filtrata per fornitore
        // e mostrare la view delle categorie
        var storeCategorie = Ext.data.StoreManager.get('Categorie');
        var idNegozio = record.get('IDNegozio');
        var where = 'IDNegozio=' + idNegozio;
        storeCategorie.getProxy().extraParams.where = where;

        storeCategorie.load(
            {
                callback: function (records, operation, success) {
                    // do something after the load finishes
                    if (success) {
                        alert('categorie caricate');
                    }
                },
                scope: this
            });
    }
});