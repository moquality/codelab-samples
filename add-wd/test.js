var should = require('chai').should()
var expect = require('chai').expect

describe('Test', function() {
	this.timeout(0)
	const wd = require('wd')
	const driver = wd.promiseChainRemote({
		host: 'localhost',
		port: 4723,
	})

	before(async () => {
		return driver.init({
			platformName: 'android',
			app: 'https://mq.link/codelab/calc.apk',
			deviceName: 'Device',
			automationName: 'UiAutomator2',
			autoLaunch: false,
		})
	})

	after(async () => {
		return await driver.quit()
	})

	it('Launch App', async () => {
		return await driver.launchApp()
	})

	it('Addition', async () => {
		await driver.element('id', 'com.shauvik.calc:id/btn2').then((target) => target.click())
		await driver.element('id', 'com.shauvik.calc:id/add').then((target) => target.click())
		await driver.element('id', 'com.shauvik.calc:id/btn7').then((target) => target.click())
		await driver.element('id', 'com.shauvik.calc:id/equals').then((target) => target.click())
		let answer = await driver.element('id', 'com.shauvik.calc:id/textView').then((target) => target.text())
		answer.should.equal('9')
	})

	it('Incorrect expression', async () => {
		await driver.element('id', 'com.shauvik.calc:id/btn2').then((target) => target.click())
		await driver.element('id', 'com.shauvik.calc:id/add').then((target) => target.click())
		await driver.element('id', 'com.shauvik.calc:id/equals').then((target) => target.click())
		await driver
			.element('id', 'com.shauvik.calc:id/textView')
			.catch((err) => expect(err.message).to.have.string('NoSuchElement'))
	})
})
