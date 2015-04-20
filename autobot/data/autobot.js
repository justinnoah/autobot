/*
Script: autobot.js
    The client-side javascript code for the AutoBot plugin.

Copyright:
    (C) Justin Noah 2009 <justinnoah@gmail.com>
    This program is free software; you can redistribute it and/or modify
    it under the terms of the GNU General Public License as published by
    the Free Software Foundation; either version 3, or (at your option)
    any later version.

    This program is distributed in the hope that it will be useful,
    but WITHOUT ANY WARRANTY; without even the implied warranty of
    MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
    GNU General Public License for more details.

    You should have received a copy of the GNU General Public License
    along with this program.  If not, write to:
        The Free Software Foundation, Inc.,
        51 Franklin Street, Fifth Floor
        Boston, MA  02110-1301, USA.

    In addition, as a special exception, the copyright holders give
    permission to link the code of portions of this program with the OpenSSL
    library.
    You must obey the GNU General Public License in all respects for all of
    the code used other than OpenSSL. If you modify file(s) with this
    exception, you may extend this exception to your version of the file(s),
    but you are not obligated to do so. If you do not wish to do so, delete
    this exception statement from your version. If you delete this exception
    statement from all source files in the program, then also delete it here.
*/

Ext.namespace('Deluge.plugins.autobot.ui');
Ext.namespace('Deluge.plugins.autobot.util');

Deluge.plugins.autobot.PLUGIN_NAME = 'AutoBot';
Deluge.plugins.autobot.MODULE_NAME = 'AutoBot';
Deluge.plugins.autobot.DISPLAY_NAME = _('AutoBot');

Deluge.plugins.autobot.ui.PreferencePage = Ext.extend(Ext.Panel, {

    title: Deluge.plugins.autobot.DISPLAY_NAME = _('AutoBot'),

    layout: {
        type: 'vbox',
        align: 'stretch'
    },

    initComponent: function() {
        Deluge.plugins.autobot.ui.PreferencePage.superclass.initComponent.call(
            this
        );

        // Server address/port
        this.serverInfo = this.add({
            xtype: 'container',
            layout: 'hbox',
            items: [{
                xtype: 'label',
                text: _('Server')
            },{
                xtype: 'textfield',
                allowBlank: false,
                blankText: 'A valid DNS or IP address is needed'
            },{
                xtype: 'label',
                text: _('Port')
            },{
                xtype: 'spinnerfield',
                name: 'serverPort',
                fieldLabel: _('Port Number'),
                value: 6997,
                minValue: 0,
                maxValue: 65535,
                allowDecimals: false
            }],
        });

        this.botChannel = this.add({
            xtype: 'container',
            layout: 'hbox',
            items: [{
                xtype: 'label',
                text: _('Channel')
            },{
                xtype: 'textfield',
                allowBlank: false,
                blankText: 'A valid IRC channel is needed'
            }]
        });

        this.botName = this.add({
            xtype: 'container',
            layout: 'hbox',
            items: [{
                xtype: 'label',
                text: _('Name')
            },{
                xtype: 'textfield',
                allowBlank: false,
                blankText: 'A valid IRC handle/nickname is needed'
            }]
        });

        this.searchRegex = this.add({
            xtype: 'container',
            layout: 'hbox',
            items: [{
                xtype: 'label',
                text: _('Regex')
            },{
                xtype: 'textfield',
                allowBlank: true
            }]
        });

    }

});

Deluge.plugins.autobot.Plugin = Ext.extend(Deluge.Plugin, {

    name: Deluge.plugins.autobot.PLUGIN_NAME,

    onEnable: function() {
        this.prefsPage = new Deluge.plugins.autobot.ui.PreferencePage();
        deluge.preferences.addPage(this.prefsPage);

        console.log("%s enabled!", Deluge.plugins.autobot.PLUGIN_NAME);
    },

    onDisable: function() {
        deluge.preferences.selectPage(_('Plugins'));
        deluge.preferences.removePage(this.prefsPage);
        this.prefsPage.destroy();

        console.log("%s disabled!", Deluge.plugins.autobot.PLUGIN_NAME);
    }

});

Deluge.registerPlugin(
    Deluge.plugins.autobot.PLUGIN_NAME,
    Deluge.plugins.autobot.Plugin
);
