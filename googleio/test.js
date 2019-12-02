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
			app: 'https://storage.googleapis.com/mq.link/codelab/google_io_19.apk',
			deviceName: 'Device',
			automationName: 'UiAutomator2',
			autoLaunch: false,
			appWaitActivity: '*',
		})
	})

	after(async () => {
		await driver.closeApp()
		return await driver.quit()
	})

	it('Launch App', async () => {
		await driver.launchApp()
		let target = await driver.elementByAndroidUIAutomator(
			'new UiSelector().resourceId("com.google.samples.apps.iosched:id/get_started")',
		)
		await target.click()
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
		let target = await driver.elementByAndroidUIAutomator('new UiSelector().className("android.widget.ImageButton")')
		await target.click()

		target = await driver.elementByAndroidUIAutomator(
			'new UiSelector().resourceId("com.google.samples.apps.iosched:id/design_menu_item_text").text("Schedule")',
		)
		await target.click()

		target = await driver.elementByAndroidUIAutomator('new UiSelector().resourceId("android:id/button1")')
		await target.click()

		target = await driver.elementByAndroidUIAutomator('new UiSelector().resourceId("android:id/title").text("May 8")')
		await target.click()

		target = await driver.elementByAndroidUIAutomator('new UiSelector().resourceId("android:id/title").text("May 9")')
		await target.click()

		target = await driver.elementByAndroidUIAutomator('new UiSelector().resourceId("android:id/title").text("May 7")')
		await target.click()

		target = await driver.elementByAndroidUIAutomator(
			'new UiSelector().resourceId("com.google.samples.apps.iosched:id/title").text("Google Keynote")',
		)
		await target.click()

		await driver.back()

		target = await driver.elementByAndroidUIAutomator('new UiSelector().className("android.widget.ImageButton")')
		await target.click()

		target = await driver.elementByAndroidUIAutomator(
			'new UiSelector().resourceId("com.google.samples.apps.iosched:id/design_menu_item_text").text("Home")',
		)
		await target.click()
	})
})
