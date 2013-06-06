Ext.define('GAS.controller.Ordini', {
    extend: 'Ext.app.Controller',

    views: [

    ],
    model: [
        //'Fornitore'
    ],
    stores: [
        //'Fornitori'
    ],

    config: {

        refs: {
            loginButton: 'button[action=login]',
            logoutButton: 'button[action=logout]',
            userSettingButton: 'button[action=userSetting]',
            fornitoriList: 'FornitoriList',
            categorieList: 'CategorieList',
            prodottiList: 'ProdottiList',
            categorieNavigation: 'button[action=fornitori]',
            prodottiNavigation: 'button[action=categorie]',
            prodottiDetail: 'button[action=prodotti]'
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
                disclose: 'onDiscloseFornitori'
            },
            categorieList: {
                disclose: 'onDiscloseCategorie'
            },
            prodottiList: {
                disclose: 'onDiscloseProdotti'
            },
            categorieNavigation: {
                tap: 'showFornitoriList'
            },
            prodottiNavigation: {
                tap: 'showCategorieList'
            },
            prodottiDetail: {
                tap: 'showProdottiList'
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
    onDiscloseFornitori: function (view, record, target, index, event) {
        //console.log('Disclosure icon was tapped on the List');
        //console.log(view, record, target, index, event);
//        Ext.Msg.alert('Clicked on the disclosure icon',
//            'il fornitore scelto è: ' + record.get('Titolo')
//        );

        // qui devo fare la load dello store categorie filtrata per fornitore
        // e mostrare la view delle categorie
        var store = Ext.data.StoreManager.get('Categorie');
        var key = record.get('IDNegozio');
        var where = 'IDNegozio=' + key;
        //var model= storeCategorie.getModel();
        //var proxy= model.getProxy();
        //proxy.setExtraParam('where', where);
        store.getModel().getProxy().setExtraParam('where', where);

        store.load(
            {
                callback: function (records, operation, success) {
                    // do something after the load finishes
                    if (success) {
                        //alert('categorie caricate');
                        var panel = view.getParent()
                        parent = panel.getParent()
                        ;
                        parent.setActiveItem(1);
                    }
                },
                scope: this
            });
    },
    onDiscloseCategorie: function (view, record, target, index, event) {
//        console.log('Disclosure icon was tapped on the List');
//        console.log(view, record, target, index, event);
//        Ext.Msg.alert('Clicked on the disclosure icon',
//            'la categoria scelta è: ' + record.get('Titolo')
//        );
        var store = Ext.data.StoreManager.get('Prodotti');
        var key = record.get('IDCategoria');
        var where = 'IDCategoria=' + key;
        store.getModel().getProxy().setExtraParam('where', where);

        store.load(
            {
                callback: function (records, operation, success) {
                    // do something after the load finishes
                    if (success) {
                        //alert('prodotti caricati');
                        var panel = view.getParent()
                        parent = panel.getParent()
                        ;
                        parent.setActiveItem(2);

                    }
                },
                scope: this
            });
    },
    onDiscloseProdotti: function (view, record, target, index, event) {
        console.log('Disclosure icon was tapped on the List');
        console.log(view, record, target, index, event);
//        Ext.Msg.alert('Clicked on the disclosure icon',
//            'il prodotto scelto è: ' + record.get('Titolo')
//        );
        var panel = view.getParent()
        parent = panel.getParent()
        ;
        // qui si deve caricare la form del dettaglio

        parent.setActiveItem(3);


    },
    showFornitoriList: function (button, e, options) {
        var parent = button.getParent().getParent().getParent().getParent();
        parent.setActiveItem(0);
    },
    showCategorieList: function (button, e, options) {
        var parent = button.getParent().getParent().getParent().getParent();
        parent.setActiveItem(1);
    },
    showProdottiList: function (button, e, options) {
        var parent = button.getParent().getParent().getParent().getParent();
        parent.setActiveItem(2);
    }

});