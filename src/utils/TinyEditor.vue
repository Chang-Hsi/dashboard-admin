<!-- src/utils/TinyEditor.vue -->
<template>
  <Editor v-model="model" :init="init" :disabled="disabled" :tinymce="tinymce" />
</template>

<script setup>
import tinymce from "tinymce/tinymce";
import "@/plugins/tinymce";

import { computed } from "vue";
import Editor from "@tinymce/tinymce-vue";

const props = defineProps({
  modelValue: { type: String, default: "" },
  disabled: { type: Boolean, default: false },
});
const emit = defineEmits(["update:modelValue"]);

const model = computed({
  get: () => props.modelValue || "",
  set: (v) => emit("update:modelValue", v),
});

const disabled = computed(() => !!props.disabled);

const init = {
  license_key: "gpl",
  language: "zh_TW",

  // 不另外載外部 content.css，改用 content_style 自訂
  skin_url: false,
  content_css: false,

  min_height: 200,
  autoresize_min_height: 200,
  statusbar: false,
  resize: false,
  elementpath: false,

  plugins: "link lists table code image media autolink autoresize",
  autoresize_bottom_margin: 16,
  autoresize_on_init: true,

  menubar: false,
  branding: false,
  toolbar:
    "undo redo | blocks fontfamily fontsize | bold italic underline strikethrough forecolor backcolor | " +
    "alignleft aligncenter alignright alignjustify | bullist numlist outdent indent | link image media table | removeformat | code",

  quickbars_insert_toolbar: "",
  quickbars_selection_toolbar: "",

  // 這裡補上 h1~h6、段落、清單的基礎樣式
  content_style: `
    body{
      font-family:Arial,BlinkMacSystemFont,"Segoe UI",Roboto,"Noto Sans TC","Helvetica Neue",Arial;
      line-height:1.7;
      font-size:14px;
      color:#0f172a;
    }
    p{
      margin:0 0 0.75em;
    }
    h1{
      font-size:1.6em;
      font-weight:700;
      margin:1.2em 0 0.5em;
    }
    h2{
      font-size:1.4em;
      font-weight:700;
      margin:1.1em 0 0.5em;
    }
    h3{
      font-size:1.3em;
      font-weight:600;
      margin:1em 0 0.4em;
    }
    h4{
      font-size:1.2em;
      font-weight:600;
      margin:0.9em 0 0.35em;
    }
    h5{
      font-size:1.1em;
      font-weight:600;
      margin:0.8em 0 0.3em;
    }
    h6{
      font-size:1em;
      font-weight:600;
      margin:0.7em 0 0.25em;
    }
    ul,ol{
      margin:0 0 0.75em 1.5em;
      padding:0;
    }
    img{
      max-width:100%;
      height:auto;
    }
  `,
};
</script>
