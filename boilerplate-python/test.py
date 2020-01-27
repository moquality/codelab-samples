import unittest
from appium import webdriver


class Testing(unittest.TestCase):

    def setUp(self):
        # Called before each test
        self.driver = webdriver.Remote(
            command_executor='http://localhost:4723/wd/hub', 
            desired_capabilities={
                'platformName': 'Android',
                # 'platformVersion': '8.1',
                'automationName': 'uiautomator2',
                'deviceName': 'Android Emulator',
                'appWaitActivity': '*',
                'app': 'path_to_apk'
                # TODO: Replace above with local APK file path or 
                # a link on the internet e.g., https://mq.link/codelab/google_io_19.apk
            })

    def tearDown(self):
        # Called after each test
        self.driver.quit()

    def test_launch(self):
        # Test to launch app.
        self.driver.launch_app()
        # TODO: Add further steps here


if __name__ == '__main__':
    unittest.main()
