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
            refreshCarrello: 'button[action=refresh]',
            trashCarrello: 'button[action=trash]',
            confirmCarrello: 'button[action=confirm]',
            discloseFornitori: 'FornitoriList',
            discloseCategorie: 'CategorieList',
            discloseProdotti: 'ProdottiList',
            discloseCarrello: 'CarrelloList',
            backToFornitori: 'button[action=backToFornitori]',
            backToCategorie: 'button[action=backToCategorie]',
            backToProdotti: 'button[action=backToProdotti]',
            backToLastActiveItem: 'button[action=backToLastActiveItem]',
            userSettingSubmit: 'panel[xtype=UserSetting] button[action=backToFornitori]',
            addToCarrello: 'button[action=addToCarrello]',
            backToCarrello: 'button[action=backToCarrello]',
            updateToCarrello: 'button[action=updateToCarrello]',
            deleteToCarrello: 'button[action=deleteToCarrello]',
            declineCarrello: 'button[action=declineCarrello]',
            searchProdotti: 'searchfield[name=searchProdotti]'

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
            refreshCarrello: {
                tap: 'refreshCarrello'
            },
            trashCarrello: {
                tap: 'trashCarrello'
            },
            confirmCarrello: {
                tap: 'confirmCarrello'
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
            discloseCarrello: {
                disclose: 'onDiscloseCarrello'
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
            backToLastActiveItem: {
                tap: 'showLastActiveItem'
            },
            userSettingSubmit: {
                tap: 'showFornitori1'
            },
            addToCarrello: {
                tap: 'addToCarrello'
            },
            declineCarrello: {
                tap: 'declineCarrello'
            },
            backToCarrello: {
                tap: 'backToCarrello'
            },
            updateToCarrello: {
                tap: 'updateToCarrello'
            },
            deleteToCarrello: {
                tap: 'deleteToCarrello'
            },
            searchProdotti: {
                clearicontap: 'onSearchClearIconTap',
                keyup: 'onSearchKeyUp'
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
                    GAS.app.userName = username;

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
            },
            success: function (response) {

                var loginResponse = Ext.JSON.decode(response.responseText);

                if (loginResponse.success == true) {
                    GAS.app.userName = null;
                }
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
        var fornitore = record.get('Titolo');
        var idFornitore = key;
        var idUtente = 69;
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

                        var panel = view.getParent(),
                            parent = panel.getParent()
                            ;

                        var container = parent.down('#categorienavigation');
                        container.down('#fornitore').setValue(fornitore);
                        container.down('#idFornitore').setValue(idFornitore);
                        container.down('#idUtente').setValue(idUtente);

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
                        var panel = view.getParent(),
                            parent = panel.getParent(),
                            fornitore = panel.down('#fornitore').getValue(),
                            idFornitore = panel.down('#idFornitore').getValue(),
                            idUtente = panel.down('#idUtente').getValue()
                            ;

                        var container = parent.down('#prodottinavigation');
                        container.down('#fornitore').setValue(fornitore);
                        container.down('#idFornitore').setValue(idFornitore);
                        container.down('#idUtente').setValue(idUtente);

                        parent.setActiveItem(4);

                    }
                },
                scope: this
            });

    },
    onDiscloseProdotti: function (view, record, target, index, event) {
        var panel = view.getParent(),
            parent = panel.getParent(),
            fornitore = panel.down('#fornitore').getValue(),
            idFornitore = panel.down('#idFornitore').getValue(),
            idUtente = panel.down('#idUtente').getValue()

            ;
        // qui si deve caricare la form del dettaglio
        var form = parent.down('#prodottidetail');
        form.setRecord(record);
        console.log('record prodotti: ', record);
        form.down('spinnerfield').setValue(1);

        form.down('#username').setValue(GAS.app.userName);
        form.down('#fornitore').setValue(fornitore);
        form.down('#idFornitore').setValue(idFornitore);
        form.down('#idUtente').setValue(idUtente);

        parent.setActiveItem(5);
        //parent.resetActiveItem();


    },
    onDiscloseCarrello: function (view, record, target, index, event) {
        //console.log('Disclosure icon was tapped on the List');
        //console.log(view, record, target, index, event);
        /* Ext.Msg.confirm('Conferma','Sei sicuro di voler annullare la riga?',function(btn){
         if(btn=='yes'){
         // cancellare la riga

         }
         });*/

        var panel = view.getParent(),
            parent = panel.getParent()
            ;
        var form = parent.down('#carrellodetail');
        form.setRecord(record);

        parent.setActiveItem(8);

    },
    showFornitori: function (button, e, options) {
        var main = button.getParent().getParent().getParent().getParent();
        main.setActiveItem(2);
    },
    showFornitori1: function (button, e, options) {
        var main = button.getParent().getParent().getParent();
        main.setActiveItem(2);
    },
    showCategorie: function (button, e, options) {
        var main = button.getParent().getParent().getParent().getParent();
        main.setActiveItem(3);
    },
    showProdotti: function (button, e, options) {
        var main = button.getParent().getParent().getParent().getParent();
        main.setActiveItem(4);
    },
    showLastActiveItem: function (button, e, options) {
        var main = button.getParent().getParent().getParent().getParent();
        console.log(GAS.app.lastActiveItem);
        main.setActiveItem(GAS.app.lastActiveItem);
    },
    showCarrello: function (button, e, options) {
        //alert('userSetting');
        var main = button.getParent().getParent().getParent().getParent();
        console.log(main.getActiveItem().id);
        var id = main.getActiveItem().id;
        var nr = null;
        if (id == 'ext-FornitoriNavigation-1' || id == 'fornitorinavigation') {
            nr = 2;
        }
        if (id == 'ext-CategorieNavigation-1' || id == 'categorienavigation') {
            nr = 3;
        }
        if (id == 'ext-ProdottiNavigation-1' || id == 'prodottinavigation') {
            nr = 4;
        }
        GAS.app.lastActiveItem = nr;

        main.setActiveItem(7);
    },
    addToCarrello: function (button, e, options) {
        var form = button.up('panel');
        var idProdotto = form.down('fieldset').down('#idprodotto'),
            titolo = form.down('fieldset').down('#titolo'),
            fornitore = form.down('fieldset').down('#fornitore'),
            descrizioneBreve = form.down('fieldset').down('#descrizione'),
            quantita = form.down('spinnerfield'),
            prezzo = form.down('fieldset').down('#prezzo'),
            codiceProdotto = form.down('fieldset').down('#codiceProdotto'),
            idUtente = form.down('fieldset').down('#idUtente'),
            idFornitore = form.down('fieldset').down('#idFornitore')

            ;
        var store = Ext.data.StoreManager.get('Carrello');
        store.add({
            Codice: codiceProdotto.getValue(),
            Titolo: titolo.getValue(),
            DescrizioneBreve: descrizioneBreve.getValue(),
            Prezzo: prezzo.getValue(),
            //DataIns: Ext.Date.now(),
            DataIns: new Date(),
            OperatoreIns: GAS.app.userName,
            IDProdotto: idProdotto.getValue(),
            Quantity: quantita.getValue(),
            IDOrdine: null,
            Fornitore: fornitore.getValue(),
            Importo: quantita.getValue() * prezzo.getValue(),
            IDFornitore: idFornitore.getValue(),
            IDUtente: idUtente.getValue()
        });
        // aggiorna il badgeText come contatore righe ordine
        var main = button.getParent().getParent().getParent();
        var badge = main.getTabBar().items.items[1].getBadgeText();
        badge = badge + 1;
        main.getTabBar().items.items[1].setBadgeText(badge);
        //console.log('test per badge');

        // aggiorna lo stato dei pulsanti del carrello (invia, aggiorna, cancella)
        var main = button.getParent().getParent().getParent();
        var carrelloNavigation = main.items.items[8];
        console.log(carrelloNavigation.getNavigationBar());
        carrelloNavigation.getNavigationBar().items.items[2].items.items[0].show();
        carrelloNavigation.getNavigationBar().items.items[2].items.items[1].show();
        carrelloNavigation.getNavigationBar().items.items[2].items.items[2].show();

        var carrello = Ext.widget('CarrelloList');
        carrello.refresh();
        //Ext.Msg.alert('Prodotto aggiunto al carrello!');

        GAS.app.lastActiveItem = 4;

        var parent = button.getParent().getParent().getParent();
        parent.setActiveItem(7);
    },
    declineCarrello: function (button, e, options) {
        // Funzione utilizzata per passare dal carrello ai prodotti
        var parent = button.getParent().getParent().getParent();
        console.log('from carrello to prodotti');
        parent.setActiveItem(4);
    },
    refreshCarrello: function (button, e, options) {
        var carrello = Ext.widget('CarrelloList');
        carrello.refresh();

    },
    trashCarrello: function (button, e, options) {
        store = Ext.data.StoreManager.get('Carrello');
        store.removeAll();

        // aggiorna il badgeText come contatore righe ordine
        var main = button.getParent().getParent().getParent().getParent();
        main.getTabBar().items.items[1].setBadgeText(null);

        // aggiorna lo stato dei pulsanti del carrello (invia, aggiorna, cancella)
        //var main = button.getParent().getParent().getParent();
        var carrelloNavigation = main.items.items[8];
        console.log(carrelloNavigation.getNavigationBar());
        carrelloNavigation.getNavigationBar().items.items[2].items.items[0].hide();
        carrelloNavigation.getNavigationBar().items.items[2].items.items[1].hide();
        carrelloNavigation.getNavigationBar().items.items[2].items.items[2].hide();


        var carrello = Ext.widget('CarrelloList');
        carrello.refresh();

    },
    confirmCarrello: function (button, e, options) {
        var me = this;

        /*        Ext.Msg.show({
         title: 'Invio ordine',
         message: 'Conferma Invio?',
         width: 500,
         buttons: Ext.MessageBox.YESNO,
         iconCls: Ext.MessageBox.INFO,
         fn: function(buttonId) {
         if (buttonId == 'yes') {
         console.log('hai premuto yes');
         var store = Ext.data.StoreManager.get('Carrello');
         store.sync({
         scope: me,
         success: me.proxySuccess,
         failure: me.proxyFailure,
         callback: me.proxyCallback
         });
         // se ok il carrello va cancellato
         me.trashCarrello(button, e, options);
         }
         }
         });*/

        var store = Ext.data.StoreManager.get('Carrello');

        var obj = store.sync({
            scope: me,
            success: me.proxySuccess,
            failure: me.proxyFailure,
            callback: me.proxyCallback
        });
        // se ok il carrello va cancellato
        console.log(obj);
        if (obj.added.length > 0) {
            //alert('ordine inserito');
            Ext.Msg.alert('ordine inserito!');
            me.trashCarrello(button, e, options);
        }


    },
    backToCarrello: function (button, e, options) {
        //alert('son qui');
        var parent = button.getParent().getParent().getParent();
        parent.setActiveItem(7);

    },
    updateToCarrello: function (button, e, options) {
        // Funzione
        //alert('update');
        console.log('update');
        var form = button.up('formpanel'),
            quantita = form.down('spinnerfield'),
            prezzo = form.down('numberfield'),
            importo = quantita.getValue() * prezzo.getValue();
        form.items.items[0].items.items[4].setValue(importo);
        var record = form.getRecord();

        form.updateRecord(record);

        var parent = button.getParent().getParent().getParent();
        parent.setActiveItem(7);
    },
    deleteToCarrello: function (button, e, options) {
        // Funzione
        //alert('cancella');
        var form = button.up('panel');
        var record = form.getRecord();
        var store = Ext.data.StoreManager.get('Carrello');

        store.remove(record);
        store.sync();

        // aggiorna il badgeText come contatore righe ordine
        var main = button.getParent().getParent().getParent();
        var badge = main.getTabBar().items.items[1].getBadgeText();
        badge = badge - 1;
        main.getTabBar().items.items[1].setBadgeText(badge);
        //console.log('test per badge');

        // aggiorna lo stato dei pulsanti del carrello (invia, aggiorna, cancella)
        //var main = button.getParent().getParent().getParent();
        if (badge == 0) {
            var carrelloNavigation = main.items.items[8];
            console.log(carrelloNavigation.getNavigationBar());
            carrelloNavigation.getNavigationBar().items.items[2].items.items[0].hide();
            carrelloNavigation.getNavigationBar().items.items[2].items.items[1].hide();
            carrelloNavigation.getNavigationBar().items.items[2].items.items[2].hide();
        }

        var parent = button.getParent().getParent().getParent();
        parent.setActiveItem(7);
    },

    /**
     * Called when the search field has a keyup event.
     *
     * This will filter the store based on the fields content.
     */
    onSearchKeyUp: function (field) {
        //alert('1');
        //get the store and the value of the field
        var value = field.getValue(),
        //store = this.getStore();
            store = Ext.data.StoreManager.get('Prodotti');

        //first clear any current filters on the store. If there is a new value, then suppress the refresh event
        store.clearFilter(!!value);

        //check if a value is set first, as if it isnt we dont have to do anything
        if (value) {
            //the user could have entered spaces, so we must split them so we can loop through them all
            var searches = value.split(','),
                regexps = [],
                i, regex;

            //loop them all
            for (i = 0; i < searches.length; i++) {
                //if it is nothing, continue
                if (!searches[i]) continue;

                regex = searches[i].trim();
                regex = regex.replace(/[\-\[\]\/\{\}\(\)\*\+\?\.\\\^\$\|]/g, "\\$&");

                //if found, create a new regular expression which is case insenstive
                regexps.push(new RegExp(regex.trim(), 'i'));
            }

            //now filter the store by passing a method
            //the passed method will be called for each record in the store
            store.filter(function (record) {
                var matched = [];

                //loop through each of the regular expressions
                for (i = 0; i < regexps.length; i++) {
                    var search = regexps[i],
                        didMatch = search.test(record.get('Titolo') + ' ' + record.get('DescrizioneBreve'));

                    //if it matched the first or last name, push it into the matches array
                    matched.push(didMatch);
                }

                return (regexps.length && matched.indexOf(true) !== -1);
            });
        }
    },

    /**
     * Called when the user taps on the clear icon in the search field.
     * It simply removes the filter form the store
     */
    onSearchClearIconTap: function () {
        //alert('2');
        //call the clearFilter method on the store instance
        store = Ext.data.StoreManager.get('Prodotti');
        //this.getStore().clearFilter();
        store.clearFilter();

    },

    proxySuccess: function (record, operation) {
        switch (operation.getAction()) {
            case 'create':
                console.log('From the server: Created the ' + record.get('UserName') + ' ordine.');
                alert('Esito invio', 'Ti confermiamo che il tuo ordine è stato inviato, controlla la tua casella di posta.');
                break;
            case 'read':
                console.log('From the server: Loaded the ' + record.get('UserName') + ' ordine.');
                break;
            case 'update':
                console.log('From the server: Updated the ' + record.get('UserName') + ' ordine.');
                break;
            case 'destroy':
                console.log('From the server: Erased the ' + record.get('UserName') + ' ordine.');
                break;
        }
    },

    proxyFailure: function (record, operation) {
        switch (operation.getAction()) {
            case 'create':
                console.log('From the server: Failed to create ordine.');
                break;
            case 'read':
                console.log('From the server: Failed to read ordine.');
                break;
            case 'update':
                console.log('From the server: Failed to update ordine.');
                break;
            case 'destroy':
                console.log('From the server: Failed to erase ordine.');
                break;
        }
    },

    proxyCallback: function (record, operation) {
        console.log('This function is always invoked, regardless of success or failure');
    }

});