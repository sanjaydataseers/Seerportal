import { test, expect } from '@playwright/test';
//import * as OTPAuth from "otpauth";
import assert from 'assert';
import { LoginPage } from '../Page-Object/LoginPageObjHooks';
//import { Hooks } from '../config/Hooks';

const path= require('path')
const Sequelize = require('sequelize');
const Assert=require('assert');
const { Console } = require('console');
const dbquery  = require('../../database-config/dbconnection');
const moment = require('moment');
const { parse } = require('path');
const { ConnectionAcquireTimeoutError } = require('sequelize');
const dotenv = require("dotenv");
//env config
dotenv.config();

//const login = new LoginPage(page)

// // Create a new TOTP object.
// let totp = new OTPAuth.TOTP({
//   issuer: "SeerPortal",
//   secret: "MHXILU6HYBGAP2LTJBMRJUJLECYURDWB", // or 'OTPAuth.Secret.fromBase32("MHXILU6HYBGAP2LTJBMRJUJLECYURDWB")'
// });
//otpauth://totp/SeerPortal?secret=MHXILU6HYBGAP2LTJBMRJUJLECYURDWB&issuer=SeerPortal

// test.describe('Login Validation TestCases', () => {
//   test.beforeAll('Login',async ()) => {
//   test('All Login TestCases',() => {
// const login = new LoginPage(page)

test('TestCase: 1 Invalid Login with Blank Email', async ({ page }) => {
  const login = new LoginPage(page)
  await login.goto();
  await login.email_txt.click();
  await login.email_txt.press('Enter');
  await page.waitForTimeout(2000)
  
  const blankEmailErrMsg = await page.$eval("(//div[@class='ant-form-item-explain-error'])[1]", (element) => element.textContent)
  await assert.equal(blankEmailErrMsg,'Please enter e-mail!','Error Message Matched')
});

test('TestCase: 2 Invalid Email Login', async ({ page }) => {
  const login = new LoginPage(page)
  await login.goto();
  await login.email_txt.click();
  await login.email_txt.fill("sdysugw@jhd");
  await login.email_txt.press('Enter');
  await page.waitForTimeout(2000)
  
  const invalidEmailErrMsg = await page.$eval("(//div[@class='ant-form-item-explain-error'])[1]", (element) => element.textContent)
  await assert.equal(invalidEmailErrMsg,'Please enter valid e-mail!','Error Message Matched')
});


test('TestCase: 3 Valid Email and Blank Password', async ({ page }) => {
  const login = new LoginPage(page)
  await login.goto();
  await login.email_txt.click();
  await login.email_txt.fill(process.env.USER);
  await login.email_txt.press('Enter');
  await page.waitForTimeout(2000)
  await login.password_txt.press('Enter');
  await page.waitForTimeout(2000)
  
  const blankPasswordErrMsg = await page.$eval("(//div[@class='ant-form-item-explain-error'])[1]", (element) => element.textContent)
  await assert.equal(blankPasswordErrMsg,'Please input password!','Error Message Matched')
});

test('TestCase: 4 Validate Login with Passcode with combination of alphanumeric', async ({ page }) => {
  const login = new LoginPage(page)
  await login.goto();
  await login.email_txt.click();
  await login.email_txt.fill(process.env.USER);
  await login.email_txt.press('Enter');
  await login.password_txt.fill(process.env.PASSWORD);
  await login.password_txt.press('Enter');
  await page.waitForTimeout(2000)
  //Incorrect Passcode
  await login.passcode_txt.fill("34sD33");

  await login.submitBtn.click();
  await page.waitForTimeout(2000)
   
  const incorrectPasscodeAlphaNumric = await page.$eval("(//span[normalize-space()='Please enter a valid totp'])[1]", (element) => element.textContent)
  await assert.equal(incorrectPasscodeAlphaNumric,'Please enter a valid totp','Incorrect Passcode Alphanumeric Error Matched')
});

test('TestCase: 5 Validate Login', async ({ page }) => {
  const login = new LoginPage(page)


  await login.goto();
  await login.loginAuth();
  await page.waitForTimeout(1000)

//---------DB DATA-------------
let sqlQuery = `select * from seerportal_india_dev.users where email='${process.env.USER}';`;
console.log('sqlQuery ============>', sqlQuery)

let dbresultemail = await dbquery(sqlQuery);
console.log(":::::::::::::::::::DB Result Processsor::::::::",dbresultemail);
//let dbprocessorName=dbresultprocessor[0].name;
//   ---------DB DATA------------

  //await page.screenshot(new page.screenshotOptions().setPath(Paths.get(HomePage.png)))
  const homePageTitle = await page.$eval("span[title='Home Page']", (element) => element.textContent)
  await assert.equal(homePageTitle,'Home Page','Home Page Title Matched')

  // const userTitle = await page.$eval("span[title='Home Page']", (element) => element.textContent)
  // await assert.equal(homePageTitle,'Home Page','Home Page Title Matched')
});

