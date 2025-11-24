<template>
  <div class="mx-auto max-w-6xl px-4 py-6 space-y-6">
    <Dialog
      v-model:visible="detailDialogVisible"
      modal
      :draggable="false"
      :style="{ width: '660px', maxWidth: '100%' }"
      :pt="dialogPt"
    >
      <template #header>
        <div class="flex items-center gap-3">
          <Avatar
            v-if="selectedNotification"
            :image="selectedNotification.avatar"
            shape="circle"
            size="large"
            class="h-11 w-11 border border-slate-100 shadow-md object-cover"
          />
          <div class="min-w-0">
            <div class="text-xs font-semibold uppercase tracking-[0.16em] text-slate-400">
              {{ selectedNotification?.type === "system" ? "System" : "Message" }}
            </div>
            <div class="truncate text-sm font-semibold text-slate-900">
              {{ selectedNotification?.title }}
            </div>
            <div class="text-xs text-slate-500">
              {{ selectedNotification?.time }}
            </div>
          </div>
        </div>
      </template>

      <div v-if="selectedNotification" class="space-y-4">
        <div
          class="inline-flex items-center rounded-full bg-slate-100 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.16em] text-slate-500"
        >
          {{ selectedNotification.subtitle }}
        </div>

        <div class="rounded-3xl bg-white px-5 py-4 shadow-sm">
          <h3 class="text-base font-semibold text-slate-900">
            {{ selectedNotification.articleTitle }}
          </h3>
          <p class="mt-2 whitespace-pre-line text-base leading-relaxed text-slate-600">
            {{ selectedNotification.articleContent }}
          </p>
        </div>
      </div>

      <template #footer>
        <div class="flex w-full items-center justify-end">
          <button
            class="rounded-full px-5 py-1.5 text-xs font-semibold text-slate-700 hover:bg-slate-100"
            @click="detailDialogVisible = false"
          >
            Close
          </button>
        </div>
      </template>
    </Dialog>

    <section class="flex justify-center">
      <div class="inline-flex rounded-full bg-slate-100 p-1">
        <Button
          :label="'ALL'"
          icon="pi pi-filter"
          class="rounded-full px-6! py-2.5! text-xs! font-semibold!"
          :class="
            activeFilter === 'all'
              ? 'bg-blue-500 text-white shadow-md'
              : 'bg-transparent text-slate-600 hover:bg-slate-200/70'
          "
          @click="setFilter('all')"
        />
        <Button
          :label="'INBOX'"
          icon="pi pi-envelope"
          class="ml-2 rounded-full px-6! py-2.5! text-xs! font-semibold!"
          :class="
            activeFilter === 'inbox'
              ? 'bg-blue-500 text-white shadow-md'
              : 'bg-transparent text-slate-600 hover:bg-slate-200/70'
          "
          @click="setFilter('inbox')"
        />
        <div class="relative ml-2">
          <Button
            :label="'UNREAD'"
            icon="pi pi-inbox"
            class="rounded-full px-6! py-2.5! text-xs! font-semibold!"
            :class="
              activeFilter === 'unread'
                ? 'bg-blue-500 text-white shadow-md'
                : 'bg-transparent text-slate-600 hover:bg-slate-200/70'
            "
            @click="setFilter('unread')"
          />
          <span
            v-if="unreadCount > 0"
            class="absolute -right-1 -top-1 flex h-6 w-6 items-center justify-center rounded-full bg-[#0ea6e9] text-[12px] font-semibold text-white"
          >
            {{ unreadCount }}
          </span>
        </div>
      </div>
    </section>

    <section class="rounded-3xl bg-white shadow-sm">
      <div class="divide-y divide-slate-100">
        <div
          v-for="item in filteredNotifications"
          :key="item.id"
          class="flex cursor-pointer items-center justify-between px-6 py-4 transition hover:bg-slate-50"
          @click="openNotification(item)"
        >
          <div class="flex items-center gap-8">
            <Avatar
              :image="item.avatar"
              shape="circle"
              size="xlarge"
              class="h-11 w-11 border border-slate-100 shadow-sm object-cover"
            />
            <div>
              <div class="text-lg font-semibold text-slate-900">
                {{ item.title }}
              </div>
              <div class="text-sm text-slate-500">
                {{ item.subtitle }}
              </div>
            </div>
          </div>

          <div class="text-sm text-slate-400">
            {{ item.time }}
          </div>
        </div>

        <div
          v-if="activeFilter === 'unread' && filteredNotifications.length === 0"
          class="flex items-center justify-center py-10 px-4 bg-slate-100"
        >
          <img
            src="https://i.pinimg.com/736x/9e/ef/57/9eef57ccba6a063bf2c6c2c3eaf80c4b.jpg"
            alt="All caught up"
            class="h-64 rounded-3xl shadow-sm object-contain"
          />
        </div>
      </div>
    </section>
  </div>
