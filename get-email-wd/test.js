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

	it('Get Email from @testing.moquality.com', async () => {
		const email = await driver.execute('mq:getEmail', 'pushkar@testing-test.moquality.com')
		console.log(email)
	})
})
