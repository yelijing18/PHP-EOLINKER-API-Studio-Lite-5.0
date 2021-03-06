(function () {
    'use strict';
    /*
     * author：广州银云信息科技有限公司
     * 提示指令js
     */
    angular.module('eolinker.directive')

        .directive('tipDirective', ['$compile', '$filter', '$timeout', function ($compile, $filter, $timeout) {
            return {
                restrict: 'AE',
                transclude: true,
                template: '<span class="iconfont icon-yiwen1" ></span>' +
                    '<div class="tips-message eo-tip-container" style="margin-left: {{data.input.marginLeft}}px;margin-top:-{{data.element.clientHeight+5}}px;"><div><div class="message-li" id="tip-directive-js-{{data.uuid}}" ></div><div class="arrow-li"></div></div>',
                scope: {
                    input: '@'
                },
                link: function ($scope, elem, attrs, ctrl) {
                    $scope.data = {
                        input: {
                            marginLeft: attrs.marginLeft || -5
                        },
                        uuid: $filter('uuidFilter')(),
                            element: null
                    }
                    var data = {
                        timer: null
                    },fun={};
                    fun.$destroy = function () {
                        if (data.timer) {
                            $timeout.cancel(data.timer);
                        }
                    }
                    data.timer = $timeout(function () {
                        $scope.data.element = document.getElementById('tip-directive-js-' + $scope.data.uuid);
                        angular.element($scope.data.element).append($scope.input);
                    })
                    $scope.$on('$destroy', fun.$destroy);
                }
            };
        }]);
})();