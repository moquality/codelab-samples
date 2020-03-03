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
      app: "path_to_apk",
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
			for (i = 0; i < 10; i++) {
				let state = await driver.execute('mq:state')
				let { action } = await driver.execute('mq:sample', { state, strategy: 'explore' })
				let { observation, logs, done, reward } = await driver.execute('mq:step', { action })
				console.log(`Reward: ${reward}, Done: ${done}`)
				if (done) {
					break
				}
			}
		}
	})
});
