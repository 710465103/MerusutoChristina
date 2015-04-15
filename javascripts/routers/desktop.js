(function() {
  var __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  App.Router = (function(_super) {
    __extends(Router, _super);

    function Router() {
      return Router.__super__.constructor.apply(this, arguments);
    }

    Router.prototype.routes = {
      "close-modal": "closeModal",
      "units": "openUnitsIndexPage",
      "units/:id": "openUnitsShowPage",
      "units/:id/edit": "openUnitsEditPage",
      "monsters": "openMonstersIndexPage",
      "monsters/:id": "openMonstersShowPage",
      "monsters/:id/edit": "openMonstersEditPage",
      "admin": "openAdminPage",
      "!*otherwise": "removeExclamationMark",
      "*otherwise": "index"
    };

    Router.prototype.closeModal = function() {
      return App.main.closeModal();
    };

    Router.prototype.index = function() {
      return this.navigate("#units", true);
    };

    Router.prototype.removeExclamationMark = function(path) {
      return this.navigate(path, true);
    };

    Router.prototype.ensureCollection = function(key, collection, callback) {
      if (App[key] != null) {
        return callback();
      } else {
        App[key] = new App.Collections[collection]();
        App[key].fetch({
          reset: true
        });
        return App[key].once("reset", function() {
          return callback();
        });
      }
    };

    Router.prototype.openCollectionPage = function(key, collection, page) {
      if (this.currCollection === collection) {
        return App.main.resumeCollectionPage();
      } else {
        return this.ensureCollection(key, collection, (function(_this) {
          return function() {
            var view;
            view = new App.Pages[page]({
              collection: App[key]
            }).render();
            App.main.openCollectionPage(view);
            return _this.currCollection = collection;
          };
        })(this));
      }
    };

    Router.prototype.openModelPage = function(key, collection, page, id) {
      return this.ensureCollection(key, collection, function() {
        var model, view;
        model = App[key].get(id);
        view = new App.Pages[page]({
          model: model
        }).render();
        return App.main.openModelPage(view);
      });
    };

    Router.prototype.openAdminPage = function() {
      var view;
      this.currCollection = null;
      if (AV.User.current()) {
        view = new App.Pages.Admin().render();
        return App.main.openCollectionPage(view);
      } else {
        return App.main.openLoginModal(this.openAdminPage);
      }
    };

    Router.prototype.openUnitsIndexPage = function() {
      return this.openCollectionPage("units", "Units", "UnitsIndex");
    };

    Router.prototype.openUnitsShowPage = function(id) {
      return this.openModelPage("units", "Units", "UnitsShow", id);
    };

    Router.prototype.openUnitsEditPage = function(id) {
      return this.openModelPage("units", "Units", "UnitsEdit", id);
    };

    Router.prototype.openMonstersIndexPage = function() {
      return this.openCollectionPage("monsters", "Monsters", "MonstersIndex");
    };

    Router.prototype.openMonstersShowPage = function(id) {
      return this.openModelPage("monsters", "Monsters", "MonstersShow", id);
    };

    Router.prototype.openMonstersEditPage = function(id) {
      return this.openModelPage("monsters", "Monsters", "MonstersEdit", id);
    };

    return Router;

  })(Backbone.Router);

}).call(this);
