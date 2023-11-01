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

test('Invalid Login with Blank Email', async ({ page }) => {
  await page.goto(process.env.SEERPORTAL230);
  await page.getByPlaceholder('Email').click();
  await page.getByPlaceholder('Email').press('Enter');
  await page.waitForTimeout(2000)
  
  const blankEmailErrMsg = await page.$eval("(//div[@class='ant-form-item-explain-error'])[1]", (element) => element.textContent)
  await assert.equal(blankEmailErrMsg,'Please enter e-mail!','Error Message Matched')
});

test('Invalid Email Login', async ({ page }) => {
  await page.goto(process.env.SEERPORTAL230);
  await page.getByPlaceholder('Email').click();
  await page.getByPlaceholder('Email').fill("sdysugw@jhd");
  await page.getByPlaceholder('Email').press('Enter');
  await page.waitForTimeout(2000)
  
  const invalidEmailErrMsg = await page.$eval("(//div[@class='ant-form-item-explain-error'])[1]", (element) => element.textContent)
  await assert.equal(invalidEmailErrMsg,'Please enter valid e-mail!','Error Message Matched')
});


test('Valid Email and Blank Password', async ({ page }) => {
  await page.goto(process.env.SEERPORTAL230);
  await page.getByPlaceholder('Email').click();
  await page.getByPlaceholder('Email').fill(process.env.USER);
  await page.getByPlaceholder('Email').press('Enter');
  await page.waitForTimeout(2000)
  await page.getByPlaceholder('Password').press('Enter');
  await page.waitForTimeout(2000)
  
  const blankPasswordErrMsg = await page.$eval("(//div[@class='ant-form-item-explain-error'])[1]", (element) => element.textContent)
  await assert.equal(blankPasswordErrMsg,'Please input password!','Error Message Matched')
});

test('Validate Login with Passcode with combination of alphanumeric', async ({ page }) => {
  await page.goto(process.env.SEERPORTAL230);
  console.log(process.env.SEERPORTAL230);
  await page.getByPlaceholder('Email').click();
  await page.getByPlaceholder('Email').fill(process.env.USER);
  await page.getByPlaceholder('Email').press('Enter');
  await page.getByPlaceholder('Password').fill(process.env.PASSWORD);
  await page.getByPlaceholder('Password').press('Enter');
  await page.waitForTimeout(2000)
  //Incorrect Passcode
  await page.getByPlaceholder('Passcode').fill("34sD33");

  await page.getByRole('button', { name: 'Submit' }).click();
  await page.waitForTimeout(2000)
   
  const incorrectPasscodeAlphaNumric = await page.$eval("(//span[normalize-space()='Please enter a valid totp'])[1]", (element) => element.textContent)
  await assert.equal(incorrectPasscodeAlphaNumric,'Please enter a valid totp','Incorrect Passcode Alphanumeric Error Matched')
});

test('Validate Login', async ({ page }) => {
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
  
  const homePageTitle = await page.$eval("span[title='Home Page']", (element) => element.textContent)
  await assert.equal(homePageTitle,'Home Page','Home Page Title Matched')
});