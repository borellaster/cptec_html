define(function (require) {
    'use strict';

    var module = require('../module');
    module.directive("ngAnimation", function ($parse, $compile) {
        return {
            link: function ($scope, element, attributes) {
                $scope._animation_change = function (v) {
                    $scope.header.effect = v;
                };

                attributes.$$element.find('button').each(function (index, value) {
                    $(this).attr({ 'ng-click': "_animation_change('" + $(this).attr('data-value') + "')" });
                });

                element.html($compile(element.html())($scope));
            }
        };
    });
});