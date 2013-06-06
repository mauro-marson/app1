/**
 * Created with JetBrains WebStorm.
 * User: mauro
 * Date: 30/05/13
 * Time: 14.44
 * To change this template use File | Settings | File Templates.
 */
Ext.define('GAS.view.Blog', {
    extend: 'Ext.dataview.NestedList',
    alias: 'widget.Blog',
    config: {
        displayField: 'title',
        height: 5,
        store: {
            type: 'tree',

            fields: ['title', 'link', 'author', 'contentSnippet', 'content', {
                name: 'leaf',
                defaultValue: true
            }],

            root: {
                leaf: false
            },

            proxy: {
                type: 'jsonp',
                url: 'https://ajax.googleapis.com/ajax/services/feed/load?v=1.0&q=http://feeds.feedburner.com/SenchaBlog',
                reader: {
                    type: 'json',
                    rootProperty: 'responseData.feed.entries'
                }
            }
        },

        detailCard: {
            xtype: 'panel',
            scrollable: true,
            styleHtmlContent: true
        },

        listeners: {
            itemtap: function (nestedList, list, index, element, post) {
                this.getDetailCard().setHtml(post.get('content'));
            }
        }
    },
    initialize: function () {
        console.log('initialize function di Blog');
    }

});
