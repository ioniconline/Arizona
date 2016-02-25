angular.module('app.controllers', [])

.controller('speakStoryCtrl', function ($scope, $window) {

    $scope.images = [
        {
            id: '1',
            name: '睡前故事',
            src: './img/cate/1.jpg'
        },
        {
            id: '2',
            name: '经典童话',
            src: './img/cate/2.jpg'
        },
        {
            id: '3',
            name: '男孩故事',
            src: './img/cate/3.jpg'
        },
        {
            id: '5',
            name: '女孩故事',
            src: './img/cate/5.jpg'
        },

        {
            id: '4',
            name: '经典寓言',
            src: './img/cate/4.jpg'
        },
        {
            id: '6',
            name: '生活故事',
            src: './img/cate/6.jpg'
        },
        {
            id: '7',
            name: '动物故事',
            src: './img/cate/7.jpg'
        },
        {
            id: '8',
            name: '智慧故事',
            src: './img/cate/8.jpg'
        },
        {
            id: '9',
            name: '成语故事',
            src: './img/cate/9.jpg'
        },
        {
            id: '10',
            name: '历史故事',
            src: './img/cate/10.jpg'
        }];


    $scope.loadStoryList = function (cateId) {
        // window.alert("loading catetory " + cateId);
        var url = '#/tabs/speakStory/' + cateId;
        console.log("start jumping to song list = " + url);
        $window.location.href = url;
    }

})


