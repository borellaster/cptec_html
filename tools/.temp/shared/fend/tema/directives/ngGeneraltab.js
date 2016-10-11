define(function (require) {
    'use strict';

    var module = require('../module');
    module.directive("ngGeneraltab", function () {
        return {
            link: function (scope, element, attrs) {
                element.click(function (e) {
                    e.preventDefault();
                });
            }
        };
    });
});    