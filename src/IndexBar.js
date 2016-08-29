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
    var styleNode = '.index-bar-container { list-style-type: none; height: 100%; width: 100%; padding: 0; margin: 0; -webkit-user-select: none; -moz-user-select: none; -ms-user-select: none; }'
            + '.index-bar-container > li { text-align: center; pointer-events: none; }';
    styleDom.appendChild(document.createTextNode(styleNode));
    document.head.appendChild(styleDom);

    //默认配置
    var defaultConfig = {
        keys: 'ABCDEFGHIJKLMNOPQRSTUVWXYZ',
        activeColor: '#39f',
        direction: 'left', //TODO
        color: '#000',
        maxScale: 4,
        offset: 8,
    }

    /**
     * config.container {string} 目标容器的选择器描述符，必填
     * config.callback {function} 切换序号时回调function(key){}
     * config.keys {string|array} 显示的索引字符，默认ABCDEFGHIJKLMNOPQRSTUVWXYZ
     * config.maxScale {number} 目标字符的最大缩放比例，默认为4
     * config.offset {number} 字母偏移系数，默认为8
     * config.direction {string} left|right|top|down 字母突出方向，默认left
     * config.color {string} 字体颜色，默认#000
     * config.activeColor {string} 目标字符的字体颜色，默认#39f
     */
    function IndexBar(config) {
        var self = this;
        self.callback = config.callback;
        var container = document.querySelector(config.container);
        //设置配置
        var cfg = {};
        for(var k in defaultConfig) {
            cfg[k] = config[k] || defaultConfig[k];
        }
        self.config = cfg;

        //添加Dom到指定容器
        var barHeight = container.clientHeight;
        var ul = document.createElement('ul');
        ul.className = 'index-bar-container';

        var keys = self.keys = (typeof cfg.keys === 'string') ? cfg.keys.split('') : cfg.keys;
        var length = self.length = keys.length;
        var liHeight = self.liHeight = ~~(barHeight / length);
        var fontSize = ~~(liHeight * .6);

        var liHtml = '';
        for (var i = 0; i < length; i++) {
            liHtml += '<li style="line-height:' + liHeight + 'px;font-size:' + fontSize + 'px">' + keys[i] + '</li>'
        }
        ul.innerHTML = liHtml;
        self.children = ul.children;
        container.appendChild(ul);
        
        //移动浏览器的Touch事件
        ul.addEventListener('touchstart', function (e) {
            self.play(e.touches[0].pageY);
        });
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
        var self = this;
        var liHeight = self.liHeight;
        var index = ~~(y / liHeight);

        var children = self.children;

        var config = self.config;
        var color = config.color;
        var offset = config.offset;
        var maxScale = config.maxScale;
        var activeColor = config.activeColor;
        for (var i = self.length - 1; i >= 0; i--) {
            var li = children[i];
            var style = li.style;
            var diff = index - i;
            if (diff > -4 && diff < 4) {
                li._isPlayed = true;
                var distance = Math.abs(((i + .5) * liHeight) - y);
                var scale = maxScale - 3 * distance / (3.5 * liHeight);
                style.transform = 'scale(' + scale + ',' + scale + ') translateX(' + (-offset * scale) + 'px)';
                if(diff === 0) {
                    style.color = activeColor;
                    if(self.index != index && self.callback) {
                        self.callback(self.keys[index]);
                        self.index = index;
                    }
                }else {
                    style.color = color;
                }
            } else if (li._isPlayed) {
                li._isPlayed = false;
                style.color = color;
                style.transform = 'scale(1,1) translateX(0px)';
            }
        }
    }

    prototype.stop = function() {
        var color = this.config.color;
        var children = this.children;
        for (var i = this.length - 1; i >= 0; i--) {
            var li = children[i];
            if (li._isPlayed) {
                li._isPlayed = false;
                li.style.transform = 'scale(1,1) translateX(0px)';
            }
        }
    }

    prototype.onMouseMove = function(e) {
        this.play(e.pageY);
    }

    return IndexBar;
});