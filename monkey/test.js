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
			app: 'https://storage.googleapis.com/mq.link/codelab/calc.apk',
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

	it('Monkey Test', async () => {
		for (i = 0; i < 50; i++) {
			await driver
				.elementsByAndroidUIAutomator('new UiSelector().clickable(true)')
				.then((targets) => targets[Math.floor(Math.random() * targets.length)].click())
		}
	})
})
