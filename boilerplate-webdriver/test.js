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
			deviceName: 'Device',
			automationName: 'UiAutomator2',
			app: 'path_to_apk',
			autoGrantPermissions: true,
			appWaitActivity: '*'
		},
	}

	before(async () => {
		driver = await wdio.remote(options)
	})

	after(async () => {
		await driver.deleteSession()
	})


	it('First Test', async () => {
	})

	it('Second Test', async () => {
	})

})
