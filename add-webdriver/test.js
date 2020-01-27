const should = require('chai').should()
const expect = require('chai').expect
const wdio = require('webdriverio')

describe('Test', function() {
	this.timeout(0)
	var driver = null
	const options = {
		hostname: 'localhost',
		port: 4723,
		logLevel: 'error',
		capabilities: {
			platformName: 'android',
			app: 'https://mq.link/codelab/calc.apk',
			deviceName: 'Device',
			automationName: 'UiAutomator2',
			autoLaunch: false,
		},
	}

	before(async () => {
		driver = await wdio.remote(options)
	})

	after(async () => {
		await driver.deleteSession()
	})

	it('Launch App', async () => {
		await driver.launchApp()
	})

	it('Addition', async () => {
		await driver.$('android=new UiSelector().resourceId("com.shauvik.calc:id/btn1")').then((target) => target.click())
		await driver.$('android=new UiSelector().resourceId("com.shauvik.calc:id/add")').then((target) => target.click())
		await driver.$('android=new UiSelector().resourceId("com.shauvik.calc:id/btn3")').then((target) => target.click())
		await driver.$('android=new UiSelector().resourceId("com.shauvik.calc:id/equals")').then((target) => target.click())
		let answer = await driver
			.$('android=new UiSelector().resourceId("com.shauvik.calc:id/textView")')
			.then((target) => target.getText())
		answer.should.equal('4')
	})

	it('Incorrect expression', async () => {
		await driver.$('android=new UiSelector().resourceId("com.shauvik.calc:id/btn2")').then((target) => target.click())
		await driver.$('android=new UiSelector().resourceId("com.shauvik.calc:id/add")').then((target) => target.click())
		await driver.$('android=new UiSelector().resourceId("com.shauvik.calc:id/equals")').then((target) => target.click())
		await driver
			.$('android=new UiSelector().resourceId("com.shauvik.calc:id/textView")')
			.catch((err) => expect(err.message).to.have.string('NoSuchElement'))
	})
})
