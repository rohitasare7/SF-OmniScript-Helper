<script setup>
import { ref, shallowRef } from 'vue';
import InputLabel from './components/InputLabel.vue';
import InputText from './components/InputText.vue';
import { getActionData } from './components/store/data';
//Editor
import { VueMonacoEditor } from '@guolao/vue-monaco-editor';

const editorRef = shallowRef();
const editorTheme = ref('vs');
const editorCodeLang = ref('json');

const OPTIONS = {
    automaticLayout: true,
    formatOnType: true,
    formatOnPaste: true,
    readOnly: false,
    renderValidationDecorations: false,
    scrollBeyondLastLine: false,
    verticalSliderSize: '10px',
    minimap: {
        enabled: false, // Disable minimap
    },
    fontSize: '12px',
    padding: {
        top: 20,
        bottom: 20,
    },
    scrollbar: {
        verticalScrollbarSize: 10,
    }
}

const handleMount = editor => (editorRef.value = editor);
// Editor ends

// format code
const formatCode = () => {
    jsonInput.value = JSON.stringify(JSON.parse(jsonInput.value), null, 4);
}


// Actual Formatting starts
const jsonInput = ref('');
const jsonOutput = ref('');
const actionType = ref('');
const actionName = ref('');
const actionElementLabel = ref('');

const beautifyJson = () => {
    try {
        // Parse the input JSON
        formatCode();
        const parsedJson = JSON.parse(jsonInput.value);
        // Extract the value from actions.params.params.input
        const rawJson = parsedJson?.actions[0]?.params?.params?.input;

        // Replace all \" with regular " or remove \
        const cleanedJson = rawJson.replace(/\\"/g, '"').replace(/\\/g, '');

        // Parse the cleaned JSON string and beautify it
        jsonOutput.value = JSON.stringify(JSON.parse(cleanedJson), null, 4);
        //Get Action Data
        const actionTypeStr = parsedJson?.actions[0]?.params?.params?.sClassName;
        actionName.value = parsedJson?.actions[0]?.params?.params?.sMethodName; // check this for diff things
        if (actionTypeStr) {
            const actionItem = getActionData(actionTypeStr);
            actionType.value = actionItem.actionLabel;
            actionElementLabel.value = actionItem.elementLabel;
        }

    } catch (error) {
        jsonOutput.value = 'Invalid JSON or incorrect structure. Please check the input.';
    }
};

</script>

<template>

    <!-- Top Container Starts-->
    <div class="container mx-auto p-4">
        <h2
            class="items-center text-center my-8 md:my-6 text-xl font-semibold text-gray-900 dark:text-slate-50 md:text-5xl lg:text-3xl">
            OmniScript Input JSON Formatter</h2>

        <div v-if="actionType || actionName" class="flex gap-4">
            <div class="flex flex-col">
                <InputLabel value="You are calling : " class="mb-1" />
                <InputText :value="actionType" :readonly="true" :displayCopyBtn="false" />
            </div>

            <div class="flex flex-col">
                <InputLabel :value="actionElementLabel + ' Name : '" class="mb-1" />
                <InputText :value="actionName" :readonly="true" />
            </div>
        </div>



        <div class="flex flex-col lg:flex-row space-y-4 lg:space-y-0 lg:space-x-4 mt-4">
            <div class="w-full mr-3 lg:w-1/2">
                <InputLabel value="Input JSON" class="mt-2"></InputLabel>
                <VueMonacoEditor v-model:value="jsonInput" :theme="editorTheme" @mount="handleMount" height="600px"
                    :language="editorCodeLang" :options="OPTIONS"
                    class="rounded-lg overflow-hidden shadow-lg border mt-6" :style="'margin-top:10px'"
                    @change="beautifyJson" />
            </div>

            <div class="w-full mr-3 lg:w-1/2">
                <InputLabel value="Output JSON" class="mt-2"></InputLabel>
                <VueMonacoEditor v-model:value="jsonOutput" :theme="editorTheme" @mount="handleMount" height="600px"
                    :language="editorCodeLang" :options="OPTIONS"
                    class="rounded-lg overflow-hidden shadow-lg border mt-6" :style="'margin-top:10px'"
                    @change="beautifyJson" />
            </div>
        </div>




    </div>
    <!-- Top Container Ends-->



</template>