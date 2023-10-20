import { test, expect } from '@playwright/test';
import * as OTPAuth from "otpauth";
import assert from 'assert';
const dotenv = require("dotenv");
//env config
dotenv.config();

// Create a new TOTP object.
let totp = new OTPAuth.TOTP({
  issuer: "SeerPortal",
  secret: "MHXILU6HYBGAP2LTJBMRJUJLECYURDWB", // or 'OTPAuth.Secret.fromBase32("MHXILU6HYBGAP2LTJBMRJUJLECYURDWB")'
});
//otpauth://totp/SeerPortal?secret=MHXILU6HYBGAP2LTJBMRJUJLECYURDWB&issuer=SeerPortal


// declare all characters
const characters ='ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

function generateString(length) {
    let result = ' ';
    const charactersLength = characters.length;
    for ( let i = 0; i < length; i++ ) {
        result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }

    return result;
}

const phoneNumber = generateRandomPhoneNumber();

 
  function generateRandomPhoneNumber() {
    let phoneNumber = '1'; // The leading '1' for the country code
    for (let i = 0; i < 9; i++) {
      phoneNumber += Math.floor(Math.random() * 10);
    }
    return phoneNumber;
  }




// test.describe('Login with Seerporatl',() => {
//     //before hook
//     test.beforeEach(async ({ page }) =>{
//   await page.goto(process.env.SEERPORTAL230);
// })
// });

