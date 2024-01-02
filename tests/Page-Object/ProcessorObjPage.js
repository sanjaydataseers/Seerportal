//const Page = require('../Rules&MDM/page');
const path= require('path')

exports.ProcessorObjPage = class ProcessorObjPage {
    constructor(page) {
      this.page = page;
    }
async addProceessorDetails (procInfo,batchCsvData) {
    let b=0;
    //let r=0;
 for (let j=0; j < procInfo.length; j++) {
 let b=j+1;
 if(j < 1 ){
 await this.processorNameFld.setValue(procInfo[j].processorName);
 await this.alertEmailFld.setValue(procInfo[j].alertEmailID);
 }
};