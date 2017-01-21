describe('sign on controller', function () {
	var $rootScope, dateFilter, vm;
	beforeEach(function () {
		module('signOn');
	});
	beforeEach(inject(
		function (_$rootScope_, $controller, $compile, _dateFilter_) {
			$rootScope = _$rootScope_;
			var scope = _$rootScope_.$new();
			dateFilter = jasmine.createSpy('dateFilter').and.callFake(_dateFilter_);
			var signUp = angular.element('<form id="signUp"><input id="pw" ng-Model="vm.password" /></form>');
			var element = $compile(signUp)(scope);
			$controller('signOnController as vm', {$scope:scope, dateFilter:dateFilter});
			vm = scope.vm;
		}
	));
	it('converts the date to ISO 8601', function () {
		var rawDate = new Date(1997, 10, 17);//reminder, month is 0 based
		vm.setBirthday(rawDate);
		expect(dateFilter).toHaveBeenCalledWith(jasmine.any(Date), 'yyyy-MM-dd');//looks inconsistent, but mm is minutes
		expect(vm.birthDay).toEqual('1997-11-17');
	});
	it('sets a confirm message', function () {
		vm.userName='foo@bar.com';
		vm.firstName = 'Foo';
		vm.lastName = 'Bar';
		vm.password = vm.confirmPassword = 'password';
		vm.birthDay = '1997-11-17';
		
		var jsonString = angular.toJson({
			userName:'foo@bar.com',
			firstName:'Foo',
			lastName: 'Bar',
			password: 'password',
			confirmPassword: 'password',
			birthDay:'1997-11-17'
		})
		vm.stubSubmit();
		
		expect(vm.submitConfirm).toContain(jsonString);
	});
	it('clears the confirm message', function () {
		vm.submitConfirm = 'a message';
		vm.clearSubmitConfirm();
		expect(vm.submitConfirm).toBeFalsy();
	});
	it('gets the correct minimum date', function () {
		var testDate = new Date(2000, 0, 1);
		var resultDate = vm.getMinDate(testDate);
		expect(resultDate.getFullYear()).toEqual(1850);
		expect(resultDate.getMonth()).toEqual(0);
		expect(resultDate.getDate()).toEqual(1);
	});
	it('gets the correct maximum date', function () {
		var testDate = new Date(2000, 0, 1);
		var resultDate = vm.getMaxDate(testDate);
		expect(resultDate.getFullYear()).toEqual(1986);
		expect(resultDate.getMonth()).toEqual(0);
		expect(resultDate.getDate()).toEqual(1);
	});
});