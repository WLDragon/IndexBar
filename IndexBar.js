/*!
 * IndexBar.js
 * Copyright (c) 2016 WLDragon(cwloog@qq.com)
 * Released under the MIT License.
 */
!function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
        typeof define === 'function' && define.amd ? define(factory) :
            (global.IndexBar = factory());
} (this, function () {
    //创建样式
    var styleDom = document.createElement('style');
    var ulStyle = document.createTextNode('.index-bar-container { list-style-type: none; height: 100%; width: 100%; padding: 0; margin: 0; -webkit-user-select: none; -moz-user-select: none; -ms-user-select: none; }');
    var liStyle = document.createTextNode('.index-bar-container > li { text-align: center; pointer-events: none; }');
    styleDom.appendChild(ulStyle);
    styleDom.appendChild(liStyle);
    document.head.appendChild(styleDom);

    //默认配置
    var defaultConfig = {
        
    }

    /**
     * config.id {string} ul标签的ID
     * config.maxScale {number} 目标字符的最大缩放比例，默认为4
     * config.offset {number} 字母偏移系数，默认为8
     * config.direction {string} left|right|top|down 字母突出方向，默认left
     * config.color {string} 字体颜色，默认#000
     * config.targetColor {string} 目标字符的字体颜色，默认#39f
     */
    function IndexBar(config) {
        var self = this;
        var ul = document.getElementById(config.id);
        ul.className = ul.className == '' ? 'index-bar-container' : (ul.className + ' index-bar-container');
        var ulHeight = ul.clientHeight;
        var keys = '#ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('');
        var length = self.length = keys.length;
        var liHeight = self.liHeight = ~~(ulHeight / length);
        var fontSize = ~~(liHeight * .6);

        var liHtml = '';
        for (var i = 0; i < length; i++) {
            liHtml += '<li style="line-height:' + liHeight + 'px;font-size:' + fontSize + 'px">' + keys[i] + '</li>'
        }
        ul.innerHTML = liHtml;
        self.children = ul.children;
        
        //移动浏览器的Touch事件
        ul.addEventListener('touchmove', function (e) {
            self.play(e.touches[0].pageY);
        });
        window.addEventListener('touchend', function (e) {
            self.stop();
        });
        //PC浏览器的Mouse事件
        var onMouseMove = self.onMouseMove.bind(self);
        ul.addEventListener('mousedown', function (e) {
            window.addEventListener('mousemove', onMouseMove);
            self.play(e.pageY);
        });
        window.addEventListener('mouseup', function (e) {
            window.removeEventListener('mousemove', onMouseMove);
            self.stop();
        });
    }

    var prototype = IndexBar.prototype;
    prototype.play = function(y) {
        var liHeight = this.liHeight;
        var index = ~~(y / liHeight);
        for (var i = this.length - 1; i >= 0; i--) {
            var li = this.children[i];
            var style = li.style;
            var diff = index - i;
            if (diff > -4 && diff < 4) {
                li._isPlayed = true;
                var distance = Math.abs(((i + .5) * liHeight) - y);
                var scale = 4 - 3 * distance / (3.5 * liHeight);
                style.color = diff == 0 ? '#39f' : '#000';
                style.transform = 'scale(' + scale + ',' + scale + ') translateX(' + (-8 * scale) + 'px)';
            } else if (li._isPlayed) {
                li._isPlayed = false;
                style.color = '#000';
                style.transform = 'scale(1,1) translateX(0px)';
            }
        }
    }

    prototype.stop = function() {
        for (var i = this.length - 1; i >= 0; i--) {
            var li = this.children[i];
            if (li._isPlayed) {
                li._isPlayed = false;
                var style = li.style;
                style.transform = 'scale(1,1) translateX(0px)';
                style.color = '#000';
            }
        }
    }

    prototype.onMouseMove = function(e) {
        this.play(e.pageY);
    }

    return IndexBar;
});