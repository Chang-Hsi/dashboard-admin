<!-- src/views/SettingsView.vue -->
<template>
  <section class="rounded-3xl bg-white p-5 shadow-sm">
    <div class="mb-4 flex items-center justify-between">
      <div>
        <h2 class="text-base font-semibold text-slate-900">NOTIFICATION SETTINGS</h2>
        <p class="mt-1 text-sm text-slate-500">管理系統通知事件、通道與通知對象</p>
      </div>
      <div class="flex items-center gap-2 text-sm text-slate-500">
        <span
          class="inline-flex items-center rounded-full bg-slate-100 px-3 py-1 font-medium text-slate-700"
        >
          <BellAlertIcon class="mr-1 h-3.5 w-3.5" />
          {{ totalRulesLabel }}
        </span>
      </div>
    </div>

    <div class="overflow-x-auto">
      <table class="min-w-full text-left text-base">
        <thead>
          <tr
            class="border-b border-slate-100 text-sm font-semibold uppercase tracking-[0.16em] text-slate-400"
          >
            <th class="px-3 py-2">Event</th>
            <th class="px-3 py-2">Web</th>
            <th class="px-3 py-2">App Push</th>
            <th class="px-3 py-2">Email</th>
            <th class="px-3 py-2">Recipients</th>
            <th class="px-3 py-2"></th>
          </tr>
        </thead>
        <tbody>
          <tr
            v-for="rule in notificationSettings"
            :key="rule.id"
            class="border-b border-slate-100 last:border-0 hover:bg-slate-50/40"
          >
            <td class="px-3 py-3 align-middle">
              <div class="flex items-start gap-3">
                <div
                  class="mt-0.5 flex h-9 w-9 items-center justify-center rounded-full bg-slate-100"
                >
                  <component :is="rule.icon" class="h-5 w-5 text-blue-500" />
                </div>
                <div>
                  <div class="text-base font-semibold text-slate-900">
                    {{ rule.name }}
                  </div>
                  <div class="mt-0.5 text-sm text-slate-500">
                    {{ rule.description }}
                  </div>
                </div>
              </div>
            </td>

            <td class="px-3 py-3 align-middle">
              <div class="flex items-center gap-2">
                <InputSwitch v-model="rule.channels.web" />
              </div>
            </td>

            <td class="px-3 py-3 align-middle">
              <div class="flex items-center gap-2 justify-center">
                <InputSwitch v-model="rule.channels.push" />
              </div>
            </td>

            <td class="px-3 py-3 align-middle">
              <div class="flex items-center gap-2">
                <InputSwitch v-model="rule.channels.email" />
              </div>
            </td>

            <td class="px-3 py-3 align-middle">
              <span
                :class="
                  rule.recipients.roles.length || rule.recipients.emails.length
                    ? 'text-sm text-slate-700'
                    : 'text-sm italic text-slate-400'
                "
              >
                {{ getRecipientsSummary(rule) }}
              </span>
            </td>

            <td class="px-3 py-3 align-middle">
              <div class="flex items-center justify-end gap-2">
                <button
                  type="button"
                  class="inline-flex items-center rounded-full bg-slate-100 px-3 py-1 text-sm font-semibold text-slate-700 hover:bg-slate-200"
                  @click="openRecipientsDialog(rule)"
                >
                  <Cog6ToothIcon class="mr-1 h-4 w-4" />
                  設定
                </button>
              </div>
            </td>
          </tr>
        </tbody>
      </table>
    </div>

    <Dialog
      v-model:visible="dialogVisible"
      :modal="true"
      :draggable="false"
      :closable="false"
      :style="{ width: '480px' }"
      class="rounded-3xl"
    >
      <template #header>
        <div class="flex w-full items-center justify-between">
          <div class="flex items-center gap-3">
            <div
              class="flex h-9 w-9 items-center justify-center rounded-full bg-slate-100"
            >
              <component
                v-if="activeNotification"
                :is="activeNotification.icon"
                class="h-5 w-5 text-blue-500"
              />
            </div>
            <div>
              <div class="text-base font-semibold text-slate-900">通知對象設定</div>
              <div v-if="activeNotification" class="text-sm text-slate-500">
                {{ activeNotification.name }}
              </div>
            </div>
          </div>
          <button
            type="button"
            class="rounded-full p-1 text-slate-400 hover:bg-slate-100 hover:text-slate-700"
            @click="closeDialog"
          >
            <XMarkIcon class="h-4 w-4" />
          </button>
        </div>
      </template>

      <div v-if="activeNotification" class="space-y-5">
        <div class="rounded-2xl bg-slate-50 px-4 py-3">
          <div
            class="mb-2 flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.18em] text-slate-500"
          >
            <GlobeAltIcon class="h-4 w-4" />
            <span>通知通道</span>
          </div>

          <div class="flex flex-col gap-3">
            <div class="flex items-center justify-between gap-4">
              <div class="flex items-center gap-2">
                <GlobeAltIcon class="h-4 w-4 text-slate-500" />
                <div>
                  <div class="text-sm font-medium text-slate-800">Web 通知</div>
                  <div class="text-xs text-slate-500">
                    顯示在系統右上角通知鈴鐺或通知列表。
                  </div>
                </div>
              </div>
              <InputSwitch v-model="activeNotification.channels.web" />
            </div>

            <div class="flex items-center justify-between gap-4">
              <div class="flex items-center gap-2">
                <DevicePhoneMobileIcon class="h-4 w-4 text-slate-500" />
                <div>
                  <div class="text-sm font-medium text-slate-800">App 推播</div>
                  <div class="text-xs text-slate-500">透過手機 App 的推播訊息提醒。</div>
                </div>
              </div>
              <InputSwitch v-model="activeNotification.channels.push" />
            </div>

            <div class="flex items-center justify-between gap-4">
              <div class="flex items-center gap-2">
                <EnvelopeIcon class="h-4 w-4 text-slate-500" />
                <div>
                  <div class="text-sm font-medium text-slate-800">Email 通知</div>
                  <div class="text-xs text-slate-500">寄送 Email 到指定的收件人。</div>
                </div>
              </div>
              <InputSwitch v-model="activeNotification.channels.email" />
            </div>
          </div>
        </div>

        <div class="rounded-2xl bg-slate-50 px-4 py-3">
          <div
            class="mb-2 flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.18em] text-slate-500"
          >
            <UserGroupIcon class="h-4 w-4" />
            <span>通知角色</span>
          </div>
          <div class="flex flex-wrap gap-3">
            <label
              v-for="role in availableRoles"
              :key="role.id"
              class="flex items-center gap-2 rounded-full border border-slate-200 px-3 py-1.5 text-sm text-slate-700 hover:border-slate-400"
            >
              <input
                v-model="activeNotification.recipients.roles"
                type="checkbox"
                class="h-3.5 w-3.5 rounded border-slate-300 text-blue-600 focus:ring-blue-500"
                :value="role.id"
              />
              <span>{{ role.label }}</span>
            </label>
          </div>
        </div>

        <div class="rounded-2xl bg-slate-50 px-4 py-3">
          <div
            class="mb-2 flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.18em] text-slate-500"
          >
            <EnvelopeOpenIcon class="h-4 w-4" />
            <span>額外 Email</span>
          </div>
          <div class="flex flex-col gap-2">
            <div class="flex items-center gap-2">
              <input
                v-model="newEmail"
                type="email"
                placeholder="輸入 Email 後按 Enter 或點新增"
                class="h-9 flex-1 rounded-full border border-slate-200 px-3 text-sm text-slate-700 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                @keyup.enter.prevent="addEmail"
              />
              <button
                type="button"
                class="inline-flex items-center rounded-full bg-slate-900 px-3 py-1.5 text-sm font-semibold text-white hover:bg-slate-800 disabled:bg-slate-300"
                :disabled="!newEmail.trim()"
                @click="addEmail"
              >
                <PlusIcon class="mr-1 h-3.5 w-3.5" />
                新增
              </button>
            </div>

            <div
              v-if="activeNotification.recipients.emails.length"
              class="mt-1 flex flex-wrap gap-2"
            >
              <span
                v-for="email in activeNotification.recipients.emails"
                :key="email"
                class="inline-flex items-center gap-1 rounded-full bg-white px-3 py-1 text-sm text-slate-700 shadow-sm ring-1 ring-slate-200"
              >
                <EnvelopeIcon class="h-3.5 w-3.5" />
                <span>{{ email }}</span>
                <button
                  type="button"
                  class="ml-1 text-slate-400 hover:text-slate-700"
                  @click="removeEmail(email)"
                >
                  <XMarkIcon class="h-3 w-3" />
                </button>
              </span>
            </div>
            <p v-else class="mt-1 text-xs text-slate-400">
              若未設定額外 Email，系統只會依照上方角色發送通知。
            </p>
          </div>
        </div>
      </div>

      <template #footer>
        <div class="flex w-full items-center justify-between">
          <button
            type="button"
            class="inline-flex items-center rounded-full px-4 py-1.5 text-sm font-medium text-slate-500 hover:bg-slate-100"
            @click="closeDialog"
          >
            取消
          </button>
          <button
            type="button"
            class="inline-flex items-center rounded-full bg-slate-900 px-5 py-1.5 text-sm font-semibold text-white hover:bg-slate-800"
            @click="saveDialog"
          >
            儲存設定
          </button>
        </div>
      </template>
    </Dialog>
  </section>
