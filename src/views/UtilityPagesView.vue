<!-- src/views/UtilityPagesView.vue -->
<template>
  <div class="space-y-6">
    <section>
      <div class="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
        <div
          v-for="tech in stacks"
          :key="tech.id"
          class="flex flex-col rounded-3xl bg-white p-5 shadow-sm"
        >
          <div class="flex flex-col items-center">
            <Avatar
              :image="tech.avatar"
              shape="circle"
              size="xlarge"
              class="h-20 w-20 border-2 border-slate-100 shadow-md"
            />
            <div class="mt-3 text-center">
              <div class="text-sm font-semibold text-slate-900">
                {{ tech.name }}
              </div>
              <div class="mt-0.5 text-sm text-slate-500">
                {{ tech.title }}
              </div>
              <div class="mt-0.5 text-xs text-slate-400">
                {{ tech.subtitle }}
              </div>
            </div>
          </div>

          <div class="my-4 h-px bg-slate-100" />

          <div class="space-y-3">
            <div class="flex items-start gap-3">
              <div
                class="flex h-8 w-8 items-center justify-center rounded-full bg-blue-50 text-blue-600"
              >
                <GlobeAltIcon class="h-4 w-4" />
              </div>
              <div>
                <div
                  class="text-[11px] font-semibold uppercase tracking-[0.16em] text-slate-400"
                >
                  Website
                </div>
                <div class="text-sm text-slate-700 break-all">
                  {{ tech.website }}
                </div>
              </div>
            </div>

            <div class="flex items-start gap-3">
              <div
                class="flex h-8 w-8 items-center justify-center rounded-full bg-blue-50 text-blue-600"
              >
                <PhoneIcon class="h-4 w-4" />
              </div>
              <div>
                <div
                  class="text-[11px] font-semibold uppercase tracking-[0.16em] text-slate-400"
                >
                  Version
                </div>
                <div class="text-sm text-slate-700">
                  {{ tech.version }}
                </div>
              </div>
            </div>

            <div class="flex items-start gap-3">
              <div
                class="flex h-8 w-8 items-center justify-center rounded-full bg-blue-50 text-blue-600"
              >
                <EnvelopeIcon class="h-4 w-4" />
              </div>
              <div>
                <div
                  class="text-[11px] font-semibold uppercase tracking-[0.16em] text-slate-400"
                >
                  Category
                </div>
                <div class="text-sm text-slate-700">
                  {{ tech.category }}
                </div>
              </div>
            </div>

            <div class="flex items-start gap-3">
              <div
                class="flex h-8 w-8 items-center justify-center rounded-full bg-blue-50 text-blue-600"
              >
                <MapPinIcon class="h-4 w-4" />
              </div>
              <div>
                <div
                  class="text-[11px] font-semibold uppercase tracking-[0.16em] text-slate-400"
                >
                  Usage
                </div>
                <div class="text-sm text-slate-700">
                  {{ tech.usage }}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup>
import { ref } from "vue";
import Avatar from "primevue/avatar";
import {
  GlobeAltIcon,
  PhoneIcon,
  EnvelopeIcon,
  MapPinIcon,
} from "@heroicons/vue/24/outline";

/*
  圖片準備說明：

  請到網路上搜尋並下載對應技術的 LOGO 圖檔
  建議關鍵字（都找 PNG / SVG 透明背景）：

  - "Vue 3 logo"
  - "Vue Router logo"
  - "Pinia state management logo"
  - "PrimeVue logo"
  - "Tailwind CSS logo"
  - "Heroicons logo"
  - "TinyMCE logo"
  - "Animate.css logo"
  - "Vite logo"
  - "Vue Devtools logo"（可用 Vue logo 代替）

  然後放到：src/assets/tech/ 底下，檔名可依照下方 import。
*/

