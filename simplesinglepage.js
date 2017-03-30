//
    var SimpleSinglePage = function(container) {
        this.pages = [];
        this.currentId = "";
        this.defaultId = "";
        this.container = $("#" + container);
        this.init();
        this.bindHashChange();
    }

    SimpleSinglePage.prototype = {
        init: function() {
            var pages = $('script[type="text/html"]');
            
            for (var i = 0; i < pages.length; i++) {
                var page = $(pages[i]);
                var id   = page.attr("id");
                var html = page.html();

                var obj = {
                    "id": id,
                    "html": html
                };

                obj.callback = page.attr("callback");

                this.pages.push(obj);

                if (page.attr("default")) {
                    this.defaultId = id;
                    this.currentId = id;
                }
            }

            this.createDocument();
        },
        getPage: function(hash) {
            var page, finalPage;
            var length = 0;
            for (var i = 0; i < this.pages.length; i++) {
                page = this.pages[i];
                if(0 == hash.indexOf(page.id)) {
                    if(page.id.length > length) {
                        length = page.id.length;
                        finalPage = page;
                    }
                }
            }
            return finalPage;
        },

        createDocument: function() {
            var id = "";
            var param = "(";
            var page;
            if (0 === location.hash.indexOf("#")){
                var hash = location.hash.split("#")[1];
                page = this.getPage(hash);
                hash = hash.replace(page.id, "");
                var argv = hash.split("/");

                if(argv.length > 1) {
                    for (var i = 1; i < argv.length; i++) {
                        param += argv[i];
                        if(i < (argv.length - 1)) {
                            param += ","
                        }
                    }
                }
            } else {
                page = this.find(this.defaultId);
            }
            
            param += ")";

            this.loadNewPage(page, param);
        },

        bindHashChange: function() {
            var _this = this;
            $(window).on('hashchange', function() {
                _this.createDocument();
            });
        },

        find: function(id) {
            for (var i = 0; i < this.pages.length; i++) {
                var page = this.pages[i];
                if (page.id == id) {
                    return page;
                }
            }
            return null;
        },

        loadNewPage: function(page, param) {
            this.container.empty();
            this.container.html(page.html);
            this.currentId = page.id;
            if(page.callback) {
                eval(page.callback + param);
            }
        },
    };