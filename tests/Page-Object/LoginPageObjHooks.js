const dotenv = require("dotenv");
dotenv.config();
import * as OTPAuth from "otpauth";

// Create a new TOTP object.
let totp = new OTPAuth.TOTP({
  issuer: "SeerPortal",
  secret: "MHXILU6HYBGAP2LTJBMRJUJLECYURDWB", // or 'OTPAuth.Secret.fromBase32("MHXILU6HYBGAP2LTJBMRJUJLECYURDWB")'
});
//otpauth://totp/SeerPortal?secret=MHXILU6HYBGAP2LTJBMRJUJLECYURDWB&issuer=SeerPortal

exports.LoginPage = class LoginPage {
  constructor(page) {
    this.page = page;
    this.email_txt = page.getByPlaceholder('Email')
    this.password_txt = page.getByPlaceholder('Password')
    this.passcode_txt = page.getByPlaceholder('Passcode')
    this.submitBtn = page.getByRole('button', { name: 'Submit' })
    this.continueDataseerBtn = page.getByRole('button', { name: 'Continue as DataSeers.' })
  }

  async goto() {
    await this.page.goto(process.env.SEERPORTAL230);
  }

  async loginAuth() {
  await this.email_txt.click();
  await this.email_txt.fill(process.env.USER);
  await this.submitBtn.press('Enter');
  await this.password_txt.fill(process.env.PASSWORD);
  await this.password_txt.press('Enter');
  await this.page.waitForTimeout(1000)
  
  let token = totp.generate();
  await this.passcode_txt.fill(token);

  await this.submitBtn.click();
  await this.page.waitForTimeout(1000)
  await this.continueDataseerBtn.click();
  await this.page.waitForTimeout(1000)
  }
};