export default utils;

utils.$inject = ['$http', '$q', '$location', 'localStorageService'];

function utils($http, $q, $location, localStorageService) {
  return {
    authorize: function(login, password) {
      return $q(function(resolve, reject) {
        $http({
          method: 'POST',
          data: {
            Login: login,
            Password: password
          },
          url: '/api/employees/login'
        }).then(function(res) {
          resolve(res);
        }, function(res) {
          reject(res);
        })
      })
    },

    checkAuth: function(user) {
      if (!user) {
        $location.path('/login');
        console.log('go away');
      }
    },

    deleteData: function(url, query) {
      return $q(function(resolve, reject) {
        $http({
          method: "DELETE",
          url: '/api/' + url + '?' + query
        })
          .then(function(res) {
            resolve(res);
          }, function(res) {
            reject(res);
          })
      })
    },

    getById: function(method, url, id) {
      return $q(function(resolve, reject) {
        $http({
          method: method,
          url: '/api/' + url + id
        })
          .then(function (res) {
            // console.log('utils success ', res);
            resolve(res.data);
          }, function (res) {
            // console.log('utils error ', res);
            reject(res);
          });
      })
    },

    searchData: function(url, query) {
      return $q(function(resolve, reject) {
        $http({
          method: "GET",
          url: '/api/' + url + '/search?' + query
        })
          .then(function(res) {
            resolve(res);
          }, function(res) {
            reject(res);
          })
      })
    },

    serverReq: function(method, url, data) {
      return $q(function(resolve, reject) {
        $http({
          method: method,
          url: '/api/' + url,
          data: data
        })
          .then(function(res) {
            resolve(res);
          }, function(res) {
            reject(res);
          })
      })
    }
  }
}
