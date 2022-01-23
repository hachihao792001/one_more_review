import static com.kms.katalon.core.checkpoint.CheckpointFactory.findCheckpoint
import static com.kms.katalon.core.testcase.TestCaseFactory.findTestCase
import static com.kms.katalon.core.testdata.TestDataFactory.findTestData
import static com.kms.katalon.core.testobject.ObjectRepository.findTestObject
import static com.kms.katalon.core.testobject.ObjectRepository.findWindowsObject
import com.kms.katalon.core.checkpoint.Checkpoint as Checkpoint
import com.kms.katalon.core.cucumber.keyword.CucumberBuiltinKeywords as CucumberKW
import com.kms.katalon.core.mobile.keyword.MobileBuiltInKeywords as Mobile
import com.kms.katalon.core.model.FailureHandling as FailureHandling
import com.kms.katalon.core.testcase.TestCase as TestCase
import com.kms.katalon.core.testdata.TestData as TestData
import com.kms.katalon.core.testng.keyword.TestNGBuiltinKeywords as TestNGKW
import com.kms.katalon.core.testobject.TestObject as TestObject
import com.kms.katalon.core.webservice.keyword.WSBuiltInKeywords as WS
import com.kms.katalon.core.webui.keyword.WebUiBuiltInKeywords as WebUI
import com.kms.katalon.core.windows.keyword.WindowsBuiltinKeywords as Windows
import internal.GlobalVariable as GlobalVariable
import org.openqa.selenium.By as By
import org.openqa.selenium.Keys as Keys
import com.kms.katalon.core.webui.common.WebUiCommonHelper as WebUiCommonHelper
import org.openqa.selenium.WebElement as WebElement
import org.openqa.selenium.WebDriver as WebDriver
import org.openqa.selenium.interactions.Actions as Actions
import com.kms.katalon.core.webui.driver.DriverFactory as DriverFactory

WebUI.openBrowser('')

WebUI.navigateToUrl('https://onemorereview.netlify.app')

WebUI.setText(findTestObject('Object Repository/Page_OMR - One More Review/input_Email_email'), 'admin@gmail.com')

WebUI.setEncryptedText(findTestObject('Object Repository/Page_OMR - One More Review/input_Mt khu_password'), 'aeHFOx8jV/A=')

WebUI.sendKeys(findTestObject('Object Repository/Page_OMR - One More Review/input_Mt khu_password'), Keys.chord(Keys.ENTER))

WebUI.click(findTestObject('Object Repository/Page_OMR - One More Review/img_Conan 4 Th Phm Trong i Mt_film-image ng_0542c6'))

WebUI.scrollToElement(findTestObject('Object Repository/Page_OMR - One More Review/span_Din vin'), 2)

WebUI.switchToFrame(findTestObject('Object Repository/Page_OMR - One More Review/iframe'), 2)

WebUI.click(findTestObject('Object Repository/Page_OMR - One More Review/div_Tap to unmute_ytp-cued-thumbnail-overlay-image'))

WebUI.doubleClick(findTestObject('Object Repository/Page_OMR - One More Review/video-stream'))

WebUI.doubleClick(findTestObject('Object Repository/Page_OMR - One More Review/video-stream'))

WebUI.click(findTestObject('Object Repository/Page_OMR - One More Review/fullscreen-button'))

WebUI.delay(1)

WebUI.doubleClick(findTestObject('Object Repository/Page_OMR - One More Review/video-stream'))

WebUI.switchToDefaultContent()

WebUI.verifyElementPresent(findTestObject('Page_OMR - One More Review/span_Din vin'), 1)

WebUI.closeBrowser()

