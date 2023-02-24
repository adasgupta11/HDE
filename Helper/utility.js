function fileWrite(content, path) {
    const { writeFileSync } = require('fs');
    
    try {
        writeFileSync(path, JSON.stringify(content, null, 2), 'utf8');
        console.log('Data successfully saved to disk');
    } catch (error) {
        console.log('An error has occurred ', error);
    }

}


function getAllAccounts(path) {
    const { readFileSync } = require('fs');
    
    try {
        const fileJson = JSON.parse(readFileSync(path));
        return fileJson;
    } catch (error) {
        console.log('An error has occurred ', error);
        return null;
    }

}

function getAccountsByAccountName(path, accountName) {
    const { readFileSync } = require('fs');
    
    try {
        const allAccounts = JSON.parse(readFileSync(path));
        return allAccounts[accountName];
    } catch (error) {
        console.log('An error has occurred ', error);
        return null;
    }

}


module.exports = {
    fileWrite,
    getAllAccounts,
    getAccountsByAccountName
  }

