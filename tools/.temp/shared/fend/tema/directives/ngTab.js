define(function (require) {
    'use strict';

    var module = require('../module');
    module.directive("ngTab", function ($parse, $compile) {
        return {
            link: function ($scope, element, attributes) {
                $("a", element).click(function (e) {
                    e.preventDefault();
                });
            }
        };
    });
});    