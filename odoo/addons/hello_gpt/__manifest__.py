{
    'name': 'Hello GPT',
    'version': '1.0',
    'summary': 'A module to query GPT API for AI responses',
    'description': 'This module allows making AI queries using GPT API',
    'category': 'Productivity',
    'author': 'Ahmed Khan',
    'website': 'https://www.example.com',
    'license': 'LGPL-3',
    'depends': ['base', 'web'],
    'data': [
        'views/res_config_settings_views.xml',
        'views/menu.xml',
        'security/ir.model.access.csv',
    ],
    'assets': {
        'web.assets_backend': [
            'hello_gpt/static/src/js/hello_gpt.js',
            'hello_gpt/static/src/xml/hello_gpt_template.xml',
        ],
    },
    'demo': [],
    'installable': True,
    'auto_install': False,
    'application': True,
    'external_dependencies': {'python': ['openai']},
}