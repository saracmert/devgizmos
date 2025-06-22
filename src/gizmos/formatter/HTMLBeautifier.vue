<script>
import loader from "@monaco-editor/loader";

function htmlBeautify(html) {
    let tab = "  ";
    let result = "";
    let indent = "";

    html.split(/>\s*</).forEach(function(element) {
        if (element.match(/^\/\w/)) indent = indent.substring(tab.length);
        result += indent + "<" + element + ">\n";
        if (element.match(/^<?\w[^>]*[^\/]$/) && !element.startsWith("input") && !element.startsWith("img"))
            indent += tab;
    });
    return result.trim();
}

export default {
    name: "HTMLBeautifier",
    async mounted() {
        loader.init().then((monaco) => {
            var editorConfig = {
                language: 'html',
                theme: 'vs-dark',
                wordWrap: 'on'
            }

            var editor1 = monaco.editor.create(document.getElementById("editor1"), editorConfig);
            var editor2 = monaco.editor.create(document.getElementById("editor2"), { ...editorConfig, readOnly: true });

            editor1.onDidChangeModelContent(function () {
                const input = editor1.getValue();
                try {
                    const beautified = htmlBeautify(input);
                    editor2.setValue(beautified);
                } catch {
                    editor2.setValue("Invalid HTML input");
                }
            });
        });
    }
};
</script>

<template>
    <div class="container-fluid p-0">
        <div class="row">
            <div class="col mb-3">
                <h1>HTML Beautifier</h1>
                <span>Beautify your HTML code.</span>
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