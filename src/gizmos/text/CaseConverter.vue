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
            var selectedCase = Array.from(document.getElementsByName("caseOptions")).find(r => r.checked).value;
            switch (selectedCase) {
                case "lowercase":
                    return lowercase(string);
                case "uppercase":
                    return uppercase(string);
                case "camelcase":
                    return camelcase(string);
                case "capitalcase":
                    return capitalcase(string);
                case "constantcase":
                    return constantcase(string);
                case "dotcase":
                    return dotcase(string);
                case "paramcase":
                    return paramcase(string);
                case "pascalcase":
                    return pascalcase(string);
                case "pathcase":
                    return pathcase(string);
                case "snakecase":
                    return snakecase(string);
            }
        }

        function lowercase(string) {
            return string.toLowerCase();
        }

        function uppercase(string) {
            return string.toUpperCase();
        }

        function camelcase(string) {
            return string.replace(/(?:^\w|[A-Z]|\b\w|\s+)/g, function(match, index) {
                if (+match === 0) return "";
                return index === 0 ? match.toLowerCase() : match.toUpperCase();
            });
        }

        function capitalcase(string) {
            return string.toLowerCase().split(' ').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');
        }

        function constantcase (string) {
            return uppercase(string).replaceAll(" ", "_");
        }

        function dotcase (string) {
            return lowercase(string).replaceAll(" ", ".");
        }

        function paramcase (string) {
            return lowercase(string).replaceAll(" ", "-");
        }

        function pascalcase (string) {
            return capitalcase(string).replaceAll(" ", "");
        }

        function pathcase (string) {
            return lowercase(string).replaceAll(" ", "/");
        }

        function snakecase (string) {
            return lowercase(string).replaceAll(" ", "_");
        }
    }
};
</script>

<template>
    <div class="container-fluid p-0">
        <div class="row">
            <div class="col mb-3">
                <h1>Case Converter</h1>
                <span>You can use the Case Converter Gizmo to convert your texts to diffrent case formats.</span>
            </div>
        </div>
        <div class="row">
            <div class="col-12 mb-3">
                <div class="form-check form-check-inline">
                    <input class="form-check-input" type="radio" name="caseOptions" id="lowercase" value="lowercase" checked>
                    <label class="form-check-label" for="lowercase">lowercase</label>
                </div>

                <div class="form-check form-check-inline">
                    <input class="form-check-input" type="radio" name="caseOptions" id="uppercase" value="uppercase">
                    <label class="form-check-label" for="uppercase">UPPERCASE</label>
                </div>

                <div class="form-check form-check-inline">
                    <input class="form-check-input" type="radio" name="caseOptions" id="camelcase" value="camelcase">
                    <label class="form-check-label" for="camelcase">camelCase</label>
                </div>

                <div class="form-check form-check-inline">
                    <input class="form-check-input" type="radio" name="caseOptions" id="capitalcase" value="capitalcase">
                    <label class="form-check-label" for="capitalcase">Capital Case</label>
                </div>

                <div class="form-check form-check-inline">
                    <input class="form-check-input" type="radio" name="caseOptions" id="constantcase" value="constantcase">
                    <label class="form-check-label" for="constantcase">CONSTANT_CASE</label>
                </div>

                <div class="form-check form-check-inline">
                    <input class="form-check-input" type="radio" name="caseOptions" id="dotcase" value="dotcase">
                    <label class="form-check-label" for="dotcase">dot.case</label>
                </div>

                <div class="form-check form-check-inline">
                    <input class="form-check-input" type="radio" name="caseOptions" id="paramcase" value="paramcase">
                    <label class="form-check-label" for="paramcase">param-case</label>
                </div>

                <div class="form-check form-check-inline">
                    <input class="form-check-input" type="radio" name="caseOptions" id="pascalcase" value="pascalcase">
                    <label class="form-check-label" for="pascalcase">PascalCase</label>
                </div>

                <div class="form-check form-check-inline">
                    <input class="form-check-input" type="radio" name="caseOptions" id="pathcase" value="pathcase">
                    <label class="form-check-label" for="pathcase">path/case</label>
                </div>

                <div class="form-check form-check-inline">
                    <input class="form-check-input" type="radio" name="caseOptions" id="snakecase" value="snakecase">
                    <label class="form-check-label" for="snakecase">snake_case</label>
                </div>

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