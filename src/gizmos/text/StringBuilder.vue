<script>
import loader from "@monaco-editor/loader";

export default {
    name: "Editor",
    async mounted() {
        loader.init().then((monaco) => {
            var editorConfig = {
                language: 'csharp',
                theme: 'vs-dark',
                wordWrap: 'on'
            }

            var editor1 = monaco.editor.create(document.getElementById("editor1"), editorConfig);
            var editor2 = monaco.editor.create(document.getElementById("editor2"), { ...editorConfig, readOnly: true });

            editor1.onDidChangeModelContent(function (e) {
                editor2.setValue(buildString(editor1.getValue()));
            });
        });

        function buildString(string) {
            var newLine = "\n";
            var result = "StringBuilder myString = new StringBuilder();" + newLine + newLine;
            var arrayOfLines = string.match(/[^\r\n]+/g);
            for (var i = 0; i < arrayOfLines.length; i++){
                result += "myString.AppendLine(\"" + arrayOfLines[i].replace(/"/g, '\\"') + "\");" + newLine;
            }
            result += newLine + "Console.WriteLine(myString.ToString());"
            return result;
        }
    }
};
</script>

<template>
    <div class="container-fluid p-0">
        <div class="row">
            <div class="col mb-3">
                <h1>String Builder</h1>
                <span>Automatic StringBuilder escaper code generation.</span>
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