describe('Test', function() {
	this.timeout(0)
	const wd = require('wd')
	const driver = wd.promiseChainRemote({
		host: 'localhost',
		port: 4723,
	})

	before(async () => {
		await driver.init({
			platformName: 'android',
			app: 'https://storage.googleapis.com/mq.link/codelab/google_io_19.apk',
			deviceName: 'Device',
			automationName: 'UiAutomator2',
			appWaitActivity: '*',
		})
	})

	after(async () => {
		await driver.quit()
	})

	it('Get Started', async () => {
		await driver.elementByAndroidUIAutomator('new UiSelector().resourceId("com.google.samples.apps.iosched:id/get_started")').then(target => target.click())
	})

	it('Swipe on Home Screen', async () => {
		let size = await driver.getWindowSize()
		let start = { x: 0.44150632331174317 * size.width, y: 0.9111467171258736 * size.height }
		let end = { x: 0.4358083176137376 * size.width, y: 0.20316950914866563 * size.height }

		await new wd.TouchAction(driver)
			.press(start)
			.wait(0)
			.moveTo(end)
			.release()
			.perform()
	})

	it('Check Schedule', async () => {
		await driver.elementByAndroidUIAutomator('new UiSelector().className("android.widget.ImageButton")').then(target => target.click())
		await driver.elementByAndroidUIAutomator('new UiSelector().resourceId("com.google.samples.apps.iosched:id/design_menu_item_text").text("Schedule")').then(target => target.click())
	})
})
