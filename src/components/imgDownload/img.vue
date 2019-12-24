<template>
    <div>
        <!--创建一个cavas  用来存放图片-->
        <canvas style="display:none"  id="cavasimg" width="607" height="367"  ></canvas>

        <!--        声明一个按钮  用来触发下载图片到本地-->
        <input type="button" id="btnsavaImg" value="保存图片到本地" @click="Download()"/>
    </div>

</template>
<script>
export default {
  props: {
    imgLink: {
      type: String,
      default: 'http://localhost:10080/static/7.jpg'
    },
    imgName: {
      type: String,
      default: 'venn'
    }
  },
  methods: {
    Download () {
      var type = 'jpg'
      var d = document.getElementById('cavasimg')
      var imgdata = d.toDataURL(type)
      var fixtype = (type) => {
        type = type.toLocaleLowerCase().replace(/jpg/i, 'jpeg')
        var r = type.match(/png|jpeg|bmp|gif/)[0]
        return 'image/' + r
      }
      imgdata = imgdata.replace(fixtype(type), 'image/octet-stream')
      var savaFile = (data, filename) => {
        var saveLink = document.createElementNS('http://www.w3.org/1999/xhtml', 'a')
        saveLink.href = data
        saveLink.download = filename
        var event = document.createEvent('MouseEvents')
        event.initMouseEvent('click', true, false, window, 0, 0, 0, 0, 0, false, false, false, false, 0, null)
        saveLink.dispatchEvent(event)
      }
      savaFile(imgdata, this.imgName)
    }
  },
  mounted () {
    var cvs = document.getElementById('cavasimg')
    var imgObj = new Image()
    imgObj.src = this.imgLink
    imgObj.setAttribute('crossOrigin', 'Anonymous')
    imgObj.onload = function () {
      var ctx = cvs.getContext('2d')
      ctx.drawImage(this, 0, 0)
    }
  }
}
</script>
