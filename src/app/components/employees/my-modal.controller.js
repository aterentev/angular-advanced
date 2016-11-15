MyModalController.$inject = ['$scope', '$uibModalInstance', 'utils'];

function MyModalController($scope, $uibModalInstance, utils) {
  var vm = this;

  console.log(vm.employees);

  vm.newUser = {
    First: '',
    Last: '',
    Id: Math.floor((Math.random()*9999)+1),
    Email: '',
    LocationId: 1,
    Birthday: new Date(),
    Address: '',
    Skype: '',
    Projects: [],
    Phone: '',
    ImageUrl: '',
    PositionId: 1,
    Password: ''
  };

  vm.addEmployee = addEmployee;

  function addEmployee() {
    utils.serverReq("POST", "employees", vm.newUser)
      .then(function(res) {



      }, function(rej) {
        console.log(rej);
      });
  }
}

module.exports = MyModalController;
