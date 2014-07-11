/**
 * Created with JetBrains WebStorm.
 * User: mauro
 * Date: 30/05/13
 * Time: 14.52
 * To change this template use File | Settings | File Templates.
 */

Ext.define('GAS.view.Contact', {
    extend: 'Ext.form.Panel',
    alias: 'widget.Contact',
    config: {
        url: 'contact.php',
        layout: 'vbox',
        height: 400,
        items: [
            {
                xtype: 'fieldset',
                title: 'Contact Us',
                instructions: 'Email address is optional',
                height: 300,
                items: [
                    {
                        xtype: 'textfield',
                        label: 'Name',
                        name: 'name',
                        flex: 1
                        //height: '10%'
                    },
                    {
                        xtype: 'emailfield',
                        label: 'Email',
                        name: 'email',
                        flex: 1
                        //height: '10%'
                    },
                    {
                        xtype: 'textareafield',
                        label: 'Message',
                        name: 'message',
                        flex: 1
                        //height: '80%'
                    }
                ]
            },
            {
                xtype: 'button',
                text: 'Send',
                ui: 'confirm',

                // The handler is called when the button is tapped
                handler: function () {

                    // This looks up the items stack above, getting a reference to the first form it see
                    var form = this.up('formpanel');

                    // Sends an AJAX request with the form data to the url specified above (contact.php).
                    // The success callback is called if we get a non-error response from the server
                    form.submit({
                        success: function () {
                            // The callback function is run when the user taps the 'ok' button
                            Ext.Msg.alert('Thank You', 'Your message has been received', function () {
                                form.reset();
                            });
                        }
                    });
                }
            }
        ]
    }
});