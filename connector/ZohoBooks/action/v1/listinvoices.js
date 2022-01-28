module.exports = {

  name: "listInvoices",

  title: "List Invoices",

  description: "",
  version: "v1",

  input:{
    title: "Listinvoices",
    type: "object",
    properties: {
      organization_id: {
        title: 'organization_id', // displayed as field label  
        type: 'string',
        description:'Enter Organization ID to fetch invoices',
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

  mock_input:{
    "organization_id": "60012922323"
  },

  execute: function(input, output){
    // to access auth info use input.auth , eg: input.auth.username
    // and to return output use output callback like this output(null, { 'notice' : 'successful'})
    // your code here

    const request = require('request');

    const base = 'https://books.zoho.in/api/v3/invoices';
    const finalUrl = `${base}?organization_id=${input.organization_id}`;
    console.log(`URL=${finalUrl}`);
    
    request({
      url: finalUrl,
      method: "GET",
      headers: {
        "Authorization": `Zoho-oauthtoken ${input.auth.access_token}`,
        "Content-Type": "application/json"
      }
    }, 
      (err, res, body) => {
        console.log(err);
        console.log(`Status=${res.statusCode}`);
      if(err){
        output({error: err});
      }else{
        output(null, JSON.parse(body));
      }
    });
  }

}
