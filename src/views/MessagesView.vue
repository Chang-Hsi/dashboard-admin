<!-- src/views/MessagesView.vue -->
<template>
  <div class="rounded-3xl bg-white px-6 py-2 shadow-sm">
    <div class="flex items-center justify-between border-b border-slate-100 pb-1">
      <h1 class="text-sm font-semibold text-slate-900">Messages</h1>
      <button
        class="inline-flex h-8 w-8 items-center justify-center rounded-full text-slate-400 hover:bg-slate-100"
      >
        <EllipsisHorizontalIcon class="h-5 w-5" />
      </button>
    </div>

    <div class="my-4 flex gap-6">
      <!-- 左側會話列表 -->
      <aside class="w-72 shrink-0">
        <ul class="space-y-3">
          <li v-for="c in conversations" :key="c.id">
            <button
              class="flex w-full items-center gap-3 rounded-3xl px-4 py-3 text-left transition"
              :class="
                c.id === selectedConversationId ? 'bg-blue-50' : 'hover:bg-slate-50'
              "
              @click="selectConversation(c.id)"
            >
              <Avatar :image="c.avatar" shape="circle" class="h-24 w-24" />
              <div class="min-w-0 flex-1">
                <div class="truncate text-sm font-semibold text-slate-900">
                  {{ c.name }}
                </div>
                <div class="mt-0.5 truncate text-xs text-slate-500">
                  {{ c.subtitle }}
                </div>
                <div class="mt-0.5 text-[11px] text-slate-400">
                  {{ c.time }}
                </div>
              </div>
              <span
                v-if="c.unreadCount"
                class="ml-2 inline-flex items-center justify-center rounded-full bg-blue-500 px-2.5 py-1 text-[11px] font-semibold text-white"
              >
                {{ c.unreadCount }}
              </span>
            </button>
          </li>
        </ul>
      </aside>

      <!-- 右側聊天室 -->
      <section class="flex-1 flex flex-col">
        <!-- 訊息區 -->
        <div
          ref="messagesContainer"
          class="relative max-h-[620px] flex-1 overflow-y-auto rounded-3xl bg-blue-50 px-10 py-8"
        >
          <div
            v-for="item in activeMessages"
            :key="item.id"
            class="mb-6 flex flex-col items-center"
          >
            <div
              class="mb-2 text-[11px] font-semibold uppercase tracking-[0.2em] text-slate-400"
            >
              {{ item.time }}
            </div>
            <div
              class="flex w-full items-center gap-3"
              :class="item.side === 'left' ? 'justify-start' : 'justify-end'"
            >
              <Avatar
                v-if="item.side === 'left'"
                :image="item.avatar"
                shape="circle"
                class="h-24 w-24"
              />
              <div
                class="max-w-[70%] rounded-full bg-white px-6 py-3 text-sm text-slate-700 shadow-sm"
              >
                {{ item.text }}
              </div>
              <Avatar
                v-if="item.side === 'right'"
                :image="item.avatar"
                shape="circle"
                class="h-24 w-24"
              />
            </div>
          </div>
        </div>

        <!-- 輸入區：模擬管理者回覆 -->
        <div class="mt-4 flex items-center gap-3">
          <input
            v-model="newMessageText"
            type="text"
            class="flex-1 rounded-full border border-slate-200 bg-white px-4 py-2 text-sm text-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-400"
            placeholder="Type a reply..."
            @keyup.enter="sendMessage"
          />
          <button
            class="inline-flex items-center justify-center rounded-full bg-blue-500 px-5 py-2 text-sm font-semibold text-white hover:bg-blue-600 disabled:opacity-40"
            :disabled="!newMessageText.trim()"
            @click="sendMessage"
          >
            Send
          </button>
        </div>
      </section>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, nextTick } from "vue";
import Avatar from "primevue/avatar";
import { EllipsisHorizontalIcon } from "@heroicons/vue/24/outline";

// 左側會話
const conversations = ref([
  {
    id: 1,
    name: "Jen Taylor",
    subtitle: "Lorem ipsum dolor sit amet…",
    time: "• 1 hr",
    avatar: "https://i.pravatar.cc/100?img=47",
    unreadCount: 3,
  },
  {
    id: 2,
    name: "Sarah Johnson",
    subtitle: "Lorem ipsum dolor sit amet…",
    time: "• 2 hrs",
    avatar: "https://i.pravatar.cc/100?img=48",
    unreadCount: 0,
  },
  {
    id: 3,
    name: "Liam Anderson",
    subtitle: "Lorem ipsum dolor sit amet…",
    time: "• 3 hrs",
    avatar: "https://i.pravatar.cc/100?img=49",
    unreadCount: 0,
  },
]);

