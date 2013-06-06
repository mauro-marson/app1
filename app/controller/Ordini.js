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
            showUserSetting: 'button[action=userSetting]',
            showCarrello: 'button[action=carrello]',
            discloseFornitori: 'FornitoriList',
            discloseCategorie: 'CategorieList',
            discloseProdotti: 'ProdottiList',
            backToFornitori: 'button[action=backToFornitori]',
            backToCategorie: 'button[action=backToCategorie]',
            backToProdotti: 'button[action=backToProdotti]',
            userSettingSubmit: 'panel[xtype=UserSetting] button[action=backToFornitori]',
            addToCarrello: 'button[action=addToCarrello]',
            declineCarrello: 'button[action=declineCarrello]'
        },

        control: {
            loginButton: {
                tap: 'doLogin'
            },
            logoutButton: {
                tap: 'doLogout'
            },
            showUserSetting: {
                tap: 'doUserSetting'
            },
            showCarrello: {
                tap: 'showCarrello'
            },
            discloseFornitori: {
                disclose: 'onDiscloseFornitori'
            },
            discloseCategorie: {
                disclose: 'onDiscloseCategorie'
            },
            discloseProdotti: {
                disclose: 'onDiscloseProdotti'
            },
            backToFornitori: {
                tap: 'showFornitori'
            },
            backToCategorie: {
                tap: 'showCategorie'
            },
            backToProdotti: {
                tap: 'showProdotti'
            },
            userSettingSubmit: {
                tap: 'showFornitori1'
            },
            addToCarrello: {
                tap: 'addToCarrello'
            },
            declineCarrello: {
                tap: 'declineCarrello'
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
            url: '../../../mobile/app1/login.php',
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

                    var store = Ext.data.StoreManager.get('Fornitori');
                    if (!store.isLoaded()) {
                        //var where = null;
                        //store.getModel().getProxy().setExtraParam('where', where);

                        store.load(
                            {
                                callback: function (records, operation, success) {
                                    // do something after the load finishes
                                    if (success) {
                                        panel.setMasked(false);
                                        var parent = panel.getParent();
                                        parent.setActiveItem(2);
                                        console.log('fornitori caricati');
                                    }
                                },
                                scope: this
                            });
                    }
                    else {
                        panel.setMasked(false);
                        var parent = panel.getParent();
                        parent.setActiveItem(2);
                        console.log('fornitori caricati');
                    }
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

        //var panel = button.up('panel'),
        //usernameField = panel.down('#userNameTextField'),
        //passwordField = panel.down('#passwordTextField'),
        //label = panel.down('#signInFailedLabel')

        var panel = button.getParent().getParent().getParent(),
            parent = panel.getParent()
            ;

        parent.setActiveItem(1);


        Ext.Ajax.request({
            url: '../../../mobile/app1/logout.php',
            method: 'POST',
            root: 'data',
            params: {
                userName: usernameField.getValue()
            }
        });
    },
    doUserSetting: function (button, e, options) {
        //alert('userSetting');
        var panel = button.getParent().getParent().getParent()
        parent = panel.getParent()
        ;
        // qui si deve caricare la form del dettaglio

        parent.setActiveItem(6);
    },
    showCarrello: function (button, e, options) {
        //alert('userSetting');
        var panel = button.getParent().getParent().getParent()
        parent = panel.getParent()
        ;
        // qui si deve caricare la form del dettaglio

        parent.setActiveItem(7);
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
                        parent.setActiveItem(3);

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
                        parent.setActiveItem(4);

                    }
                },
                scope: this
            });

    },
    onDiscloseProdotti: function (view, record, target, index, event) {
        //console.log('Disclosure icon was tapped on the List');
        //console.log(view, record, target, index, event);
//        Ext.Msg.alert('Clicked on the disclosure icon',
//            'il prodotto scelto è: ' + record.get('Titolo')
//        );
        var panel = view.getParent()
        parent = panel.getParent()
        ;
        // qui si deve caricare la form del dettaglio

        parent.setActiveItem(5);


    },
    showFornitori: function (button, e, options) {
        var parent = button.getParent().getParent().getParent().getParent();
        parent.setActiveItem(2);
    },
    showFornitori1: function (button, e, options) {
        var parent = button.getParent().getParent().getParent();
        parent.setActiveItem(2);
    },
    showCategorie: function (button, e, options) {
        var parent = button.getParent().getParent().getParent().getParent();
        parent.setActiveItem(3);
    },
    showProdotti: function (button, e, options) {
        var parent = button.getParent().getParent().getParent().getParent();
        parent.setActiveItem(4);
    },
    addToCarrello: function (button, e, options) {
        var store = Ext.data.StoreManager.get('Carrello');
        store.add({
            UserName: 'ciccio',
            IDProdotto: 1,
            Titolo: 'merlone',
            Quantita: 10
        });
        //Ext.Msg.alert('Prodotto aggiunto al carrello!');
        var parent = button.getParent().getParent().getParent();
        parent.setActiveItem(7);
    },
    declineCarrello: function (button, e, options) {
        // Ext.Msg.confirm('', 'Sei sicuro?', function (btn) {
        //   if (btn === 'yes') {
        var parent = button.getParent().getParent().getParent();
        parent.setActiveItem(4);
        // } // switch
        // }); // confirm()

    }

});