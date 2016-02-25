angular.module('app.routes', [])

.config(function ($stateProvider, $urlRouterProvider, $ionicConfigProvider) {

    $ionicConfigProvider.platform.android.tabs.style('standard');
    $ionicConfigProvider.platform.android.tabs.position('bottom');
    $ionicConfigProvider.navBar.alignTitle('center');


    // Ionic uses AngularUI Router which uses the concept of states
    // Learn more here: https://github.com/angular-ui/ui-router
    // Set up the various states which the app can be in.
    // Each state's controller can be found in controllers.js
    $stateProvider
        .state('tabs.speakStory', {
            url: '/speakStory',
            views: {
                'speakStory': {
                    templateUrl: 'templates/speakStory.html',
                    controller: 'speakStoryCtrl'
                }
            }
        })

    .state('tabs.storyList', {
        url: '/speakStory/:cateId',
        views: {
            'speakStory': {
                templateUrl: 'templates/storyList.html',
                controller: 'StoryListCtrl'
            }
        }
    })

    .state('tabs.voiceControl', {
        url: '/voiceControl',
        views: {
            'voiceControl': {
                templateUrl: 'templates/voiceControl.html',
                controller: 'voiceControlCtrl'
            }
        }
    })

    .state('tabs.myProfile', {
        url: '/myProfile',
        views: {
            'myProfile': {
                templateUrl: 'templates/myProfile.html',
                controller: 'myProfileCtrl'
            }
        }
    })


    .state('tabs', {
        url: '/tabs',
        abstract: true,
        templateUrl: 'templates/tabs.html'
    })

    ;

    // if none of the above states are matched, use this as the fallback
    $urlRouterProvider.otherwise('/tabs/speakStory');

});