</template>

<script setup>
import { ref, computed } from "vue";
import Dialog from "primevue/dialog";
import InputSwitch from "primevue/inputswitch";
import {
  BellAlertIcon,
  ChatBubbleLeftRightIcon,
  ExclamationTriangleIcon,
  EnvelopeIcon,
  EnvelopeOpenIcon,
  Cog6ToothIcon,
  XMarkIcon,
  GlobeAltIcon,
  DevicePhoneMobileIcon,
  UserGroupIcon,
  PlusIcon,
} from "@heroicons/vue/24/outline";

// 可調整：系統角色列表
const availableRoles = [
  { id: "admin", label: "管理員" },
  { id: "manager", label: "經理" },
  { id: "support", label: "客服" },
  { id: "sales", label: "業務" },
];

// 通知事件假資料（之後可以對接 API）
const notificationSettings = ref([
  {
    id: 1,
    key: "order.created",
    name: "新訂單建立",
    description: "當客戶送出新訂單時通知相關人員。",
    icon: BellAlertIcon,
    category: "訂單",
    channels: {
      web: true,
      push: true,
      email: true,
    },
    recipients: {
      roles: ["admin", "sales"],
      emails: ["boss@company.com"],
    },
  },
  {
    id: 2,
    key: "order.paid",
    name: "訂單付款完成",
    description: "付款完成後提醒財務與客服處理後續流程。",
    icon: ChatBubbleLeftRightIcon,
    category: "訂單",
    channels: {
      web: true,
      push: true,
      email: true,
    },
    recipients: {
      roles: ["admin", "support"],
      emails: [],
    },
  },
  {
    id: 3,
    key: "comment.new",
    name: "有新留言",
    description: "客戶在系統中留下新的留言或回覆時通知客服。",
    icon: EnvelopeIcon,
    category: "訊息",
    channels: {
      web: true,
      push: false,
      email: false,
    },
    recipients: {
      roles: ["support"],
      emails: [],
    },
  },
  {
    id: 4,
    key: "system.error",
    name: "系統錯誤",
    description: "當系統發生例外錯誤時立刻通知技術負責人。",
    icon: ExclamationTriangleIcon,
    category: "系統",
    channels: {
      web: false,
      push: true,
      email: true,
    },
    recipients: {
      roles: ["admin"],
      emails: ["devops@company.com"],
    },
  },
]);

