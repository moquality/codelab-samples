const fs = require('fs')
const path = require('path')
const should = require('chai').should()
const expect = require('chai').expect
const delay = require('delay')

describe('Test', function() {
	this.timeout(0)
	const wd = require('wd')
	const driver = wd.promiseChainRemote({
		host: 'localhost',
		port: 4723,
	})

	before(async () => {
		await driver.init({
			platformName: 'ios',
			platformVersion: '13.2',
			deviceName: "iPhone 11 Pro Max",
			automationName: 'XCUITest',
			app: 'https://storage.googleapis.com/mq.link/codelab/uicatalog_sim.ipa'
		})
		await driver.setImplicitWaitTimeout(15000);
	})

	after(async () => {
		await driver.quit()
	})

	it('Find single element using class chain', async () => {
		// Find static text Action Sheets and click
		await driver.element('-ios class chain', "**/XCUIElementTypeStaticText[`label == \"Action Sheets\"`][1]").then(target => target.click())
		await driver.element('-ios class chain', "**/XCUIElementTypeButton[`label == \"UICatalog\"`][1]").then(target => target.click())

		// Find the last element whose name starts with A
		await driver.element('-ios class chain', "**/XCUIElementTypeStaticText[`name BEGINSWITH \"A\"`][-1]").then(target => target.click())
		await driver.element('-ios class chain', "**/XCUIElementTypeButton[`label == \"UICatalog\"`][1]").then(target => target.click())
	})

	it('Find multiple elements using class chain', async () => {
		// Find all elements whose name start with S and click on one them
		await driver.elements('-ios class chain', "**/XCUIElementTypeStaticText[`name BEGINSWITH \"S\"`]").then(targets => targets[Math.floor(Math.random() * targets.length)].click())
		await driver.element('-ios class chain', "**/XCUIElementTypeButton[`label == \"UICatalog\"`][1]").then(target => target.click())
	})

	it('Find single element using predicate', async () => {
		// Find Action Sheets and click on it
		await driver.element('-ios predicate string', "type == \"XCUIElementTypeStaticText\" AND (name == \"Action Sheets\" OR label == \"Action Sheets\")").then(target => target.click())
		await driver.element('-ios class chain', "**/XCUIElementTypeButton[`label == \"UICatalog\"`][1]").then(target => target.click())
	})

	it('Find element using accessiblity id', async () => {
		// Find Action Sheets and click on it
		await driver.elementByAccessibilityId("Action Sheets").then(target => target.click())
		await driver.elementByAccessibilityId("UICatalog").then(target => target.click())
	})

	it('Click on a random button', async () => {
		// Find all buttons and click on one them
		await driver.elements('-ios class chain', "**/XCUIElementTypeButton").then(targets => targets[Math.floor(Math.random() * targets.length)].click())
	})
})