import vueCoreLogo from "/src/assets/img/tech/vue-core.png"; // Vue 3 + Router + Pinia
import primevueLogo from "@/assets/img/tech/primevue.png"; // PrimeVue
import tailwindLogo from "@/assets/img/tech/tailwind.png"; // Tailwind CSS
import heroiconsLogo from "@/assets/img/tech/heroicons.png"; // Heroicons
import tinymceLogo from "@/assets/img/tech/tinymce.png"; // TinyMCE
import animateLogo from "@/assets/img/tech/animatecss.png"; // Animate.css
import viteLogo from "@/assets/img/tech/vite.png"; // Vite
import devtoolsLogo from "@/assets/img/tech/vue-devtool.png"; // Vue Devtools / Vite Devtools

const stacks = ref([
  {
    id: 1,
    avatar: vueCoreLogo,
    name: "Vue 3 · Vue Router · Pinia",
    title: "應用核心框架與狀態管理",
    subtitle: "vue · vue-router · pinia",
    website: "https://vuejs.org / https://router.vuejs.org / https://pinia.vuejs.org",
    version: "vue ^3.5.22 · vue-router ^4.6.3 · pinia ^3.0.3",
    category: "SPA Framework · Routing · Global State",
    usage:
      "負責整個後台的頁面渲染、路由導覽與全域狀態管理，採用 Composition API 與 <script setup>。",
  },
  {
    id: 2,
    avatar: primevueLogo,
    name: "PrimeVue UI",
    title: "UI 元件庫與圖示",
    subtitle: "@primevue/themes · primevue · primeicons",
    website: "https://primevue.org",
    version: "primevue ^4.4.1 · primeicons ^7.0.0 · @primevue/themes ^4.4.1",
    category: "Design System · Data Table · Form Controls",
    usage:
      "提供 Dialog、Input、Avatar 等各種 UI 元件與主題樣式，搭配 tailwind 做細部排版與視覺調整。",
  },
  {
    id: 3,
    avatar: tailwindLogo,
    name: "Tailwind CSS",
    title: "樣式與版面排版",
    subtitle: "tailwindcss · @tailwindcss/vite",
    website: "https://tailwindcss.com",
    version: "tailwindcss ^4.1.17 · @tailwindcss/vite ^4.1.17",
    category: "Utility-first CSS · Layout · Spacing",
    usage:
      "使用原子化 class 控制間距、圓角、陰影與排版，和 PrimeVue 元件結合打造現在的卡片式後台風格。",
  },
  {
    id: 4,
    avatar: heroiconsLogo,
    name: "Heroicons",
    title: "介面圖標套件",
    subtitle: "@heroicons/vue",
    website: "https://heroicons.com",
    version: "@heroicons/vue ^2.2.0",
    category: "Outline & Solid Icons",
    usage: "在 Sidebar、按鈕、資訊卡中顯示一致風格的 SVG 圖示，強化介面識別度與可讀性。",
  },
  {
    id: 5,
    avatar: tinymceLogo,
    name: "TinyMCE Editor",
    title: "富文本編輯器",
    subtitle: "tinymce · @tinymce/tinymce-vue · tinymce-i18n",
    website: "https://www.tiny.cloud",
    version: "tinymce ^7.9.1 · @tinymce/tinymce-vue ^5.1.1 · tinymce-i18n ^25.10.6",
    category: "Rich Text Editor · WYSIWYG",
    usage:
      "用於後台的文字內容編輯頁（例如說明文件、說明欄位），支援多語系與工具列客製化。",
  },
  {
    id: 6,
    avatar: animateLogo,
    name: "Animate.css",
    title: "進場與互動動畫",
    subtitle: "animate.css",
    website: "https://animate.style",
    version: "animate.css ^4.1.1",
    category: "CSS Animations",
    usage: "用在卡片或區塊的淡入、滑入動畫，讓後台畫面在載入時更有動態感。",
  },
  {
    id: 7,
    avatar: viteLogo,
    name: "Vite · Vue Plugin",
    title: "建置與開發伺服器",
    subtitle: "vite · @vitejs/plugin-vue",
    website: "https://vitejs.dev",
    version: "vite ^7.1.11 · @vitejs/plugin-vue ^6.0.1",
    category: "Bundler · Dev Server",
    usage:
      "提供快速熱重載與打包能力，搭配 Vue 插件處理單檔元件，負責整個專案的開發與上線建置流程。",
  },
]);
</script>
