module.exports = {

  name: "getInvoice",

  title: "Get Invoice",

  description: "Get a Zoho Invoice by Invoice ID",
  version: "v1",

  input:{
    title: "Get Invoice",
    type: "object",
    properties: {
      organization_id: {
        title: 'organization_id', // displayed as field label  
        type: 'string',
        description:'Enter Organization ID to fetch invoices',
        minLength: 1 // define as reqiured
      },
      invoice_id: {
        title: 'invoice_id', // displayed as field label  
        type: 'string',
        description:'Enter Invoice ID to get invoice',
        minLength: 1 // define as reqiured
      }
    }
  },

  output: {
    title: "output",
  	type: "object",
  	properties: {

    }
  },

  mock_input:{},

  execute: function(input, output){
    // to access auth info use input.auth , eg: input.auth.username
    // and to return output use output callback like this output(null, { 'notice' : 'successful'})
    // your code here
    const request = require('request');

    const base = 'https://books.zoho.com/api/v3/invoices';
    const finalUrl = `${base}/${input.invoice_id}?organization_id=${input.organization_id}`;
    
    request({
      url: finalUrl,
      method: "GET",
      headers: {
        "Authorization": `Zoho-oauthtoken ${input.auth.access_token}`,
        "Accept": "application/json"
      }
    }, 
    (err, res, body) => {
      if (err) {
        return output(err);
      } else {
        if (res.statusCode >= 200 && res.statusCode < 400) {
          if (typeof (body) == 'string')
            return output(null, JSON.parse(body));
          else
            return output(null, body);
        } else {
          return output(JSON.parse(body));
        }
      }
    });
  }

}
