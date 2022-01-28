module.exports = {
  label: "Connect to ZohoBooks",
  mock_input: {
    access_token: "1000.437e60011252e8977e838b6d18a799b8.9202cfe36f83c070bf88821ed9f3bdd2"
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