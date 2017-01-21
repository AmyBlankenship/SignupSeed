(
	function(){
		'use strict';
		/*	This is such a tiny app that I'm combining the module definition and
			the controller in one file.
		 */
		angular.module('signOn', [])
			.controller('signOnController', ['dateFilter', signOnController]);
		
		function signOnController(dateFilter){
			var vm = this;
			vm.userName = '';//don't need validation functionality as angular's input already has this
			vm.password = '';
			vm.confirmPassword = '';
			vm.firstName = '';
			vm.lastName = '';
			vm.rawBirthDay;
			vm.birthDay = '';
			
			vm.submitConfirm = '';
			
			vm.setBirthday = setBirthday;
			vm.stubSubmit = stubSubmit;
			vm.clearSubmitConfirm = clearSubmitConfirm;
			
			vm.datePickerOptions = {};
			
			//no onInit in router views
			init();
			
			//these are only exposed to make them testable
			//otherwise, they are not needed by the View
			vm.getMinDate = getMinDate;
			vm.getMaxDate = getMaxDate;
			
			function setBirthday(birthDate) {
				vm.birthDay = dateFilter(birthDate, 'yyyy-MM-dd');
			}
			function stubSubmit() {
				var data={
					userName: vm.userName,
					firstName: vm.firstName,
					lastName: vm.lastName,
					password: vm.password,
					confirmPassword: vm.confirmPassword,
					birthDay:vm.birthDay
				};
				/*	If we were doing a real request, it would look something like
					var submitObj = {
						url: 'myURL',
							method: "POST",
						data: angular.toJson(data),
						headers: {
						'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
					}
					$http(submitObj).then(function(response) {//stuff});
				*/
				vm.submitConfirm = 'Submitted request: \n' + angular.toJson(data);
			}
			
			function clearSubmitConfirm() {
				vm.submitConfirm = '';
			}
			
			function getMinDate(today) {
				//in case someone passes the same date to getMinDate and getMaxDate, make a copy
				var result = new Date(today.getTime());
				var year = result.getFullYear();
				//set the year back by 150
				result.setFullYear(year - 150);
				return result;
			}
			
			function getMaxDate(today){
				//in case someone passes the same date to getMinDate and getMaxDate, make a copy
				var result = new Date(today.getTime());
				var year = result.getFullYear();
				//set the year back by 14
				result.setFullYear(year - 14);
				return result;
			}
			
			//private
			function init() {
				//TODO: no tests
				var initDate = getMaxDate(new Date());
				var initYear = initDate.getFullYear();
				//set it back by 6 years, the person will be 20;
				initDate.setFullYear(initYear-6);
				vm.datePickerOptions = {
					minDate: getMinDate(new Date()),
					maxDate: getMaxDate(new Date()),
					initDate: initDate
				}
			}
			
		}
	}
)();