.controller('StoryListCtrl', function ($scope, $stateParams, $ionicModal, $ionicListDelegate, $window, $cordovaMedia, StoryService) {

    $scope.detail = {};

    var cateMap = [
        {
            id: '1',
            name: '睡前故事',
            src: './img/cate/1.jpg'
        },
        {
            id: '2',
            name: '经典童话',
            src: './img/cate/2.jpg'
        },
        {
            id: '3',
            name: '男孩故事',
            src: './img/cate/3.jpg'
        },
        {
            id: '5',
            name: '女孩故事',
            src: './img/cate/5.jpg'
        },

        {
            id: '4',
            name: '经典寓言',
            src: './img/cate/4.jpg'
        },
        {
            id: '6',
            name: '生活故事',
            src: './img/cate/6.jpg'
        },
        {
            id: '7',
            name: '动物故事',
            src: './img/cate/7.jpg'
        },
        {
            id: '8',
            name: '智慧故事',
            src: './img/cate/8.jpg'
        },
        {
            id: '9',
            name: '成语故事',
            src: './img/cate/9.jpg'
        },
        {
            id: '10',
            name: '历史故事',
            src: './img/cate/10.jpg'
        }];


    var queryCateName = function (cateId) {
        for (var i = 0; i < cateMap.length; i++) {
            if (cateMap[i].id == cateId) {
                return cateMap[i].name;

            }
        }
        return "";
    }

    $scope.items = [];
    var getStoryList = function (cateId) {
        StoryService.fetchStoryList(cateId).then(function (data) {
            var arrary = [];
            data.forEach(function (b) {
                var one = {};
                one.id = b.id;
                one.title = b.title;
                one.image = "http://" + b.image
                one.age = b.age
                one.text = b.text
                arrary.push(one);
                //               console.log(one.title + one.image + one.text + one.age)
            });
            $scope.items = arrary;
        }, function (error) {
            console.log("获取故事列表出错");
        });
    }

    var storyLyric4local = "";

    var getStoryDetail = function (storyId) {
        StoryService.fetchStoryDetail(storyId).then(function (data) {
            $scope.detail.lyric = data.text;
            $scope.detail.title = data.title;
            storyLyric4local = data.text;
            $scope.detail.image = "http://" + data.image;
        }, function (error) {
            console.log("获取故事详情出错");
        });
    }

    $scope.cate = queryCateName($stateParams.cateId);

    getStoryList($stateParams.cateId);


    $ionicModal.fromTemplateUrl('templates/storyDetail.html', {
        scope: $scope
    }).then(function (modal) {
        $scope.modal = modal;
    });

    $scope.close = function () {
        $scope.modal.hide();

    }

    ////录音
    var recRedia;
    var player = null;


    $scope.startRecording = function () {
        console.log("startRecording");

        var recSrc = "rec.mp3";
        //        var playSrc = "./audio/bg1.mp3"; 
        //        var playSrc = "http://7xio6q.com1.z0.glb.clouddn.com/bg1.mp3";


        recRedia = $cordovaMedia.newMedia(recSrc);
        //        playMedia = $cordovaMedia.newMedia(playSrc);
        //
        //        playMedia.setVolume(0.01);
        //        playMedia.play();

        recRedia.setVolume(1.0);
        recRedia.startRecord();

    }

    $scope.stopRecording = function () {
        //        window.alert("stopRecording");
        //        playMedia.stop();
        recRedia.stopRecord();
        //
        //        var tmp = $cordovaMedia.newMedia("rec.mp3");
        //        tmp.play();

    }

    $scope.startanimation = function () {
        $scope.touchNumber = $scope.touchNumber + 1;
        $('#content').removeClass('fullwidth').delay(60).queue(function (next) {
            $(this).addClass('fullwidth');
            next();
        });
    }


    $scope.touchNumber = 0;
    $scope.midBtnName = "开始";
    $scope.mytime = "00:00";

    var timeNumber = 0;
    var stoptime = false;
    var updateClock = function () {
        if (stoptime) {
            timeNumber++;
            if (timeNumber < 10) {
                $scope.mytime = "00:0" + timeNumber;
            } else if (timeNumber < 60) {
                $scope.mytime = "00:" + timeNumber;
            }
        }
    };
    setInterval(function () {
        $scope.$apply(updateClock);
    }, 1000);

    $scope.startanimation = function () {
        if (!player) {
            player = new Selected();
        }

        if ($scope.touchNumber % 3 == 0) {
            player.init();
            $scope.animationstatus = "running";
            $scope.startRecording();
            //            $scope.midBtnName = "结束";
            $("#btn_play_pause").attr("class", "ctl_button pause");
            $scope.touchNumber = $scope.touchNumber + 1;

            $scope.mytime = "00:00";
            timeNumber = 0;
            stoptime = true;
            updateClock();

        } else if ($scope.touchNumber % 3 == 1) {
            $scope.stopRecording();
            player.stop();
            //$scope.midBtnName = "预览";
            $("#btn_play_pause").attr("class", "ctl_button preview");
            //$scope.leftBtnName = "重来";
            $("#btn_restart").attr("class", "ctl_button restart");
            //$scope.rightBtnName = "分享";
            $("#btn_share").attr("class", "ctl_button share");
            $scope.touchNumber = $scope.touchNumber + 1;
            $scope.animationstatus = "paused";
            stoptime = false;
        } else if ($scope.touchNumber % 3 == 2) {

            var tmp = $cordovaMedia.newMedia("rec.mp3");
            tmp.play();
        }

        $('#content').removeClass('fullwidth').delay(60).queue(function (next) {
            $(this).addClass('fullwidth');
            next();
        });
    }

    $scope.restartanimation = function () {
        $scope.touchNumber = 1;
        //$scope.midBtnName = "结束";
        $("#btn_play_pause").attr("class", "ctl_button pause");
        if (!player) {
            player = new Selected();
        }
        player.init();
        $scope.animationstatus = "running";
        $scope.startRecording();
        $scope.mytime = "00:00";
        stoptime = true;
        timeNumber = 0;
    }


    $scope.shareanimation = function () {
        $ionicListDelegate.closeOptionButtons();
        window.socialmessage.send({
            url: "http://home.caredear.com/info/gettext/?id=88&category=8"
        });
    }

    var Selected = function () {
        this.lyricContainer = document.getElementById('lyricContainer');
        this.lyric = null;
        this.duration = 0;
        this.timer = -1;
    };
    Selected.prototype = {
        constructor: Selected, //fix the prototype chain
        init: function () {
            this.play();
        },

        play: function () {
            var that = this;
            //reset the position of the lyric container
            this.lyricContainer.style.top = '130px';
            //empty the lyric
            this.lyric = null;
            this.lyricContainer.textContent = 'loading...';
            //this.lyricStyle = Math.floor(Math.random() * 4);
            this.lyricStyle = 0;

            function updater() {
                if (!that.lyric) return;
                that.duration = that.duration + 1;

                for (var i = 0, l = that.lyric.length; i < l; i++) {
                    if (that.duration > that.lyric[i][0] - 0.50 /*preload the lyric by 0.50s*/ ) {
                        //single line display mode
                        // that.lyricContainer.textContent = that.lyric[i][1];
                        //scroll mode
                        var line = document.getElementById('line-' + i),
                            prevLine = document.getElementById('line-' + (i > 0 ? i - 1 : i));
                        prevLine.className = '';
                        //randomize the color of the current line of the lyric
                        line.className = 'current-line-0'
                        that.lyricContainer.style.top = 130 - line.offsetTop + 'px';
                    };
                };
            }

            that.getLyric("http://" + window.location.host + "/content/yan_lei_de_cuo_jue.lrc");
            this.timer = setInterval(updater, 1000);
        },

        stop: function () {
            clearInterval(this.timer);
            //            this.lyricContainer = "";
            //            this.lyric = null;
            //            this.duration = 0;
            delete player;
            player = null;

        },

        getLyric: function (url) {
            var that = this;
            //                request = new XMLHttpRequest();
            //            request.open('GET', url, true);
            //            request.responseType = 'text';
            //request['overrideMimeType'] && request.overrideMimeType("text/html;charset=gb2312");
            that.lyric = that.parseLyric(storyLyric4local);
            //display lyric to the page
            that.appendLyric(that.lyric);
            console.log(that.lyric);


            //            request.onload = function () {
            //                that.lyric = that.parseLyric(request.response);
            //                //display lyric to the page
            //                that.appendLyric(that.lyric);
            //                console.log(that.lyric);
            //            };
            //            request.onerror = request.onabort = function (e) {
            //                that.lyricContainer.textContent = '!failed to load the lyric :(';
            //            }
            //            this.lyricContainer.textContent = 'loading lyric...';
            //            request.send();
        },
        parseLyric: function (text) {
            //get each line from the text
            var lines = text.split('\n'),
                //this regex mathes the time [00.12.78]
                pattern = /\[\d{2}:\d{2}.\d{2}\]/g,
                result = [];

            // Get offset from lyrics
            var offset = this.getOffset(text);

            //exclude the description parts or empty parts of the lyric
            while (!pattern.test(lines[0])) {
                lines = lines.slice(1);
            };
            //remove the last empty item
            lines[lines.length - 1].length === 0 && lines.pop();
            //display all content on the page
            lines.forEach(function (v, i, a) {
                var time = v.match(pattern),
                    value = v.replace(pattern, '');
                time.forEach(function (v1, i1, a1) {
                    //convert the [min:sec] to secs format then store into result
                    var t = v1.slice(1, -1).split(':');
                    result.push([parseInt(t[0], 10) * 60 + parseFloat(t[1]) + parseInt(offset) / 1000, value]);
                });
            });
            //sort the result by time
            result.sort(function (a, b) {
                return a[0] - b[0];
            });
            return result;
        },
        appendLyric: function (lyric) {
            var that = this,
                lyricContainer = this.lyricContainer,
                fragment = document.createDocumentFragment();
            //clear the lyric container first
            this.lyricContainer.innerHTML = '';
            lyric.forEach(function (v, i, a) {
                var line = document.createElement('p');
                line.id = 'line-' + i;
                line.textContent = v[1];
                fragment.appendChild(line);
            });
            lyricContainer.appendChild(fragment);
        },
        getOffset: function (text) {
            //Returns offset in miliseconds.
            var offset = 0;
            try {
                // Pattern matches [offset:1000]
                var offsetPattern = /\[offset:\-?\+?\d+\]/g,
                    // Get only the first match.
                    offset_line = text.match(offsetPattern)[0],
                    // Get the second part of the offset.
                    offset_str = offset_line.split(':')[1];
                // Convert it to Int.
                offset = parseInt(offset_str);
            } catch (err) {
                //alert("offset error: "+err.message);
                offset = 0;
            }
            return offset;
        }
    }

    // Open the login modal
    $scope.showStoryDetail = function (id) {
        console.log("CY-2" + id);
        getStoryDetail(id);
        $scope.modal.show();
        //init play
    }

})

