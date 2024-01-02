import { test, expect } from '@playwright/test';
//import * as OTPAuth from "otpauth";
import assert from 'assert';
import { LoginPage } from '../Page-Object/LoginPageObj';
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
dotenv.config();


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

test.only('TestCase: 5 Validate Login', async ({ page }) => {
  const login = new LoginPage(page)
  await login.goto();
  await login.loginAuth();
  await page.waitForTimeout(1000)

//---------DB DATA-------------
let sqlQuery = `select * from seerportal_india_dev.users where email='${process.env.USER}';`;
console.log('sqlQuery ============>', sqlQuery)
//await page.waitForTimeout(9000)
let dbresultemail = await dbquery(sqlQuery);
console.log(":::::::::::::::::::DB Result Processsor::::::::",dbresultemail);
//await page.waitForTimeout(9000)
//connection.end();
//let dbprocessorName=dbresultprocessor[0].name;
//   ---------DB DATA------------

await page.screenshot({path: "homePage.png"})
// await page.screenshot({path: "homepageFullScreenshot.png", fullPage:true})

// await page.locator('[data-testid="open-registration-form-button"]').screenshot({path: "createAccount.png"})
// const buffer = await page.screenshot();
// console.log(buffer.toString('base64'))
  
  const homePageTitle = await page.$eval("span[title='Home Page']", (element) => element.textContent)
  await assert.equal(homePageTitle,'Home Page','Home Page Title Matched')
  
  await page.pause();

  //connection.end();
});

