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
			deviceName: 'Device',
			automationName: 'UiAutomator2',
			app: 'path_to_apk',
			autoGrantPermissions: true,
			appWaitActivity: '*'
		})
	})

	after(async () => {
		return await driver.quit()
	})

	it('First Test', async () => {
	})

	it('Second Test', async () => {
	})
})
