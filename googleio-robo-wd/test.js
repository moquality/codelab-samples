describe("Test", function() {
  this.timeout(0);
  const wd = require("wd");
  const driver = wd.promiseChainRemote({
    host: "localhost",
    port: 4723
  });

  before(async () => {
    await driver.init({
      platformName: "android",
      app: "https://mq.link/codelab/google_io_19.apk",
      deviceName: "Device",
      automationName: "UiAutomator2",
      appWaitActivity: "*",
      autoLaunch: false
    });
  });

  after(async () => {
    await driver.quit();
  });

  it('Robot Test', async () => {
		for (ep = 0; ep < 10; ep++) {
      await driver.launchApp();
      await driver
      .elementByAndroidUIAutomator(
        'new UiSelector().resourceId("com.google.samples.apps.iosched:id/get_started")'
      )
      .then(target => target.click());

			for (i = 0; i < 10; i++) {
				let state = await driver.execute('mq:state')
				let { action } = await driver.execute('mq:sample', { state, strategy: 'explore' })
				let { observation, logs, done, reward } = await driver.execute('mq:step', { action })
				console.log(reward, done)
				if (done) {
					break
				}
			}
		}
	})
});
