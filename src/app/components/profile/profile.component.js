import template from './profile.tpl.html'
import styles from './profile.css'

class Controller {
  /** @ngInject */
  constructor($http, utils) {
    var vm = this;

    vm.skills = vm.skills.data;
    vm.styles = styles;
    vm.levels = [
      {
        LevelName: "Trainee",
        LevelId: 1
      },
      {
        LevelName: "Junior",
        LevelId: 2
      },
      {
        LevelName: "Middle",
        LevelId: 3
      },
      {
        LevelName: "Senior",
        LevelId: 4
      }
    ];

    vm.addSkill = addSkill;
    vm.deleteSkill = deleteSkill;
    vm.edit = edit;
    vm.save = save;

    utils.getById('GET', 'skills/', vm.user.Id)
      .then(function(res) {
        vm.user.skills = res;
    });

    function addSkill() {
      clear();

      vm.user.skills.push({
        edited: true
      });
    }

    function clear() {
      vm.user.skills.forEach(function(skill) {
        skill.edited = false;
      })
    }

    function deleteSkill(skill) {
      var index = vm.user.skills.indexOf(skill);

      if (!skill.Id) {
        vm.user.skills.splice(index, 1);
        return
      }

      utils.deleteData('skills', 'id=' + skill.Id + '&empId=' + vm.user.Id)
        .then(function(res) {
          console.log(res);
          vm.user.skills.splice(index, 1);
        }, function(res) {
          console.log(res);
        });
    }

    function edit(skill) {
      skill.edited = true;
      skill.selectedSkill = {
        Name: skill.Name,
        Id: skill.Id
      };
      skill.selectedLevel = {
        LevelName: skill.LevelName,
        LevelId: skill.LevelId
      };
    }

    function save(skill) {
      var index = vm.user.skills.indexOf(skill);

      if (!(skill.selectedSkill || skill.selectedLevel)) {
        return
      }

      skill.edited = false;

      if (!skill.Id) {
        utils.serverReq('POST', 'skills', {
          SkillId: skill.selectedSkill.Id,
          LevelId: skill.selectedLevel.LevelId,
          EmployeeId: vm.user.Id
        }).then(function (res) {
          vm.user.skills[index] = res.data;
        })
      } else {
        utils.serverReq('PUT', 'skills', {
          SkillId: skill.selectedSkill.Id,
          LevelId: skill.selectedLevel.LevelId,
          EmployeeId: vm.user.Id
        }).then(function (res) {
          vm.user.skills[index] = res.data; // при первом запросе "LevelName" возвращается с сервера со значением "null"
        })
      }
    }
  }
}

export default {
  template,
  controller: Controller,
  bindings: {
    user: '<',
    skills: '<'
  }
};
