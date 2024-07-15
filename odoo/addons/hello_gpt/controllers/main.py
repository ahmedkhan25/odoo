from odoo import http
from odoo.http import request, Response
import openai
from openai import OpenAI
import json

class HelloGPT(http.Controller):

    @http.route('/hello_gpt/query', type='json', auth='user', csrf=False)
    def query(self, query):
        open_api_key = request.env['ir.config_parameter'].sudo().get_param('hello_gpt.openai_api_key')
        if not open_api_key:
            return {"error": "OpenAI API key is not set"}

        else:
            client = OpenAI(
                        # defaults to os.environ.get("OPENAI_API_KEY")
                        api_key =open_api_key
                        )

        try:
            response = client.chat.completions.create(
                model="gpt-3.5-turbo",
                messages=[
                    {"role": "system", "content": "You are a helpful assistant."},
                    {"role": "user", "content": query}
                ]
            )
            return {"result": response.choices[0].message.content}
        except Exception as e:
            return {"error": str(e)}
        

 