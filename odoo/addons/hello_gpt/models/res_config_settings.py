from odoo import api, fields, models

class ResConfigSettings(models.TransientModel):
    _inherit = 'res.config.settings'

    openai_api_key = fields.Char(string="OpenAI API Key", config_parameter='hello_gpt.openai_api_key')