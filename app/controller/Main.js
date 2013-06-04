Ext.define('GAS.controller.Main', {
    extend: 'Ext.app.Controller',

    views: [

    ],
    model: [

    ],
    stores: [

    ],

    config: {

        refs: {
            // qui si formano i metodi get...
            // esempio getLoginButton
            //loginButton: 'button[action=login]'
            //fornitoriNavigation: 'FornitoriNavigation',
            //fornitoriList: 'FornitoriList',
            //fornitoriDetail: 'FornitoriDetail'
            //
        },

        control: {
            /*
             loginButton: {
             tap: 'doLogin'
             }
             */
        }
    },

    launch: function () {
        console.log('on launch from controller Main');

    },

    init: function () {
        //Sencha Touch 1
        //this.getLoginView().create();
        //Sencha Touch 2
        console.log('init function di controller Main');
        //Ext.create('GAS.view.Login');

        //console.log('dopo');

        this.control({

        });


    },
    /*doLogin: function(button, e, options) {
     console.log('tap from login button from controller');
     var me = this;

     var panel=button.up('panel'),
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
     //var fornitoriNavigation = Ext.widget('FornitoriNavigation');
     //fornitoriNavigation.show();
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

     }
     *//*
     onLogOffButtonTap: function(button, e, options) {
     console.log('tap from logoff button');
     var me = this;

     var loginView = this.getLoginView();
     Ext.Viewport.animateActiveItem(loginView, this.getSlideRightTransition());

     var usernameField = loginView.down('#userNameTextField'),
     passwordField = loginView.down('#passwordTextField'),
     label = loginView.down('#signInFailedLabel');

     label.hide();

     usernameField.setValue('');
     passwordField.setValue('');

     },

     onMainMenuButtonTap: function(button, e, options) {
     console.log('tap from main button');
     var me = this;

     var mainMenuView = this.getMainMenuView();
     Ext.Viewport.animateActiveItem(mainMenuView, this.getSlideLeftTransition());
     },

     onFornitoriButtonTap: function(button, e, options) {
     console.log('tap from fornitori button');
     var me = this;
     var mainMenuView = me.getMainMenuView();

     mainMenuView.setMasked({
     xtype: 'loadmask',
     message: 'Loading...'
     });
     var storeFornitori = Ext.data.StoreManager.lookup('Fornitori');
     storeFornitori.load({
     callback: function (records, operation, success) {
     console.log(operation);
     if (success) {
     console.log('loaded records');
     console.log(success);
     console.log(records.length);
     var fornitoriList = me.getFornitoriList();
     mainMenuView.setMasked(false);
     Ext.Viewport.animateActiveItem(fornitoriList, me.getSlideUpTransition());
     }
     }

     });
     //alert('cassso');



     },
     onCategorieButtonTap: function(button, e, options) {
     console.log('tap from categorie button');
     var me = this;
     var mainMenuView = me.getMainMenuView();

     mainMenuView.setMasked({
     xtype: 'loadmask',
     message: 'Loading...'
     });
     var storeCategorie = Ext.data.StoreManager.lookup('Categorie');
     storeCategorie.load();
     var categorieView = me.getCategorieView();
     mainMenuView.setMasked(false);
     // Set up a model to use in our Store
     Ext.define('User', {
     extend: 'Ext.data.Model',
     config: {
     fields: [
     {name: 'firstName', type: 'string'},
     {name: 'lastName',  type: 'string'},
     {name: 'age',       type: 'int'},
     {name: 'eyeColor',  type: 'string'}
     ]
     }
     });

     Ext.create("Ext.data.Store", {
     storeId: "usersStore",
     model: "User",
     data : [
     {firstName: "Ed",    lastName: "Spencer"},
     {firstName: "Tommy", lastName: "Maintz"},
     {firstName: "Aaron", lastName: "Conran"},
     {firstName: "Jamie", lastName: "Avins"}
     ]
     });

     var b= new Ext.create("Ext.List", {
     fullscreen: true,
     store: "usersStore",
     itemTpl: "{lastName}, {firstName}"
     });

     //**********Ext.Viewport.animateActiveItem(categorieView, me.getSlideUpTransition());



     var c= new Ext.create('Ext.DataView', {
     fullscreen: true,

     store: {
     autoLoad: true,
     fields: ['Titolo', 'IDCategoria', 'IDNegozio'],

     proxy: {
     type: 'ajax',
     actionMethods: 'POST',
     extraParams: {
     tableName: 'categorie'
     },
     api: {
     read: '../../../gas/getTable.php',
     create: 'TODO/Create',
     destroy: 'TODO/Delete',
     update: 'TODO/Update'
     },
     reader: {
     type: 'json',
     rootProperty: 'data'

     }
     }
     },

     itemTpl: '<img src="{Titolo}" /><h2>{IDCategoria}</h2><p>{IDNegozio}</p>'
     });
     Ext.Viewport.animateActiveItem(c, me.getSlideUpTransition());

     },

     getSlideLeftTransition: function() {
     return {
     type: 'slide',
     direction: 'left'
     };
     },

     getSlideRightTransition: function() {
     return {
     type: 'slide',
     direction: 'right'
     };
     },

     getSlideUpTransition: function() {
     return {
     type: 'slide',
     direction: 'up'
     };
     },

     signInSuccess: function() {
     console.log('Signed in.');
     //var
     //loginView   = this.getLoginView(),
     //fornitoriNavigationView= this.getFornitoriNavigationView(),
     //mainMenuView = this.getMainMenuView(),
     var me= this;
     var fornitoriNavigation= new this.getFornitoriNavigation();
     var fornitoriList= new this.getFornitoriList();
     //fornitoriList=this.getFornitoriList()
     //;
     //loginView.setMasked(false);


     //Ext.Viewport.animateActiveItem(fornitoriNavigationView, this.getSlideLeftTransition());
     //Ext.Viewport.animateActiveItem(fornitoriNavigation, this.getSlideLeftTransition());
     },

     onFornitoriNav: function(){
     var fornitoriNavigation = Ext.widget('FornitoriNavigation');
     fornitoriNavigation.show();

     },


     singInFailure: function(message) {
     var loginView = this.getLoginView();
     loginView.showSignInFailedMessage(message);
     loginView.setMasked(false);
     },

     onbt1: function() {
     console.log('mona');
     },

     showDetail: function(list, record) {
     this.getMain().push({
     xtype: 'fornitoridetail',
     title: record.fullName(),
     data: record.getData()
     })
     }
     */
});