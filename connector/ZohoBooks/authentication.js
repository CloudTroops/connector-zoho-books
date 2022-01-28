module.exports = {
  label: "Connect to ZohoBooks",
  mock_input: {
    access_token: "1000.66b786eebafe05bc3568512403b4c3ea.cc6ca8b9c045f030ee2e97cf5035ee75"
  },
  oauth: "zohobooks_0a5b9c53df",
  validate: function (input, output) {
    // auth credentials will be available in input.auth.access_token
    // callback pattern
    // output(error, success
    const request = require('request');
    request({
      url: 'https://books.zoho.in/api/v3/invoices?organization_id=60012922323',
      headers: {
        Authorization: `Zoho-oauthtoken ${input.auth.access_token}`,
        accept: "application/json"
      }
    },
    function(err, res, body){
      if(err){
        output(err, null)
      }
      if(res.statusCode == 401){
        output('Unauthorized')
      } else {
        output(null, 'Logged in successfull');
      }
    })
  }
}