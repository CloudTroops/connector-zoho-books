module.exports = {

  name: "deleteInvoice",

  title: "Delete Invoice",

  description: "",
  version: "v1",

  input:{
    title: "Delete Invoice",
    type: "object",
    properties: {
      organization_id: {
        title: 'organization_id', // displayed as field label  
        type: 'string',
        description:'Enter Organization ID to delete invoice',
        minLength: 1 // define as reqiured
      },
      invoice_id: {
        title: 'invoice_id', // displayed as field label  
        type: 'string',
        description:'Enter Invoice ID to delete invoice',
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
    const request = require('request');

    const base = 'https://books.zoho.com/api/v3/invoices';
    const finalUrl = `${base}/${input.invoice_id}?organization_id=${input.organization_id}`;
    
    request({
      url: finalUrl,
      method: "DELETE",
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
