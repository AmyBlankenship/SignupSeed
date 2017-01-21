describe('ab-string-compare directive spec', function () {
	var $rootScope, scope, element, ngModel;
	beforeEach(function () {
		module('shared');
	});
	beforeEach(inject(
		function(_$rootScope_, $compile) {
			$rootScope = _$rootScope_;
			scope = $rootScope.$new();
			scope.password = '';
			scope.confirmPassword = '';
			var rawElement = angular.element('<input ab-string-compare data-ng-model="password" other-val="{{confirmPassword}}" ></input>');
			element = $compile(rawElement)(scope);
			scope.$digest();
			ngModel = element.controller('ngModel');
		}
	));
	it('adds a custom validator', function () {
		expect(ngModel.$validators.matchFields).toEqual(jasmine.any(Function));
	});
	it('does not set an error when neither field has anything in it', function () {
		expect(ngModel.$error.matchFields).toBeFalsy();
	});
	it('does not set an error when only the model has a value', function () {
		ngModel.$setViewValue('foo');
		
		expect(ngModel.$error.matchFields).toBeFalsy();
	});
	it('does not set an error when only the other field has a value', function () {
		scope.confirmPassword = 'foo';
		scope.$digest();
		ngModel.$validate();
		scope.$digest();
		expect(ngModel.$error.matchFields).toBeFalsy();
	});
	it('sets an error when fields contain values that do not match', function () {
		scope.confirmPassword = 'bar';
		scope.$digest();
		ngModel.$setViewValue('foo');
		
		expect(ngModel.$error.matchFields).toBe(true);
	});
	it('does not set an error when fields contain values that match', function () {
		scope.confirmPassword = 'foo';
		scope.$digest();
		ngModel.$setViewValue('foo');
		
		expect(ngModel.$error.matchFields).toBeFalsy();
	});
});