</template>

<script setup>
import { ref, computed } from "vue";
import Button from "primevue/button";
import Avatar from "primevue/avatar";
import Dialog from "primevue/dialog";

const activeFilter = ref("all");

const notifications = ref([
  {
    id: 1,
    type: "system",
    title: "Sales Report",
    subtitle: "Document file is received",
    time: "30 mins ago",
    isRead: true,
    avatar: "https://i.pravatar.cc/80?img=55",
    articleTitle: "Monthly Sales Report Ready for Review",
    articleContent:
      "Hi team,\n\nThe sales report for the previous month has been generated and uploaded to the shared drive.\n\nPlease review the overall performance of each region before Friday's review meeting. If you find any anomalies or missing data, reply to this notification so we can investigate it together.",
  },
  {
    id: 2,
    type: "message",
    title: "John Doe",
    subtitle: "Sent you a message",
    time: "1 hr ago",
    isRead: false,
    avatar: "https://i.pravatar.cc/80?img=40",
    articleTitle: "Question about pricing for enterprise clients",
    articleContent:
      "Hello,\n\nI'm reaching out to ask about your pricing for enterprise clients. We are planning to onboard around 120 users across 3 departments and would like to know:\n\n1. Whether you provide volume discounts\n2. How billing works if we add more seats mid-cycle\n3. If there is any onboarding or training included\n\nPlease let me know when you have time to arrange a short call. Thank you.",
  },
  {
    id: 3,
    type: "system",
    title: "New Product",
    subtitle: "New product is received",
    time: "5 hrs ago",
    isRead: true,
    avatar: "https://i.pravatar.cc/80?img=41",
    articleTitle: "New product submission from marketing team",
    articleContent:
      "A new product record has been submitted by the marketing team.\n\nBasic details:\n- Category: SaaS / Analytics\n- Target launch: Q3\n- Status: Early proposal\n\nPlease log in to the admin system and complete the missing fields (target industries, pricing tiers, and responsible PM) before the next roadmap meeting.",
  },
  {
    id: 4,
    type: "message",
    title: "Ray Catcher",
    subtitle: "Sent you a message",
    time: "9 hrs ago",
    isRead: false,
    avatar: "https://i.pravatar.cc/80?img=42",
    articleTitle: "Request for feature demo",
    articleContent:
      "Hi,\n\nI saw the introduction of your dashboard feature and would like to book a quick demo.\n\nI'm especially interested in:\n- How the permission system works for different roles\n- Whether alerts can be customized per team\n- Export options for management reports\n\nCould you please share a few time slots this week? Looking forward to your reply.",
  },
  {
    id: 5,
    type: "system",
    title: "Team Project",
    subtitle: "Document file is received",
    time: "10 hrs ago",
    isRead: true,
    avatar: "https://i.pravatar.cc/80?img=43",
    articleTitle: "New project documents uploaded",
    articleContent:
      "Project documents for the new internal dashboard have been successfully uploaded.\n\nFolder includes:\n- Functional specification\n- UI wireframes\n- Initial timeline and milestones\n\nPlease confirm that you can access all files. If any document is missing or corrupted, reply under this thread.",
  },
  {
    id: 6,
    type: "message",
    title: "Jessica Doe",
    subtitle: "Sent you a message",
    time: "13 hrs ago",
    isRead: false,
    avatar: "https://i.pravatar.cc/80?img=44",
    articleTitle: "Support request: Unable to export CSV",
    articleContent:
      "Hello support team,\n\nWhen I try to export the latest report as CSV, the page keeps loading and eventually shows an error.\n\nSteps I took:\n1. Go to Reports → Activity\n2. Filter by this week\n3. Click “Export CSV”\n\nCould you help me check what might be going wrong? If you need screenshots or a recording, let me know and I’ll send them over.",
  },
]);

const detailDialogVisible = ref(false);
const selectedNotification = ref(null);

const dialogPt = {
  root: { class: "rounded-3xl" },
  header: {
    class: "rounded-t-3xl border-b border-slate-100 bg-white px-6 py-4 flex items-center",
  },
  content: { class: "bg-slate-50/70 px-6 py-4" },
  footer: { class: "rounded-b-3xl border-t border-slate-100 bg-white px-6 py-3" },
};

const setFilter = (key) => {
  activeFilter.value = key;
};

const unreadCount = computed(() => notifications.value.filter((n) => !n.isRead).length);

const filteredNotifications = computed(() => {
  if (activeFilter.value === "unread") {
    return notifications.value.filter((n) => !n.isRead);
  }
  if (activeFilter.value === "inbox") {
    return notifications.value.filter((n) => n.isRead);
  }
  return notifications.value;
});

const openNotification = (item) => {
  if (!item.isRead) {
    item.isRead = true;
  }
  selectedNotification.value = item;
  detailDialogVisible.value = true;
};
</script>