const dialogVisible = ref(false);
const activeNotification = ref(null);
const newEmail = ref("");

const totalRulesLabel = computed(() => `${notificationSettings.value.length} 個通知事件`);

const getRoleLabel = (roleId) => {
  const role = availableRoles.find((r) => r.id === roleId);
  return role ? role.label : roleId;
};

const getRecipientsSummary = (rule) => {
  if (!rule || !rule.recipients) return "";
  const rolesText = rule.recipients.roles.length
    ? "角色：" + rule.recipients.roles.map(getRoleLabel).join("、")
    : "";
  const emailsText = rule.recipients.emails.length
    ? "Email：" + rule.recipients.emails.join("、")
    : "";
  if (!rolesText && !emailsText) return "尚未設定";
  if (rolesText && emailsText) return rolesText + "；" + emailsText;
  return rolesText || emailsText;
};

const openRecipientsDialog = (rule) => {
  const cloned = JSON.parse(JSON.stringify(rule));
  activeNotification.value = {
    ...cloned,
    icon: rule.icon, // 把元件重新塞回來
  };
  newEmail.value = "";
  dialogVisible.value = true;
};

const closeDialog = () => {
  dialogVisible.value = false;
  activeNotification.value = null;
  newEmail.value = "";
};

const saveDialog = () => {
  if (!activeNotification.value) return;
  const index = notificationSettings.value.findIndex(
    (r) => r.id === activeNotification.value.id
  );
  if (index !== -1) {
    notificationSettings.value[index] = {
      ...notificationSettings.value[index],
      channels: { ...activeNotification.value.channels },
      recipients: {
        roles: [...activeNotification.value.recipients.roles],
        emails: [...activeNotification.value.recipients.emails],
      },
    };
  }
  closeDialog();
};

const addEmail = () => {
  if (!activeNotification.value) return;
  const value = newEmail.value.trim();
  if (!value) return;
  if (!activeNotification.value.recipients.emails.includes(value)) {
    activeNotification.value.recipients.emails.push(value);
  }
  newEmail.value = "";
};

const removeEmail = (email) => {
  if (!activeNotification.value) return;
  activeNotification.value.recipients.emails = activeNotification.value.recipients.emails.filter(
    (e) => e !== email
  );
};
</script>
