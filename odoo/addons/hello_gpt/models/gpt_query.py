from odoo import models, fields

class GPTQuery(models.Model):
    _name = 'hello_gpt.query'
    _description = 'GPT Query'

    name = fields.Char(string='Query', required=True)
    response = fields.Text(string='Response')