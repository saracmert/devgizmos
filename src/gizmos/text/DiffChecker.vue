<script>
import loader from "@monaco-editor/loader";

export default {
    name: "Editor",
    async mounted() {
        loader.init().then((monaco) => {
            var editorConfig = {
                theme: 'vs-dark',
                wordWrap: 'on'
            }

            var editor1 = monaco.editor.create(document.getElementById("editor1"), editorConfig);
            var editor2 = monaco.editor.create(document.getElementById("editor2"), editorConfig);
            var editor3 = monaco.editor.createDiffEditor(document.getElementById('editor3'));

            editor1.onDidChangeModelContent(function (e) {                
                diffCheck()
            });

            editor2.onDidChangeModelContent(function (e) {                
                diffCheck()
            });

            function diffCheck() {
                editor3.setModel({
                    original: monaco.editor.createModel(editor1.getValue(), "plaintext"),
                    modified: monaco.editor.createModel(editor2.getValue(), "plaintext"),
                });
            }
        });
        window.addEventListener("resize", this.resize);
    },
    async unmounted() {
      window.removeEventListener("resize", this.resize);
    },
    methods: {
      resize(e) {
        var editors = monaco.editor.getEditors();
        for (var i = 0; i < editors.length; i++) {
            editors[i].layout();
        }
      }
    }
};
</script>

<template>
    <div class="container-fluid p-0">
        <div class="row">
            <div class="col mb-3">
                <h1>Diff Checker</h1>
            </div>
        </div>
        <div class="row justify-content-center h-100">
            <div class="col-6 pe-0 pt-0 pb-0">
                <h3>Original Code</h3>
                <div id="editor1" class="editor-30 w-100"></div>
            </div>
            <div class="col-6 ps-0 pt-0 pb-0">
                <h3>Modified Code</h3>
                <div id="editor2" class="editor-30 w-100"></div>
            </div>
            <div class="col-12 pt-0 pb-0 mt-3">
                <div id="editor3" class="editor-70 w-100"></div>
            </div>
        </div>
    </div>
</template>
