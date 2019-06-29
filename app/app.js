const Sea = require('./packages/bigsea.js')
App({
  data: {
    navBar: {
      height: '44',
      marginTop: '20',
    },
    search: {
      location: null,
      keyword: '',
    },
    mark: {
      arr: ['#F82727', '#E88536', '#F9EE33', '#32B16C', '#448ACA', '#8957A1'],
      now: 0,
    },
  },
  onLaunch() {
    wx.setStorageSync('token', '')
    this.initNavBar()
    // 大海 不圆 崔婷 鱼雷
    // this.变身('不圆')
  },
  onShow() {},
  onHide() {},
  initNavBar() {
    const systemInfo = wx.getSystemInfoSync()
    const ios = /ios/i.test(systemInfo.system)
    this.data.navBar = {
      marginTop: systemInfo.statusBarHeight,
      height: ios ? 44 : 48,
    }
  },
  initToken() {
    return new Promise(success => {
      wx.login({
        success(res) {
          if (res.code) {
            // 发起网络请求
            Sea.Ajax({
              url: '/v1/login',
              data: {
                js_code: res.code,
                openid: false,
              },
            }).then(res => {
              if (res.ok) {
                wx.setStorageSync('token', res.openid)
                success()
              } else {
                console.log('登录失败!')
              }
            })
          } else {
            console.log('登录失败!' + res.errMsg)
          }
        },
      })
    })
  },
  变身(name) {
    const dict = {
      大海: 'oHUM44xF1kqrQbZ-EiFoFfWrpw2Y',
      不圆: 'oHUM448TtvDSSoiXB1WRlgthPWoU',
      崔婷: 'oHUM449BmVwkMCjBfCur9G4zv_tM',
      鱼雷: 'oHUM441Lx1-pPIlSyUGMvnr2Hdq8',
    }
    wx.setStorageSync('token', dict[name])
  },
})
