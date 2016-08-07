/**
 * ngTable: Table + Angular JS
 *
 * @author Vitalii Savchuk <esvit666@gmail.com>
 * @url https://github.com/esvit/ng-table/
 * @license New BSD License <http://creativecommons.org/licenses/BSD/>
 */

import * as ng1 from 'angular';
import { ITableScope } from './ngTableController';
import { IColumnDef } from './public-interfaces';

interface IInputAttributes extends ng1.IAttributes {
    ngTableColumnsBinding: string;
}

ngTableColumnsBinding.$inject = ["$parse"];

/**
 * @ngdoc directive
 * @name ngTableColumnsBinding
 * @description One-way data binds the $columns array generated by ngTable/ngTableDynamic to the specified
 * expression.
 *
 * This allows the $columns array to be accessed outside of the html table markup
 */
function ngTableColumnsBinding<T>($parse: ng1.IParseService){
    var directive = {
        restrict: 'A',
        require: 'ngTable',
        link: linkFn
    };
    return directive;

    function linkFn($scope: ITableScope<T>, $element: ng1.IAugmentedJQuery, $attrs: IInputAttributes){
        var setter = $parse($attrs.ngTableColumnsBinding).assign;
        if (setter){
            $scope.$watch<IColumnDef[]>('$columns', function(newColumns){
                var shallowClone = (newColumns || []).slice(0);
                setter($scope, shallowClone);
            });
        }
    }
}

export { ngTableColumnsBinding };