test('Login to Seerportal', async ({ page }) => {
  await page.goto(process.env.SEERPORTAL230);
  await page.getByPlaceholder('Email').click();
  await page.getByPlaceholder('Email').fill(process.env.USER);
  await page.getByPlaceholder('Email').press('Enter');
  await page.getByPlaceholder('Password').fill(process.env.PASSWORD);
  await page.getByPlaceholder('Password').press('Enter');
  await page.waitForTimeout(1000)
  
  let token = totp.generate();
  await page.getByPlaceholder('Passcode').fill(token);

  await page.getByRole('button', { name: 'Submit' }).click();
  await page.waitForTimeout(1000)
  await page.click('//span[normalize-space()="Continue as DataSeers."]');
  await page.waitForTimeout(1000)
  
  

  await page.click('//span[contains(text(),"Rules & MDM")]');
  await page.waitForTimeout(1000)
  await page.click('//span[contains(text(),"Processor")]');
  await page.waitForTimeout(1000)
  await page.click('//a[@title="Config"]');
  const proConfigTitle = await page.$eval("//span[@title='Config']", (element) => element.textContent)
  await assert.equal(proConfigTitle,'Config','Processor Config Title Matched')
  await page.waitForTimeout(1000)
  await page.click('//button[@title="Add Processor"]');
  await page.waitForTimeout(1000)
//   const addProcessorPage = await page.$eval("//span[normalize-space()='Processor Name']", (element) => element.textContent)
//   await assert.equal(addProcessorPage,'Processor Name','Add Processor Page')
//   await page.waitForTimeout(1000)

  await page.getByPlaceholder('Processor name').fill(generateString(5));
  await page.getByPlaceholder('Alert email').fill('syadav@dataseers.in');
  await page.getByPlaceholder('Website').fill('https://test.dataseers.in');
  await page.getByPlaceholder('Phone number').fill(phoneNumber);
  await page.getByPlaceholder('Primary contact name').fill(generateString(10));
  await page.getByPlaceholder('Primary contact phone').fill(phoneNumber);
  await page.getByPlaceholder('Primary contact email').fill('syadav@dataseers.in');
 
  await page.waitForTimeout(10000)
  
  await page.getByRole('button', { name: 'Add Rule' }).click();
  await page.getByLabel('Batch').check();
  await page.locator('div').filter({ hasText: /^Select Frequency$/ }).nth(4).click();
  await page.getByText('Daily').click();
  await page.getByPlaceholder('Select time').click();
  await page.getByText('Now').click();
  await page.getByPlaceholder('Select time').click();
  await page.getByText('33').click();
  await page.getByRole('button', { name: 'OK' }).click();
  await page.getByLabel('Alert On File Found').click();
  await page.getByLabel('Alert On File Not Found').click();
  await page.locator('.ant-select-selection-overflow').first().click();
  await page.getByRole('tree').locator('div').filter({ hasText: /^Global Admin$/ }).locator('svg').click();
  //await page.locator('div:nth-child(3) > .ant-select-tree-checkbox > .ant-select-tree-checkbox-inner').click();
  //await page.locator('div:nth-child(6) > .ant-select-tree-checkbox > .ant-select-tree-checkbox-inner').click();
  //await page.locator('div:nth-child(4) > .ant-form-item > .ant-row > div:nth-child(2) > .ant-form-item-control-input > .ant-form-item-control-input-content > .ant-select > .ant-select-selector > .ant-select-selection-overflow').click();
  //await page.locator('div:nth-child(9) > div > .ant-select-dropdown > div > div > .ant-select-tree > .ant-select-tree-list > .ant-select-tree-list-holder > div > .ant-select-tree-list-holder-inner > div > .ant-select-tree-switcher').first().click();
  //await page.locator('div:nth-child(9) > div > .ant-select-dropdown > div > div > .ant-select-tree > .ant-select-tree-list > .ant-select-tree-list-holder > div > .ant-select-tree-list-holder-inner > div:nth-child(3) > .ant-select-tree-checkbox > .ant-select-tree-checkbox-inner').click();
  //await page.locator('div:nth-child(9) > div > .ant-select-dropdown > div > div > .ant-select-tree > .ant-select-tree-list > .ant-select-tree-list-holder > div > .ant-select-tree-list-holder-inner > div:nth-child(5) > .ant-select-tree-checkbox > .ant-select-tree-checkbox-inner').click();
  await page.getByPlaceholder('Please enter no. of files').click();
  await page.getByPlaceholder('Please enter no. of files').fill('4');
  await page.getByLabel('Optional').first().check();
  await page.getByLabel('Multiple File').first().check();
  await page.locator('#sourceFolderName-0-0').click();
  await page.locator('#sourceFolderName-0-0').fill('home/abc');
  await page.getByRole('menuitem', { name: 'Processor' }).locator('span').first().click();
  await page.locator('#destinationFolderName-0-0').click();
  await page.locator('#destinationFolderName-0-0').fill('home/process/abc');
  await page.locator('#fileName-0-0').click();
  await page.locator('#fileName-0-0').fill('abc*');
  await page.locator('#extensionId-0-0').click();
  await page.getByText('txt', { exact: true }).click();
  await page.locator('#isFixedLength-0-0').click();
  await page.getByLabel('Record Length').click();
  await page.locator('#isFixedLength-0-0').click();
  await page.locator('#delimeterId-0-0').click();
  await page.getByText('Pipe (|)', { exact: true }).click();
  await page.locator('#lineTerminatorId-0-0').click();
  await page.getByText('LF', { exact: true }).click();
  await page.locator('#containsHeader-0-0').click();
  await page.getByLabel('Optional').nth(1).check();
  await page.locator('#sourceFolderName-0-1').click();
  await page.locator('#sourceFolderName-0-1').fill('home/abc');
  await page.locator('#destinationFolderName-0-1').click();
  await page.locator('#destinationFolderName-0-1').fill('home/process/abc');
  await page.locator('#fileName-0-1').click();
  await page.locator('#fileName-0-1').fill('cde*');
  await page.locator('#extensionId-0-1').click();
  await page.getByText('txt').nth(4).click();
  await page.locator('#delimeterId-0-1').click();
  await page.getByText('Pipe (|)').nth(4).click();
  await page.locator('#lineTerminatorId-0-1').click();
  await page.getByText('LF', { exact: true }).nth(2).click();
  await page.locator('#containsHeader-0-1').click();
  await page.getByLabel('Optional').nth(2).check();
  await page.getByText('Multiple File', { exact: true }).nth(2).click();
  await page.getByLabel('Multiple File').nth(2).uncheck();
  await page.getByLabel('Multiple File').nth(2).check();
  await page.locator('#sourceFolderName-0-2').click();
  await page.locator('#sourceFolderName-0-2').fill('home/abc');
  await page.locator('#destinationFolderName-0-2').click();
  await page.locator('#destinationFolderName-0-2').fill('home/process/abc');
  await page.locator('#fileName-0-2').click();
  await page.locator('#fileName-0-2').fill('sfsaef*');
  await page.locator('#extensionId-0-2').click();
  await page.getByText('txt', { exact: true }).nth(4).click();
  await page.locator('#delimeterId-0-2').click();
  await page.getByText('Pipe (|)', { exact: true }).nth(4).click();
  await page.locator('#lineTerminatorId-0-2').click();
  await page.getByTitle('LF', { exact: true }).nth(4).click();
  await page.locator('#containsHeader-0-2').click();
  await page.getByLabel('Optional').nth(3).check();
  await page.getByLabel('Multiple File').nth(3).check();
  await page.locator('#sourceFolderName-0-3').click();
  await page.locator('#sourceFolderName-0-3').fill('home/abc');
  await page.locator('#destinationFolderName-0-3').click();
  await page.locator('#destinationFolderName-0-3').fill('home/process/abc');
  await page.locator('#fileName-0-3').click();
  await page.locator('#fileName-0-3').fill('ajsdb*');
  await page.locator('#extensionId-0-3').click();
  await page.locator('div:nth-child(27) > div > .ant-select-dropdown > div > .rc-virtual-list > .rc-virtual-list-holder > div > .rc-virtual-list-holder-inner > div:nth-child(2) > .ant-select-item-option-content').click();
  await page.locator('#delimeterId-0-3').click();
  await page.locator('div:nth-child(28) > div > .ant-select-dropdown > div > .rc-virtual-list > .rc-virtual-list-holder > div > .rc-virtual-list-holder-inner > div > .ant-select-item-option-content').first().click();
  await page.locator('#lineTerminatorId-0-3').click();
  await page.locator('div:nth-child(29) > div > .ant-select-dropdown > div > .rc-virtual-list > .rc-virtual-list-holder > div > .rc-virtual-list-holder-inner > div > .ant-select-item-option-content').first().click();
  await page.locator('#containsHeader-0-3').click();
  
});