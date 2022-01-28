module.exports = {

  name: "updateInvoice",

  title: "Update Invoice",

  description: "",
  version: "v1",

  input: {
    title: "Updateinvoice",
    type: "object",
    properties: {
      organization_id: {
        title: 'organization_id', // displayed as field label  
        type: 'string',
        description: 'Enter Organization ID to fetch invoices',
        minLength: 1 // define as reqiured
      },
      invoice_id: {
        title: 'invoice_id', // displayed as field label  
        type: 'string',
        description: 'Enter Invoice ID to get invoice',
        minLength: 1 // define as reqiured
      },
      invoice: {
        title: 'invoice', // displayed as field label  
        type: 'object',
        description: 'Invoice',
        properties: {
          customer_id: {
            title: 'customer_id', // displayed as field label  
            type: 'string',
            description: 'customer_name',
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
          currency_code: {
            title: 'currency_code', // displayed as field label  
            type: 'string',
            description: 'currency_code',
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
          payment_expected_date: {
            title: 'payment_expected_date', // displayed as field label  
            type: 'string',
            description: 'payment_expected_date',
            minLength: 1
          },
          line_items: {
            title: 'line_items', // displayed as field label  
            type: 'array',
            description: 'line_items of the invoice',
            items:
            {
              type: 'object',
              properties: {
                name: {
                  title: 'name', // displayed as field label  
                  type: 'string',
                  description: 'name',
                },
                description: {
                  title: 'description', // displayed as field label  
                  type: 'string',
                  description: 'description',
                },
                quantity: {
                  title: 'quantity', // displayed as field label  
                  type: 'number',
                  description: 'quantity',
                },
                rate: {
                  title: 'rate', // displayed as field label  
                  type: 'number',
                  description: 'rate',
                },
                discount_amount: {
                  title: 'discount_amount', // displayed as field label  
                  type: 'number',
                  description: 'discount_amount',
                },
                item_total: {
                  title: 'item_total', // displayed as field label  
                  type: 'number',
                  description: 'item_total',
                }
              }
            }

          }
        }
      }
    }
  },

  output: {
    title: "output",
    type: "object",
    properties: {

    }
  },

  mock_input: {},

  execute: function (input, output) {
    const request = require('request');

    const base = 'https://books.zoho.com/api/v3/invoices';
    const finalUrl = `${base}/${input.invoice_id}?organization_id=${input.organization_id}`;

    request({
      url: finalUrl,
      method: "PUT",
      headers: {
        "Authorization": `Zoho-oauthtoken ${input.auth.access_token}`,
        "Content-Type": "application/json",
        "Accept": "application/json"
      },
      json: input.invoice
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
