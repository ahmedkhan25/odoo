from odoo import http
from odoo.http import request
import openai
from openai import OpenAI

class HelloGPT(http.Controller):
    @http.route('/hello_gpt', auth='user')
    def hello_gpt(self):
        return request.render('hello_gpt.hello_gpt_template')

    @http.route('/hello_gpt/query', type='json', auth='user')
    def gpt_query(self, query):
        api_key = request.env['ir.config_parameter'].sudo().get_param('hello_gpt.openai_api_key')
        if not api_key:
            return {'error': 'OpenAI API key is not set'}
        else:
            client = OpenAI(
                api_key=api_key,
            )

        try:
            response = client.chat.completions.create(
                model="gpt-3.5-turbo",
                messages=[
                    {"role": "system", "content": "You are a helpful assistant."},
                    {"role": "user", "content": query}
                ]
            )
            gpt_response = response.choices[0].message.content

            # Save the query and response
            request.env['hello_gpt.query'].sudo().create({
                'name': query,
                'response': gpt_response
            })

            return {'response': gpt_response}
        except Exception as e:
            return {'error': str(e)}