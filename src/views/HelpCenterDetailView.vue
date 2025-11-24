<!-- src/views/HelpCenterDetailView.vue -->
<template>
  <div class="space-y-6">
    <div class="flex items-center justify-between">
      <div>
        <p class="text-xs font-semibold uppercase tracking-[0.18em] text-slate-500">
          Help Center
        </p>
        <h1 class="mt-1 text-xl font-semibold text-slate-900">
          {{ topic ? topic.title : "找不到主題" }}
        </h1>
        <p v-if="topic" class="mt-1 text-sm text-slate-500">
          {{ topic.summary }}
        </p>
      </div>

      <button
        type="button"
        class="inline-flex items-center rounded-full bg-slate-100 px-4 py-2 text-xs font-semibold text-slate-700 hover:bg-slate-200"
        @click="goBack"
      >
        <ArrowLeftIcon class="mr-1.5 h-4 w-4" />
        返回列表
      </button>
    </div>

    <div class="inline-flex rounded-full bg-slate-100 p-1">
      <button
        type="button"
        class="rounded-full px-4 py-1.5 text-xs font-semibold"
        :class="
          activeTab === 'preview'
            ? 'bg-slate-900 text-white shadow-sm'
            : 'text-slate-600 hover:bg-white'
        "
        @click="activeTab = 'preview'"
      >
        <EyeIcon class="mr-1.5 inline-block h-4 w-4" />
        預覽
      </button>
      <button
        type="button"
        class="rounded-full px-4 py-1.5 text-xs font-semibold"
        :class="
          activeTab === 'editor'
            ? 'bg-slate-900 text-white shadow-sm'
            : 'text-slate-600 hover:bg-white'
        "
        @click="activeTab = 'editor'"
      >
        <PencilSquareIcon class="mr-1.5 inline-block h-4 w-4" />
        編輯
      </button>
    </div>

    <div
      v-if="topic && activeTab === 'preview'"
      class="rounded-3xl bg-white p-6 shadow-sm ring-1 ring-slate-100"
    >
      <div
        class="help-content space-y-3 leading-relaxed text-slate-800"
        v-html="topic.content"
      ></div>
      <p class="mt-4 text-right text-xs text-slate-400">
        最後更新：{{ topic.updatedAt }}
      </p>
    </div>

    <div
      v-if="topic && activeTab === 'editor'"
      class="space-y-4 rounded-3xl bg-white p-6 shadow-sm ring-1 ring-slate-100"
    >
      <TinyEditor v-model="editorContent" />
      <div class="flex items-center justify-end gap-2">
        <button
          type="button"
          class="rounded-full px-4 py-1.5 text-xs font-semibold text-slate-600 hover:bg-slate-100"
          @click="resetContent"
        >
          還原目前內容
        </button>
        <button
          type="button"
          class="rounded-full bg-slate-900 px-5 py-1.5 text-xs font-semibold text-white hover:bg-slate-800"
          @click="handleSave"
        >
          儲存並套用到預覽
        </button>
      </div>
    </div>

    <div
      v-if="!topic"
      class="rounded-3xl bg-white p-6 text-sm text-slate-500 shadow-sm ring-1 ring-slate-100"
    >
      找不到對應的說明主題，請返回列表重新選擇。
    </div>
  </div>
</template>

<script setup>
import { ref, computed, watch } from "vue";
import { useRoute, useRouter } from "vue-router";
import TinyEditor from "@/utils/TinyEditor.vue";
import { useHelpCenterStore } from "@/stores/helpCenter";
import { ArrowLeftIcon, EyeIcon, PencilSquareIcon } from "@heroicons/vue/24/outline";

const route = useRoute();
const router = useRouter();
const helpCenterStore = useHelpCenterStore();

const activeTab = ref("preview");
const editorContent = ref("");

const topic = computed(() => helpCenterStore.getTopicById(route.params.id));

watch(
  topic,
  (newTopic) => {
    if (newTopic) {
      editorContent.value = newTopic.content || "";
    }
  },
  { immediate: true }
);

watch(
  () => activeTab.value,
  (newTab) => {
    if (newTab === "preview" && topic.value) {
      console.log("[HelpCenter Preview] id:", topic.value.id);
      console.log("[HelpCenter Preview] content:", topic.value.content);
    }
  }
);

const goBack = () => {
  router.push({ name: "help-center" });
};

const handleSave = () => {
  if (!topic.value) return;
  helpCenterStore.updateContent(topic.value.id, editorContent.value);
  activeTab.value = "preview";
};

const resetContent = () => {
  if (!topic.value) return;
  editorContent.value = topic.value.content || "";
};
</script>

<style>
.help-content {
  font-size: 0.9375rem; /* 約 15px，可自行調整 */
  line-height: 1.7;
}

/* 標題大小與間距 */
.help-content h1 {
  font-size: 1.25rem;
  font-weight: 700;
  margin-top: 1rem;
  margin-bottom: 0.5rem;
}

.help-content h2 {
  font-size: 1.125rem;
  font-weight: 700;
  margin-top: 0.9rem;
  margin-bottom: 0.4rem;
}

.help-content h3 {
  font-size: 1.05rem;
  font-weight: 600;
  margin-top: 0.8rem;
  margin-bottom: 0.35rem;
}

.help-content h4,
.help-content h5,
.help-content h6 {
  font-size: 1rem;
  font-weight: 600;
  margin-top: 0.6rem;
  margin-bottom: 0.3rem;
}

/* 段落 */
.help-content p {
  margin: 0 0 0.6rem;
}

/* 條列：補回 list-style，避免被 Tailwind 清掉 */
.help-content ul,
.help-content ol {
  margin: 0 0 0.6rem 1.25rem;
  padding-left: 1.25rem;
}

.help-content ul {
  list-style-type: disc;
}

.help-content ol {
  list-style-type: decimal;
}

.help-content li {
  margin-bottom: 0.25rem;
}
</style>
