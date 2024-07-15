/** @odoo-module **/
// Your code here
import { registry } from "@web/core/registry";
import { Component, useState, useRef, onMounted } from "@odoo/owl";
import { useService } from "@web/core/utils/hooks";
import { loadJS } from "@web/core/assets";



export class OwlTodoList extends Component {
    setup() {
        onWillStart(() => {
            loadJS('https://cdn.tailwindcss.com')
        })
    }
}


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
        const orignal_query = this.state.query;
        this.state.query = ""; // Clear the input
        this.state.response = "Generating...";

        try {
            const response = await this.rpc('/hello_gpt/query', {
                query: orignal_query,
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