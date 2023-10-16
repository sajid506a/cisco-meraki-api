const MerakiAPI = require('./meraki');
const dotenv = require('dotenv');
const fs = require('fs');

dotenv.config();
const apiKey = process.env.API_KEY;
const apiUrl = process.env.API_URL;
const organizationId = process.env.ORG_ID;
const options = {
    apiKey,
    apiUrl
}
const meraki = new MerakiAPI(options);


function writeFileByName(name,data){
    fs.writeFile(name, JSON.stringify(data,0,2), function (err) {
        if (err) throw err;
    });
}

async function getOrganizationById() {
    try {
        const organizationInfo = await meraki.getOrganizationById(organizationId);
        console.log(organizationInfo);
    } catch (error) {
        console.error(error);
    }
}

async function getOrganizations() {
    try {
        const organizationInfos = await meraki.getOrganizations(organizationId);
        console.log(organizationInfos);
    } catch (error) {
        console.error(error);
    }
}


async function getAllOrganizationsNetwork() {
    try {
        const organizationsInfo = await meraki.getOrganizations();
        let organization = [];
        let networks = [];
        let devices = [];
        for (const organizationInfo of organizationsInfo) {
            organization.push(organizationInfo);
            writeFileByName('organizations.json', organization);
            const networksInfo = await meraki.getNetworksInOrganization(organizationInfo.id);
            if (networksInfo.length > 0) {
                networks.push(networksInfo);
                writeFileByName('networks.json',networks);
                for(networkDevice of networksInfo) {
                    const devices1 = await meraki.getNetworkDevicesById(networkDevice.id)
                    devices.push(devices1);
                    writeFileByName('devices.json',devices);
                }
            }
        }
    } catch (error) {
        console.error(error);
    }
}
// getOrganizationById();
// getOrganizations();

getAllOrganizationsNetwork();
