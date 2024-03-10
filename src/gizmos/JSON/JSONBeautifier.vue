<script>
import loader from "@monaco-editor/loader";

export default {
    name: "Editor",
    async mounted() {
        loader.init().then((monaco) => {
            var editorConfig = {
                language: 'json',
                theme: 'vs-dark',
                wordWrap: 'on'
            }

            var editor1 = monaco.editor.create(document.getElementById("editor1"), editorConfig);
            var editor2 = monaco.editor.create(document.getElementById("editor2"), { ...editorConfig, readOnly: true });

            editor1.onDidChangeModelContent(function (e) {
                if (validateJSON(editor1.getValue())) {
                    var formattedJson = JSON.stringify(JSON.parse(editor1.getValue()), null, "\t");
                    editor2.setValue(formattedJson);
                } else {
                    editor2.setValue("Invalid JSON input");
                }
            });

            function validateJSON(json) {
                try {
                    JSON.parse(json);
                } catch (e) {
                    return false;
                }
                return true;
            }
        });
    }
};
</script>

<template>
    <div class="container-fluid p-0">
        <div class="row">
            <div class="col mb-3">
                <h1>JSON Beautifier</h1>
                <span>Beautify your JSON files.</span>
            </div>
        </div>
        <div class="row justify-content-center h-100">
            <div class="col-6">
                <div id="editor1" class="editor w-100"></div>
            </div>
            <div class="col-6">
                <div id="editor2" class="editor w-100"></div>
            </div>
        </div>
    </div>
</template>