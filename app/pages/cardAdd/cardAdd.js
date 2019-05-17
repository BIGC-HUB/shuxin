const app = getApp()
const Sea = require('../../ku/bigsea.js')
Page({
	data: {
		mark: app.data.mark,
		content: '',
		location: null,
	},
	onLoad() {
		// 获取周边位置
		wx.getLocation({
			type: 'gcj02',
			success: res => {
				const lat = res.latitude
				const lng = res.longitude
				const meter = 500
				Sea.Ajax({
					url: 'https://apis.map.qq.com/ws/place/v1/search',
					data: {
						boundary: `nearby(${lat},${lng},${meter})`,
						key: 'IHRBZ-RVWWQ-FHC5D-GGHIX-WPIGS-MABL6',
					},
				}).then(res => {
					Sea.cardLocation = res.data
					const location = res.data[0]
					this.setData({
						location: location,
					})
				})
			},
		})
	},
	onShow() {
		if (Sea.cardLocationNow !== undefined) {
			this.setData({
				location: Sea.cardLocation[Sea.cardLocationNow],
			})
		}
	},
	bindColor(event) {
		const i = event.target.dataset.i
		const mark = app.data.mark
		mark.now = i
		this.setData({
			mark: mark,
		})
	},
	bindLocation() {
		Sea.path('/pages/cardLocation/cardLocation')
	},
	bindInput(event) {
		const v = event.detail.value
		this.data.content = v
	},
	bindPost() {
		const { location, mark, content } = this.data
		const { lat, lng } = location.location
		if (content) {
			Sea.loading('正在发布...')
			Sea.Ajax({
				url: '/v1/card.add',
				data: {
					content: content,
					location: `${lat},${lng}`,
					mark_color: mark.now,
					time_stamp: Date.now(),
					location_text: location.title,
				},
			}).then(res => {
				Sea.loading()
				if (res && res.ok) {
					Sea.tip('发布成功')
					app.data.search.location = location.location
					app.data.search.scale = 18
					Sea.back()
				} else {
					Sea.tip('发布失败')
				}
			})
		} else {
			Sea.tip('说点什么吧...')
		}
	},
})