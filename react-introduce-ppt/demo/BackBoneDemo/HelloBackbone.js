$(function() {
    var Person = Backbone.Model.extend({});

    var Persons = Backbone.Collection.extend({
        model: Person,
        sync: function(method, collection, options) {
            switch (method) {
                case 'read':
                    $.ajax('person.json').then(function(data) {
                        var json = JSON.parse(data);
                        options.success(json);
                    }.bind(this))
                    break;
            }
        }
    });

    var PersonView = Backbone.View.extend({
        el: $("#person-list"),
        template: Handlebars.compile('<input id="userName" type="text">\
			<button id="check">报到</button>\
			<ul>\
				{{#each persons}}\
				 <li>你好，<b>{{this.name}}</b>，欢迎来到火星！</li>\
				 {{/each}}\
			 </ul>'),

        initialize: function() {
            this.listenTo(this.collection, 'add', this.render);
            this.listenTo(this.collection, 'reset', this.render);
        },

        events: {
            "click #check": "checkIn"
        },

        render: function() {
            this.$el.html(this.template({ persons: this.collection.toJSON() }));
            return this;
        },

        checkIn: function() {
            var userName = $("#userName").val();
            if (userName) {
                var person = new Person({ name: userName });
                this.collection.add(person);
            }
        }
    });

    var personView = new PersonView({ 'collection': new Persons() });
    personView.collection.fetch({
        'reset': true
    });
})
