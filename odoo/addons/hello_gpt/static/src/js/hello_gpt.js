/** @odoo-module **/

import { registry } from "@web/core/registry";
import { Component, useState, useRef, onMounted } from "@odoo/owl";
import { useService } from "@web/core/utils/hooks";

class HelloGPTClientAction extends Component {
    setup() {
        this.state = useState({
            query: "",
            response: "",
            isGenerating: false
        });
        this.abortController = new AbortController();
        this.resultTextRef = useRef("resultText");
        this.rpc = useService("rpc");

        onMounted(() => {
            this.resultContainer = this.resultTextRef.el;
        });
    }

    async onSubmitQuery() {
        if (this.state.isGenerating) return;

        this.state.isGenerating = true;
        this.state.response = "";

        try {
            const response = await this.rpc('/hello_gpt/query', {
                query: this.state.query,
            });

            if (response.error) {
                this.state.response = "Error: " + response.error;
            } else {
                this.state.response = response.result;
            }
        } catch (error) {
            this.state.response = "Error: " + error.message;
        } finally {
            this.state.isGenerating = false;
        }
    }

    onStopGeneration() {
        // This method is not used in the current implementation
        // but can be used to cancel the request if needed
    }
}


HelloGPTClientAction.template = 'hello_gpt.ClientAction';

// Register the action
registry.category("actions").add("hello_gpt_client_action", HelloGPTClientAction);

export default HelloGPTClientAction;