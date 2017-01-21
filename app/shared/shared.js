(
	function () {
		'use strict';
		angular.module('shared', [])
			.directive('abStringCompare', [stringCompare]);
		function stringCompare(){
			return {
				restrict:'A',
				scope: {
					otherVal:'@'
				},
				require: 'ngModel',
				//TODO: could you just set the confirm pasword pattern to the password and skip all this?
				link: function (scope, element, attrs, ngModel) {
					ngModel.$validators.matchFields = function matchFields(modelValue){
						if (!modelValue || !scope.otherVal || modelValue == scope.otherVal) return true;
						
						return false;
					}
				}
			}
		}
	}
)();