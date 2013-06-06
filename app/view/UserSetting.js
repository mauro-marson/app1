/**
 * Created with JetBrains WebStorm.
 * User: mauro
 * Date: 28/05/13
 * Time: 15.32
 * To change this template use File | Settings | File Templates.
 */
Ext.define('GAS.view.UserSetting', {
    extend: 'Ext.form.Panel',
    alias: 'widget.UserSetting',
    config: {
        fullscreen: true,
        items: [
//            {
//                xtype: 'titlebar',
//                title: 'Settaggi utente',
//                docked: 'top',
//                items: [
//                    {
//                        xtype: 'button',
//                        text: 'Back',
//                        action: 'fornitori',
//                        align: 'left'
//                    }
//                ]
//            },
            {
                xtype: 'fieldset',
                title: 'Settaggi utente',
                items: [
                    {
                        xtype: 'textfield',
                        name: 'fname',
                        label: 'First name:'
                    },
                    {
                        xtype: 'textfield',
                        name: 'lname',
                        label: 'Last name:'
                    }
                ] // items
            },
            {
                xtype: 'toolbar',
                layout: {
                    pack: 'center'
                }, // layout
                ui: 'plain',
                items: [
                    {
                        xtype: 'button',
                        text: 'Reset',
                        ui: 'decline',
                        handler: function (btn, evt) {
                            Ext.Msg.confirm('', 'Are you sure you want to reset this form?', function (btn) {
                                if (btn === 'yes') {
                                    contactForm.setValues({
                                        fname: '',
                                        lname: ''
                                    }); // contactForm()
                                } // switch
                            }); // confirm()
                        }
                    },
                    {
                        xtype: 'button',
                        text: 'Submit',
                        action: 'backToFornitori',
                        ui: 'confirm'
//                        handler: function (btn, evt) {
//                            var values = contactForm.getValues();
//                            Ext.Msg.alert('Welcome', Ext.String.format('{0} {1}', values.fname, values.lname));
//                        } // handler
                    }
                ] // items (toolbar)
            }
        ] // items (formpanel)
    }
})
;

