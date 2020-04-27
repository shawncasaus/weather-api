let json = {}; //data for last call

//setter for last call
let setJSON = (data) => {
    json = data;
}

//getter for last call
let getJSON = () => {
    return json;
};

module.exports = {setJSON, getJSON};