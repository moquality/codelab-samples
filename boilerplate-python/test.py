import unittest
from appium import webdriver


class Testing(unittest.TestCase):
    desired_caps = {}
    desired_caps['platformName'] = 'Android'
    desired_caps['platformVersion'] = '8.1'
    desired_caps['automationName'] = 'uiautomator2'
    desired_caps['deviceName'] = 'Android Emulator'
    desired_caps['app'] = PATH('path_to_apk')

    self.driver = webdriver.Remote('http://localhost:4723/wd/hub', desired_caps)

    def test_launch(self):
        self.driver.launch_app()

    def test_quit(self):
        self.driver.quit()


if __name__ == '__main__':
    unittest.main()
