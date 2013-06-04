/*
 * File: app/view/Login.js
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

Ext.define('GAS.view.Login', {
    extend: 'Ext.form.Panel',
    alias: "widget.Login",

    requires: [
        'Ext.form.FieldSet',
        'Ext.form.Password',
        'Ext.Label',
        'Ext.Img',
        'Ext.util.DelayedTask'
    ],

    config: {
        title: 'Login',
        items: [
            {
                docked: 'top',
                xtype: 'titlebar',
                title: 'Login'

            },
            {
                xtype: 'image',
                centered: true,
                style: 'width:80px;height:80px;margin:auto',
                src: 'images/lock.png'
            },
            {
                xtype: 'label',
                hidden: true,
                hideAnimation: 'fadeOut',
                html: 'Login failed. Please enter the correct credentials.',
                id: 'signInFailedLabel',
                itemId: 'signInFailedLabel',
                showAnimation: 'fadeIn',
                style: 'color:#990000;margin:5px 0px;'
            },
            {
                xtype: 'fieldset',
                id: 'myFieldSet',
                items: [
                    {
                        xtype: 'textfield',
                        id: 'userNameTextField',
                        itemId: 'userNameTextField',
                        name: 'userNameTextField',
                        required: true,
                        placeHolder: 'Username',
                        value: 'mauro'

                    },
                    {
                        xtype: 'passwordfield',
                        itemId: 'passwordTextField',
                        name: 'passwordTextField',
                        required: true,
                        placeHolder: 'Password',
                        value: 'marson'

                    }
                ]
            },
            {
                xtype: 'button',
                action: 'login',
                padding: 10,
                text: 'Log in'
            }
        ]
    },

    showSignInFailedMessage: function (message) {
        var label = this.down('#signInFailedLabel');
        label.setHtml(message);
        label.show();
    }

});