(function (angular) {
    'use strict';

    angular
        .module('4pjtApp')
        .factory('usersFactory', usersFactory);

    usersFactory.$inject = [
        'httpRequest'
    ];

    function usersFactory(httpRequest) {

        var users = [
            {
                givenName : 'givenName',
                surname   : 'surname',
                email     : 'geoffrey.testelin@gmail.com',
                username  : 'Totzefzeo',
                superAdmin: true
            },
            {
                givenName : 'Totfzefzefzefo',
                surname   : 'ergerge',
                email     : 'geoffrey.testelin@gmail.com',
                username  : 'Totfzefzefzefo',
                superAdmin: true
            },
            {
                givenName : 'Marco',
                surname   : 'Polo',
                email     : 'geoffrey.testelin@gmail.com',
                username  : 'Toto',
                superAdmin: true
            },
            {
                givenName : 'Marco',
                surname   : 'Polo',
                email     : 'geoffrey.testelin@gmail.com',
                username  : 'Toto59',
                superAdmin: true
            },
            {
                givenName : 'Testelin',
                surname   : 'Geoffrey',
                email     : 'geoffrey.testelin@gmail.com',
                username  : 'C0ZEN',
                superAdmin: true,
                private   : {
                    profile: true
                },
                type      : 'user',
                date      : {
                    register  : 1484561615,
                    lastUpdate: 1484561615
                }
            },
            {
                givenName : 'Unknown',
                surname   : 'User',
                email     : 'unknown.user@mystery.com',
                username  : 'User1',
                superAdmin: false,
                private   : {
                    profile: false
                },
                type      : 'user',
                date      : {
                    register  : 1484561615,
                    lastUpdate: 1484561615
                }
            },
            {
                givenName : 'Unknown2',
                surname   : 'User2',
                email     : 'unknown2.user2@mystery.com',
                username  : 'User2',
                superAdmin: false,
                private   : {
                    profile: false
                },
                type      : 'user',
                date      : {
                    register  : 1484561615,
                    lastUpdate: 1484561615
                }
            }
        ];

        // Public functions
        return {
            getGroups        : getGroups,
            getUserFullName  : getUserFullName,
            addUsersFullNames: addUsersFullNames,
            getUserByUsername: getUserByUsername,
            getUsers         : getUsers,
            httpRequest      : {
                getAll: httpRequestGetAll
            }
        };

        function getGroups() {
            return users;
        }

        function getUserFullName(userName) {
            for (var i = 0, length = users.length; i < length; i++) {
                if (users[i].username == userName) {
                    return users[i].givenName + ' ' + users[i].surname
                }
            }
        }

        function addUsersFullNames(objects) {
            var user;
            angular.forEach(objects, function (object) {
                user = getUserByUsername(object.username);
                if (user != null) {
                    object.givenName = user.givenName;
                    object.surname   = user.surname;
                }
            });
            return objects;
        }

        function getUserByUsername(userName) {
            for (var i = 0, length = users.length; i < length; i++) {
                if (users[i].username == userName) {
                    return users[i];
                }
            }
            return null;
        }

        function getUsers() {
            return users;
        }

        function setUsers(response) {
            angular.forEach(response, function (user) {
                // user = userFactory.formatUserData(user);
            });
            users = response;
        }

        /// HTTP REQUEST ///
        function httpRequestGetAll(callbackSuccess, callbackError) {
            httpRequest.requestGet('user', callbackSuccess, callbackError)
                .then(function (response) {
                    setUsers(response);
                })
            ;
        }
    }

})(window.angular);

