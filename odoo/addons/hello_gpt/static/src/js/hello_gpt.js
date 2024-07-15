/** @odoo-module **/

import { registry } from "@web/core/registry";
import { Component } from "@odoo/owl";

class HelloGPTClientAction extends Component {
    setup() {
        this.state = {
            query: "",
            response: "",
        };
    }

    async onSubmitQuery() {
        const result = await this.env.services.rpc(
            '/hello_gpt/query',
            {
                query: this.state.query,
            }
        );
        if (result.error) {
            this.state.response = `Error: ${result.error}`;
        } else {
            this.state.response = result.response;
        }
        this.render();
    }
}

HelloGPTClientAction.template = 'hello_gpt.ClientAction';

registry.category("actions").add("hello_gpt_client_action", HelloGPTClientAction);

export default HelloGPTClientAction;