// 管理者頭像（右側）
const adminAvatar = "https://i.pravatar.cc/100?img=32";

// 每個會話的訊息列表，改成 ref 方便動態 push
const messagesByConversation = ref({
  1: [
    {
      id: 1,
      time: "11:15 AM",
      side: "left",
      text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
      avatar: "https://i.pravatar.cc/100?img=47",
    },
    {
      id: 2,
      time: "12:31 PM",
      side: "right",
      text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
      avatar: adminAvatar,
    },
    {
      id: 3,
      time: "01:20 PM",
      side: "left",
      text: "In ut nunc sed mauris dapibus varius. Donec placerat ante non mi luctus.",
      avatar: "https://i.pravatar.cc/100?img=47",
    },
    {
      id: 4,
      time: "03:48 PM",
      side: "left",
      text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
      avatar: "https://i.pravatar.cc/100?img=47",
    },
    {
      id: 5,
      time: "04:09 PM",
      side: "right",
      text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
      avatar: adminAvatar,
    },
  ],
  2: [
    {
      id: 1,
      time: "09:22 AM",
      side: "left",
      text: "Hi Sarah, how is the design review going?",
      avatar: "https://i.pravatar.cc/100?img=48",
    },
    {
      id: 2,
      time: "09:35 AM",
      side: "right",
      text: "Pretty good! I will send you the files this afternoon.",
      avatar: adminAvatar,
    },
    {
      id: 3,
      time: "01:10 PM",
      side: "left",
      text: "Great, I will check them after the meeting.",
      avatar: "https://i.pravatar.cc/100?img=48",
    },
  ],
  3: [
    {
      id: 1,
      time: "10:02 AM",
      side: "right",
      text: "Hey Liam, can you review the new dashboard cards?",
      avatar: adminAvatar,
    },
    {
      id: 2,
      time: "10:18 AM",
      side: "left",
      text: "Sure, I will take a look in a few minutes.",
      avatar: "https://i.pravatar.cc/100?img=49",
    },
    {
      id: 3,
      time: "02:45 PM",
      side: "right",
      text: "Thanks! Let me know if you see anything to improve.",
      avatar: adminAvatar,
    },
  ],
});

const selectedConversationId = ref(conversations.value[0].id);
const newMessageText = ref("");
const messagesContainer = ref(null);

const activeMessages = computed(() => {
  return messagesByConversation.value[selectedConversationId.value] || [];
});

const selectConversation = (id) => {
  selectedConversationId.value = id;
  nextTick(() => scrollToBottom());
};

// 送出一則新的「管理者」訊息（只存在前端記憶體）
const sendMessage = () => {
  const text = newMessageText.value.trim();
  if (!text) return;

  const convId = selectedConversationId.value;

  if (!messagesByConversation.value[convId]) {
    messagesByConversation.value[convId] = [];
  }

  const list = messagesByConversation.value[convId];
  const newId = list.length ? list[list.length - 1].id + 1 : 1;

  const now = new Date();
  const time = formatTime(now);

  const newItem = {
    id: newId,
    time,
    side: "right",
    text,
    avatar: adminAvatar,
  };

  list.push(newItem);

  // 更新左側列表的最後一句與時間（純視覺效果）
  const conv = conversations.value.find((c) => c.id === convId);
  if (conv) {
    conv.subtitle = text;
    conv.time = "• just now";
    conv.unreadCount = 0;
  }

  newMessageText.value = "";

  nextTick(() => scrollToBottom());
};

// 簡單的時間格式（例如 03:25 PM）
const formatTime = (date) => {
  let hours = date.getHours();
  const minutes = String(date.getMinutes()).padStart(2, "0");
  const ampm = hours >= 12 ? "PM" : "AM";
  hours = hours % 12;
  if (hours === 0) hours = 12;
  const hh = String(hours).padStart(2, "0");
  return `${hh}:${minutes} ${ampm}`;
};

// 捲動到最底部，讓最新訊息可見
const scrollToBottom = () => {
  if (messagesContainer.value) {
    messagesContainer.value.scrollTop = messagesContainer.value.scrollHeight;
  }
};
</script>
