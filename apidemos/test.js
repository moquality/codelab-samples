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
			app: 'https://storage.googleapis.com/mq.link/codelab/ApiDemos-debug.apk',
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

	it('Click through Menu', async () => {
		await driver
			.elementByAndroidUIAutomator('new UiSelector().resourceId("android:id/text1").text("App")')
			.then((target) => target.click())
		await driver
			.elementByAndroidUIAutomator('new UiSelector().resourceId("android:id/text1").text("Action Bar")')
			.then((target) => target.click())
		await driver.back()
		await driver.back()
		await driver
			.elementByAndroidUIAutomator('new UiSelector().resourceId("android:id/text1").text("Content")')
			.then((target) => target.click())
		await driver
			.elementByAndroidUIAutomator('new UiSelector().resourceId("android:id/text1").text("Assets")')
			.then((target) => target.click())
		await driver.back()
		await driver.back()
		await driver
			.elementByAndroidUIAutomator('new UiSelector().resourceId("android:id/text1").text("Views")')
			.then((target) => target.click())
		await driver
			.elementByAndroidUIAutomator('new UiSelector().resourceId("android:id/text1").text("Buttons")')
			.then((target) => target.click())
		await driver.back()
		await driver.back()
	})
})
