import { test, expect } from "@playwright/test";
import assert, { strict } from "assert";
import { LoginPage } from "../Page-Object/LoginPageObj";
import {
  randomSelection,
  randomValue,
  generateString,
} from "../../utils/random";

const csvTestData = require("../csv-upload-config/csvparser");
console.log(csvTestData);
const dotenv = require("dotenv"); //env config
dotenv.config();
const path = require("path");
const inputFilePath = "../Login2FA/data/programMatrixInput.csv";
let page;

test.describe("Program Matrix Suite", () => {
  test.beforeEach(async ({ browser }) => {
    page = await browser.newPage();
    //let a = new LoginPage(page)
    const login = new LoginPage(page);
    await login.goto();
    await login.loginAuth();
    await page.waitForTimeout(1000);
  });

  test("Navigated to Rules & MDM Page", async () => {
    await page.waitForTimeout(1000);
    await page.waitForTimeout(1000);
    await page.click('//span[contains(text(),"Rules & MDM")]');
    await page.waitForTimeout(1000);
    await page.click('//span[contains(text(),"Program Rules")]');
    await page.waitForTimeout(1000);
    await page.click('//a[@title="Matrix"]');
    const proMatrixTitle = await page.$eval(
      "//span[@title='Matrix']",
      (element) => element.textContent
    );
    await assert.equal(proMatrixTitle, "Matrix", "Matrix Title Matched");
    await page.waitForTimeout(1000);

    let matrixCsvData = await csvTestData.processorInputData(inputFilePath);
    console.log("result=================>", matrixCsvData);

    let Status = matrixCsvData[0].status;
    let Currency = matrixCsvData[0].currencyCode;
    let ProcesserName = matrixCsvData[0].processorName;
    let Issuer = matrixCsvData[0].issuer;
    let ProgramManager = matrixCsvData[0].programManager;
    let ProgramID = matrixCsvData[0].programID;
    let ProgramName = matrixCsvData[0].programName;
    let ProgramType = matrixCsvData[0].programType;
    let ProductID = matrixCsvData[0].productID;
    let ProductName = matrixCsvData[0].productName;
    let GroupID = matrixCsvData[0].groupID;
    let GroupName = matrixCsvData[0].groupName;
    let Loop = matrixCsvData[0].loop;
    let BinType = matrixCsvData[0].binType;
    let Bin = matrixCsvData[0].bin;
    let BinRange = matrixCsvData[0].binRange;
    let Signature = matrixCsvData[0].signature;
    let Pin = matrixCsvData[0].pin;
    let Unaffiliated = matrixCsvData[0].unaffiliated;
    let ATMNetworks = matrixCsvData[0].atmNetworks;

    let Reloadable = matrixCsvData[0].reloadable;
    let Kyc = matrixCsvData[0].kyc;
    let Kyb = matrixCsvData[0].kyb;
    let International = matrixCsvData[0].international;
    let CashBack = matrixCsvData[0].cashback;
    let ATM = matrixCsvData[0].atm;
    let InternationalATM = matrixCsvData[0].internationalatm;
    let BAI2 = matrixCsvData[0].bai2;
    let BillPay = matrixCsvData[0].billpay;
    let ACH = matrixCsvData[0].ach;

    console.log("**************************", Status);
    console.log("**************************", Currency);
    console.log("**************************", ProcesserName);
    console.log("**************************", Issuer);
    console.log("**************************", ProgramManager);
    console.log("**************************", ProgramID);
    console.log("**************************", ProgramName);
    console.log("**************************", ProgramType);
    console.log("**************************", ProductID);
    console.log("**************************", ProductName);
    console.log("**************************", GroupID);
    console.log("**************************", GroupName);
    console.log("**************************", Loop);
    console.log("**************************", BinType);
    console.log("**************************", Bin);
    console.log("**************************", BinRange);
    console.log("**************************", Signature);
    console.log("**************************", Pin);
    console.log("**************************", Unaffiliated);
    console.log("**************************", ATMNetworks);

    console.log("**************************", Reloadable);
    console.log("**************************", Kyc);
    console.log("**************************", Kyb);
    console.log("**************************", International);
    console.log("**************************", CashBack);
    console.log("**************************", ATM);
    console.log("**************************", InternationalATM);
    console.log("**************************", BAI2);
    console.log("**************************", BillPay);
    console.log("**************************", ACH);

    // await page.waitForTimeout(3000)
    //   await page.getByPlaceholder('Processor name').fill(ProName);
    //   await page.waitForTimeout(3000)
    //   await page.getByPlaceholder('Alert email').fill(alertEID);

    // let relativePath = './data/Pradeep.asc';
    // const pgpfilePath = path.resolve(relativePath);
    // //console.log(pgpfilePath, "PGP Key File Path Is:::::::::::::::::::::::::::::::::::::::::::::::::>");
    //   await page.evaluate(function () {
    //     document.querySelector("input[type='file']").style.display = "block";
    //   });

    //   await page.locator('button').filter({ hasText: 'Click to Upload' }).click();
    //   await page.setInputFiles(`//input[@type='file']`,pgpfilePath);

    //await page.pause();

    //test("Add New Program Matrix", async () => {

    //await page.getByRole("button", { name: "Add new program" }).click();
    // await page.getByRole("button", { name: Status, exact: true }).click();
    // await page
    //   .locator("div")
    //   .filter({ hasText: /^Select currency$/ })
    //   .nth(4)
    //   .click();
    // await page.getByText(Currency).click();
    // await page.getByLabel("Processor").click();
    // await page.getByText(ProcesserName, { exact: true }).click();
    // await page.getByLabel("Issuer").click();
    // await page.getByText(Issuer).click();
    // await page.getByLabel("Program Manager").click();
    // await page.getByLabel("Program Manager").fill(ProgramManager);
    // await page.getByLabel("Program ID").click();
    // await page.getByLabel("Program ID").fill(ProgramID);
    // await page.getByLabel("Program Name").click();
    // await page.getByLabel("Program Name").fill(ProgramName);
    // await page
    //   .locator("div")
    //   .filter({ hasText: /^Select program type$/ })
    //   .nth(4)
    //   .click();
    // await page.getByText(ProgramType).click();
    // await page.getByLabel("Product ID").click();
    // await page.getByLabel("Product ID").fill(ProductID);
    // await page.getByLabel("Product Name").click();
    // await page.getByLabel("Product Name").fill(ProgramName);
    // await page.getByLabel("Group ID").click();
    // await page.getByLabel("Group ID").fill(GroupID);
    // await page.getByLabel("Group Name").click();
    // await page.getByLabel("Group Name").fill(GroupName);
    // await page.getByLabel("Loop").click();
    // await page.getByText(Loop).click();
    // await page.getByLabel("Bin Type").click();
    // await page.getByText(BinType, { exact: true }).click();
    // await page.getByLabel("Bin", { exact: true }).click();
    // await page.getByLabel("Bin", { exact: true }).fill(Bin);
    // await page.getByLabel("Bin Range").click();
    // await page.getByLabel("Bin Range").fill(BinRange);
    // await page
    //   .locator("div")
    //   .filter({ hasText: /^Please select unaffiliated network$/ })
    //   .nth(4)
    //   .click();
    // await page.getByText(Unaffiliated).nth(1).click();
    // await page
    //   .locator(
    //     "div:nth-child(5) > .ant-form-item > .ant-row > div:nth-child(2) > .ant-form-item-control-input > .ant-form-item-control-input-content > .ant-select > .ant-select-selector > .ant-select-selection-overflow"
    //   )
    //   .click();
    // //await page.getByText("CU Dollar").click();
    // //await page.getByText("CO-OP Financial Services").click();
    // await page.getByText(ATMNetworks).click();
    // //   await page.getByText("checking the status of network code").click();
    // //   await page.getByText("Cardtronics").click();
    // //   await page.getByText("Allpoint").click();
    // //   await page.getByText("Alliance One").click();

    // await page.getByText("Features", { exact: true }).click();
    // //await page.getByLabel("Accounts allowed per program").click();
    // //await page.getByLabel("Accounts allowed per program").click();
    // await page.getByLabel("Accounts allowed per program").fill("2");

    // if (Reloadable == "yes") {
    //   await page.getByLabel("Reloadable").click();
    // }
    // if (Kyc == "yes") {
    //   await page.getByLabel("KYC").click();
    // }
    // if (Kyb == "yes") {
    //   await page.getByLabel("KYB").click();
    // }
    // if (International == "yes") {
    //   await page.getByLabel("International", { exact: true }).click();
    // }
    // if (CashBack == "yes") {
    //   await page.getByLabel("Cash Back").click();
    // }
    // if (ATM == "yes") {
    //   await page.getByLabel("ATM", { exact: true }).click();
    // }
    // if (InternationalATM == "yes") {
    //   await page.getByLabel("International ATM", { exact: true }).click();
    // }
    // if (BAI2 == "yes") {
    //   await page.getByLabel("BAI2").click();
    // }
    // if (BillPay == "yes") {
    //   await page.getByLabel("Bill Pay").click();
    // }
    // if (ACH == "yes") {
    //   await page.getByLabel("ACH", { exact: true }).click();
    // }
    // await page
    //   .locator(
    //     "div:nth-child(3) > div:nth-child(3) > .ant-form-item > .ant-row > div:nth-child(2) > .ant-form-item-control-input > .ant-form-item-control-input-content"
    //   )
    //   .click();
    // await page.getByLabel("Age", { exact: true }).click();
    // await page.getByLabel("Age", { exact: true }).fill("20");
    // await page.getByText("Velocity Limits").click();

    // const velocityLimitElements = await page.$$("//input");

    // for (let i = 21; i < 390; i++) {
    //   await velocityLimitElements[i].fill(randomValue());
    // }

    // await page.getByText("Lifetime Limits").scrollIntoViewIfNeeded();
    // await page.getByText("Lifetime Limits").click();
    // await page.getByLabel("Max Load Transaction Amount").click();
    // await page.getByLabel("Max Load Transaction Amount").fill("1234567890");
    // await page.getByLabel("Max Load Transaction Amount").click();
    // await page.getByLabel("Max Load Transaction Amount").click();
    // await page.getByLabel("Max Single Transaction Amount").click();
    // await page.getByLabel("Max Single Transaction Amount").fill("1234567890");
    // await page.getByLabel("Max Card Balance").click();
    // await page.getByLabel("Max Card Balance").fill("1234567890");
    // await page.getByLabel("Max ACH Load").click();
    // await page.getByLabel("Max ACH Load").fill("1234567");
    // await page.getByLabel("Max ATM Transaction Amount").click();
    // await page.getByLabel("Max ATM Transaction Amount").fill("123456789");
    // await page.getByLabel("Max Cash Access").click();
    // await page.getByLabel("Max Cash Access").fill("1234567");
    // await page.getByLabel("Max International ATM Transaction Amount").click();
    // await page
    //   .getByLabel("Max International ATM Transaction Amount")
    //   .fill("123456789");

    // await page.getByRole("tab", { name: "MCC" }).click();
    // await page
    //   .getByLabel("MCC", { exact: true })
    //   .locator('[id="\\31 "]')
    //   .click();
    // await page
    //   .locator(
    //     ".ant-card-extra > div > .ant-select > .ant-select-selector > .ant-select-selection-overflow"
    //   )
    //   .click();
    // await page.locator("#mcc_select").fill("0763");
    // await page.getByRole("button", { name: "Block" }).click();
    // await page
    //   .locator(
    //     ".ant-card-extra > div > .ant-select > .ant-select-selector > .ant-select-selection-overflow"
    //   )
    //   .click();
    // await page.locator("#mcc_select").fill("0763");
    // await page.getByRole("button", { name: "Allow" }).click();
    // await page
    //   .locator(
    //     ".ant-card-extra > div > .ant-select > .ant-select-selector > .ant-select-selection-overflow"
    //   )
    //   .click();
    // await page.locator("#mcc_select").fill("0763");
    // await page.getByText("0763 Agricultural Cooperatives").click();
    // await page.getByRole("button", { name: "Block" }).click();
    // await page.getByRole("tab", { name: "Country" }).click();
    // await page
    //   .locator(
    //     "#rc-tabs-0-panel-7 > .ant-row > .ant-card > .ant-card-head > .ant-card-head-wrapper > .ant-card-extra > div > .ant-select > .ant-select-selector > .ant-select-selection-overflow"
    //   )
    //   .click();
    // await page.locator("#country_select").fill("afg");
    // await page.getByText("AFG Afghanistan").click();
    // await page.getByRole("button", { name: "Allow" }).click();
    // await page
    //   .locator(
    //     "#rc-tabs-0-panel-7 > .ant-row > .ant-card > .ant-card-head > .ant-card-head-wrapper > .ant-card-extra > div > .ant-select > .ant-select-selector > .ant-select-selection-overflow"
    //   )
    //   .click();
    // await page.locator("#country_select").fill("afg");
    // await page.getByText("AFG Afghanistan").click();
    // await page.getByRole("button", { name: "Block" }).click();
    // await page
    //   .getByLabel("Country", { exact: true })
    //   .locator('[id="\\35 "]')
    //   .click();
    // await page.waitForTimeout(2000);
    // await page.getByText("Fee Matrix").click();

    // const feeMatrixElements = await page.$$("//div/div/div/div/input");
    // for (let j = 391; j < 492; j++) {
    //   await feeMatrixElements[j].fill(randomValue());
    // }

    // await page.getByText("Funding", { exact: true }).click();
    // await page.getByLabel("Fed account number").click();
    // await page.getByLabel("Fed account number").fill("123456789123456");
    // await page.getByLabel("Suspense account number").click();
    // await page.getByLabel("Suspense account number").fill("123456789123456");
    // await page.getByLabel("Prefunding/GL account number").click();
    // await page
    //   .getByLabel("Prefunding/GL account number")
    //   .fill("123456789123456");
    // await page.getByLabel("Funding account number").click();
    // await page.getByLabel("Funding account number").fill("123456789123456");
    // await page.getByLabel("Settlement account number").click();
    // await page.getByLabel("Settlement account number").fill("123456789123456");
    // await page.getByLabel("Revenue account number").click();
    // await page.getByLabel("Revenue account number").fill("123456789123456");

    // await page.getByRole("button", { name: "Cancel" }).click();

    // await page.getByRole("button", { name: "Download sample file" }).click();

    // await page
    //   .getByRole("button", { name: "Download program matrix data" })
    //   .click();
    // await page.getByRole("button", { name: "Download", exact: true }).click();

    // // let downloadMsg=await page.locator('//span[contains(text(),"Your file is queued. When done you can download it")]').textContent();
    // // assert.equal(downloadMsg,'Your file is queued. When done you can download it',"Download Assertion Message Matched");

    // // await page.getByRole('button', { name: 'View Bulk Upload Results' }).click();
    // // await page.getByRole('button', { name: 'Back' }).click();

    // await page.getByRole("button", { name: "Publish matrix data" }).click();
    // await page.getByRole("button", { name: "Cancel" }).click();
    // await page.getByRole("button", { name: "Publish matrix data" }).click();
    // await page.getByRole("button", { name: "OK" }).click();

    // await page.waitForTimeout(2000);

    // if (
    //   (await page.$eval(
    //     "//div[contains(text(),'No changes to publish.')]",
    //     (element) => element.textContent
    //   )) === "No changes to publish."
    // ) {
    //   assert.equal(
    //     await page.$eval(
    //       "//div[contains(text(),'No changes to publish.')]",
    //       (element) => element.textContent
    //     ),
    //     "No changes to publish.",
    //     "Publish Message Matched"
    //   );
    // } else if (
    //   (await page.$eval(
    //     "//span[normalize-space()='Success']",
    //     (element) => element.textContent
    //   )) === "Success"
    // ) {
    //   assert.equal(
    //     await page.$eval(
    //       "//span[normalize-space()='Success']",
    //       (element) => element.textContent
    //     ),
    //     "Success",
    //     "Publish Message Matched"
    //   );
    // } else if (
    //   (await page.$eval(
    //     "//div[contains(text(),'Request failed with status code 504')]",
    //     (element) => element.textContent
    //   )) === "Request failed with status code 504"
    // ) {
    //   assert.equal(
    //     await page.$eval(
    //       "//div[contains(text(),'Request failed with status code 504')]",
    //       "Request failed with status code 504",
    //       "Publish Message Matched"
    //     )
    //   );
    // }

    // //   assert.equal(downloadMsg,'Your file is queued. When done you can download it',"Download Assertion Message Matched");

    // await page
    //   .getByRole("button", { name: "Program Matrix Publish/Restore history" })
    //   .click();
    // await page.getByRole("button", { name: "Back" }).click();

    // await page.getByRole("button", { name: "Risk Calculator" }).click();

    // await page.getByText('Risk score will be calculated shortly.').click();

    //await page.getByRole("button", { name: "Group View" }).click();

    await page.waitForTimeout(5000);

    //await page.pause();

    const row = await page.locator("//tbody/tr/td[3]/a").allTextContents();

    //console.log("TTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTT", row);

    await row.forEach((text) => {
      console.log("TTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTT", text);
    });

    const program = await page.locator("//tbody/tr/td[4]/a").allTextContents();

    //console.log("TTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTT", row);

    await program.forEach((prg) => {
      console.log("PPPPPPPPPPPPPPPPPPPP", prg);
    });

    console.log("RANDOM SELECTION", randomSelection());
    let randomMatrix = randomSelection();
    

    //////////////////////////////////////////////////////////////////
//const classicViewBtn=await page.getByRole('button', { name: 'Classic View' })
//const groupViewBtn=await page.getByRole("button", { name: "Group View" })   
    
   

      //const ele1 = page.locator('//button[@title="Group View"]');
      //await ele1.waitFor({state: "visible"})

     // const ele2 = );
      //await ele2.waitFor({state: "visible"})
      await page.waitForTimeout(5000);
      if(await page.getByRole('button', { name: 'Group View' }, {strict: true}) || await page.getByRole('button', { name: 'Classic View' },{strict: false})) {
        await page.getByRole('button', { name: 'Group View' }).click()
      }else{
        await page.getByRole('button', { name: 'Classic View' }).click()
      }
      
      // await page.waitForTimeout(5000);
      // if(await page.getByRole('button', { name: 'Group View' }, {strict: true}) || await page.getByRole('button', { name: 'Classic View' },{strict: false})) {
      //   await page.getByRole('button', { name: 'Group View' }).click()
      // }else{
      //   await page.getByRole('button', { name: 'Classic View' }).click()
      // }
      // ///await page.getByRole('button', { name: 'Classic View' })
      // await page.waitFor({ state: 'visible' });
      // //await this.myElement.waitFor({ state: 'visible' });
      // await page.getByRole('button', { name: 'Classic View' }).click();
      // }else{
      //   await page.waitFor({ state: 'visible' });
      //   await page.getByRole("button", { name: "Group View" }).click();
      // }


   // await page.getByRole('button', { name: 'Classic View' }).click();

    await page.getByRole('cell', { name: 'Status filter' }).getByRole('button').click();
    await page.getByRole('menuitem', { name: 'Active', exact: true }).getByLabel('').check();
    await page.getByRole('button', { name: 'OK' }).click();

    

    const prgMartixListElement = await page.locator(
      '//tbody/tr['+ randomMatrix +']/td[1]/label/span/input'
    );

    console.log("XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXPATH-------------",prgMartixListElement.size)
    await page.waitForTimeout(5000);
    //'(//span[contains(text(),"Optional")])[' + k + "]";
    //.allTextContents();
    //console.log("@@@@@@@@@@@@@@@@", prgMartixListElement);

    //let count = prgMartixListElement.size;

    // let selectionMatrix = await prgMartixListElement.textContent;
    // console.log("JBHSBHBSHBCHSBZHJCBHSBHCBSHBCHJBSJBCSC", selectionMatrix);

    await prgMartixListElement.click();

    await page.getByRole('button', { name: 'Copy program' }).click();
await page.pause();
    // await page.selectionMatrix.click();

    // for (let i = 0; i < prgMartixListElement.size(); i++) {
    //   await prgMartixListElement[i].allTextContents();
    //   console.log(
    //     "IIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIII",
    //     prgMartixListElement[i]
    //   );
    // }

    //   row.forEach((text) => {
    //     console.log("TTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTT",text)
    // });

    //await page.goto('https://dev.dataseers.in/program-matrix');
  });

  //}
});