.controller('voiceControlCtrl', function ($scope, StoryService, $cordovaDevice, $cordovaToast) {
    var recRedia;
    var player = null;
    $scope.hideSpin = true;
    var playingMedia = null;
    var speak_timer = null;
    var robot_uid = "";
    //var breakPlaying = false;

    $scope.$on('$ionicView.leave', function () {
        if (playingMedia) {
            playingMedia.release();
            playingMedia = null;
        }
    });


    document.addEventListener("deviceready", function () {

        var device = $cordovaDevice.getDevice();

        var cordova = $cordovaDevice.getCordova();

        var model = $cordovaDevice.getModel();

        var platform = $cordovaDevice.getPlatform();

        var uuid = $cordovaDevice.getUUID();

        var version = $cordovaDevice.getVersion();

        console.log(device);
        console.log(model);
        console.log(platform);
        console.log(uuid);
        console.log(version);

        robot_uid = model + "-" + platform + "-" + version + "-" + uuid;
        robot_uid = robot_uid.replace(" ", "_");
        console.log(robot_uid);


    }, false);


    console.error('init the voice engine');

    navigator.myspeechApis.tryInitEngine(
        function (goodData) {
            console.error("Good:" + goodData);
        },
        function (badData) {
            console.error("Bad:" + badData);
        });
    console.error("finish the voice engine");

    function close_spinner() {
        $scope.onsearch = false;
    }

    var getChatResponse = function (text) {
        var arrary = [];

        //        if (speak_timer) {
        //            clearInterval(speak_timer);
        //            speak_timer = null;
        //        }



        StoryService.chatRobot(text, robot_uid).then(
            function (data) {
                data.data.forEach(function (b) {
                    console.log(b.res_url);
                    arrary.push(b.res_url);

                    //                    while (playingMedia) {
                    //                        console.log("CYCYCYCYC");
                    //                        setTimeout(function () {}, 1);
                    //                    }
                });
                //                breakPlaying = false;
                if (arrary.length == 1) {
                    playAudio(arrary[0], "");
                } else {

                    playAudio(arrary[0], arrary[1]);
                }

            },


            //                    var arrary = [];
            //                    data.forEach(function (b) {
            //                        var one = {};
            //                        one.id = b.id;
            //                        one.title = b.title;
            //                        one.image = "http://" + b.image
            //                        one.age = b.age
            //                        one.text = b.text
            //                        arrary.push(one);
            //               console.log(one.title + one.image + one.text + one.age)


            function (error) {
                console.log("获取故事列表出错");
            });
    }

    //getChatResponse("点一首小螺号");
    // Play audio
    //


    function playAudio(url, next) {

        close_spin();
        if (cntdown_timer) {
            clearInterval(cntdown_timer);
            cntdown_timer = null;
            cntdown_cnt = 5;
            document.getElementById("progress").innerHTML = 5;
        }
        // Play the audio file at url
        var my_media = new Media(url,
            // success callback
            function () {
                console.log("playAudio():Audio Success");
            },
            // error callback
            function (err) {
                console.log("playAudio():Audio Error: " + err);
            },
            function (status) {
                console.log(status);
                if (status == 4) {
                    playingMedia = null;
                    if (next != "") {
                        playAudio(next, "");
                    }
                }
            }

        );

        playingMedia = my_media;
        // Play audio
        my_media.play();
    }
    //    playAudio("http://i.caredear.com/static/songs/aside-1452504277-6.mp3", "http://i.caredear.com/static/songs/aside-1452504277-6.mp3");


    var cntdown_cnt = 5;
    var cntdown_timer = null;

    function setCountDown() {
        console.log("enter setCountDown");
        cntdown_cnt = cntdown_cnt - 1;
        document.getElementById("progress").innerHTML = cntdown_cnt;

        if (cntdown_cnt == 0) {
            $cordovaToast.show("未检测到你在说话", 'short', 'center');
            clearInterval(cntdown_timer);
            cntdown_timer = null;
            cntdown_cnt = 5;
            close_spin();
            document.getElementById("progress").innerHTML = 5;
        }
    }

    var open_spin = function () {
        $scope.hideSpin = false;
        document.getElementById("spin").style.display = '';
        document.getElementById("mic").style.display = 'none';
    }


    var close_spin = function () {
        $scope.hideSpin = false;
        document.getElementById("spin").style.display = 'none';
        document.getElementById("mic").style.display = '';
    }

    $scope.startRecording = function () {

        if (playingMedia) {
            playingMedia.release();
            playingMedia = null;
            //breakPlaying = true;
        }

        if (cntdown_timer) {
            clearInterval(cntdown_timer);
            cntdown_timer = null;
            cntdown_cnt = 5;
            document.getElementById("progress").innerHTML = 5;
        }

        console.log("startRecording");
        open_spin();

        cntdown_timer = setInterval(setCountDown, 1000);

        //speak_timer = setInterval(close_spin, 5000);

        navigator.myspeechApis.tryListening(

            function (okData) {
                console.log("CY Get: " + okData);
                getChatResponse(okData);
                //                navigator.myspeechApis.trySpeak(
                //                    function (okData) {
                //                        console.log("speak is good");
                //                    },
                //                    function (failData) {
                //                        console.lo("speak is bad");
                //                    }, [0, 50, okData]);
            },

            function (failData) {
                close_spin();
                console.log(failData);
            }, []);
    }
})

.controller('myProfileCtrl', function ($scope) {

})