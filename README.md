# IndexBar
An IndexBar for HTML

# Demo

[See on PC](https://wldragon.github.io/indexbar/)

![See on Mobile](https://wldragon.github.io/indexbar/qrcode.png)

# QuickStart
- please go to see the demo, it's easy for you!

# Options
<table>
    <tr>
      <td>container</td>
      <td>{string} IndexBar容器的选择器描述符，必填</td>
    </tr>
    <tr>
      <td>callback</td>
      <td>{function} 切换序号时回调function(key){}</td>
    </tr>
    <tr>
      <td>keys</td>
      <td>{string|array} 显示的索引字符，默认'ABCDEFGHIJKLMNOPQRSTUVWXYZ'</td>
    </tr>
    <tr>
      <td>maxScale</td>
      <td>{number} 目标字符的最大缩放比例，默认为4</td>
    </tr>
    <tr>
      <td>offset</td>
      <td>{number} 字母偏移系数，默认为8</td>
    </tr>
    <tr>
      <td>direction</td>
      <td>{string} left|right|top|down 字母突出方向，默认left(其他方向尚未实现)</td>
    </tr>
    <tr>
      <td>color</td>
      <td>{string} 字体颜色，默认#000</td>
    </tr>
    <tr>
      <td>activeColor</td>
      <td>{string} 选中的序号文本的颜色，默认#39f</td>
    </tr>
</table>