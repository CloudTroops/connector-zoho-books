module.exports = {

  name: "listInvoices",

  title: "List Invoices",

  description: "",
  version: "v1",

  input: {
    title: "List Invoices",
    type: "object",
    properties: {
      organization_id: {
        title: 'organization_id', // displayed as field label  
        type: 'string',
        description: 'Enter Organization ID to fetch invoices',
        minLength: 1 // define as reqiured
      }
    }
  },

  output: {
    title: "output",
    type: "object",
    properties: {
      "code": {
        title: 'code', // displayed as field label  
        type: 'integer',
        description: 'code'
      },
      "message": {
        title: 'message', // displayed as field label  
        type: 'string',
        description: 'message'
      },
      "invoices": {
        title: 'invoices array',
        type: "array",
        items: {
          type: 'object',
          properties: {
            invoice_id: {
              title: 'invoice_id', // displayed as field label  
              type: 'string',
              description: 'message',
              minLength: 1
            },
            customer_name: {
              title: 'customer_name', // displayed as field label  
              type: 'string',
              description: 'customer_name',
              minLength: 1
            },
            customer_id: {
              title: 'customer_id', // displayed as field label  
              type: 'string',
              description: 'customer_name',
              minLength: 1
            },
            company_name: {
              title: 'company_name', // displayed as field label  
              type: 'string',
              description: 'company_name',
              minLength: 1
            },
            "status": {
              title: 'status', // displayed as field label  
              type: 'string',
              description: 'status',
              minLength: 1
            },
            invoice_number: {
              title: 'invoice_number', // displayed as field label  
              type: 'string',
              description: 'invoice_number',
              minLength: 1
            },
            reference_number: {
              title: 'reference_number', // displayed as field label  
              type: 'string',
              description: 'reference_number',
              minLength: 1
            },
            date: {
              title: 'date', // displayed as field label  
              type: 'string',
              description: 'date',
              minLength: 1
            },
            due_date: {
              title: 'due_date', // displayed as field label  
              type: 'string',
              description: 'due_date',
              minLength: 1
            },
            due_days: {
              title: 'due_days', // displayed as field label  
              type: 'string',
              description: 'due_days',
              minLength: 1
            },
            currency_code: {
              title: 'currency_code', // displayed as field label  
              type: 'string',
              description: 'currency_code',
              minLength: 1
            },
            currency_symbol: {
              title: 'currency_symbol', // displayed as field label  
              type: 'string',
              description: 'currency_symbol',
              minLength: 1
            },
            invoice_url: {
              title: 'invoice_url', // displayed as field label  
              type: 'string',
              description: 'invoice_url',
              minLength: 1
            },
            transaction_type: {
              title: 'transaction_type', // displayed as field label  
              type: 'string',
              description: 'transaction_type',
              minLength: 1
            },
            total: {
              title: 'total', // displayed as field label  
              type: 'integer',
              description: 'total',
              minLength: 1
            },
            balance: {
              title: 'balance', // displayed as field label  
              type: 'integer',
              description: 'balance',
              minLength: 1
            },
            created_time: {
              title: 'created_time', // displayed as field label  
              type: 'string',
              description: 'created_time',
              minLength: 1
            },
            last_modified_time: {
              title: 'last_modified_time', // displayed as field label  
              type: 'string',
              description: 'last_modified_time',
              minLength: 1
            },
            payment_expected_date: {
              title: 'payment_expected_date', // displayed as field label  
              type: 'string',
              description: 'payment_expected_date',
              minLength: 1
            },
            last_payment_date: {
              title: 'last_payment_date', // displayed as field label  
              type: 'string',
              description: 'last_payment_date',
              minLength: 1
            }
          }
        }

      }
    }
  },

  mock_input: {
    "organization_id": "60012922323"
  },

  execute: function (input, output) {
    // to access auth info use input.auth , eg: input.auth.username
    // and to return output use output callback like this output(null, { 'notice' : 'successful'})
    // your code here

    const request = require('request');

    const base = 'https://books.zoho.in/api/v3/invoices';
    const finalUrl = `${base}?organization_id=${input.organization_id}`;

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
          output({ error: err });
        } else {
          output(null, JSON.parse(body));
        }
      });
  }

}
