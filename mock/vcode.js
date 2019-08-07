// 生成验证码
(req, res) => {
  var svgCaptcha = require('svg-captcha')
  var captcha = svgCaptcha.create({
  	color: '#0080ff',
  	background: '#f2f6fc',
  	height: 40,
  	width: 126,
  })
  res.type('svg')
  res.send(captcha.data)
}