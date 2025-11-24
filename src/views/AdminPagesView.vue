<!-- src/views/AdminPagesView.vue -->
<template>
  <section class="rounded-3xl bg-white p-5 shadow-sm">
    <ConfirmDialog />

    <Dialog
      v-model:visible="roleDialogVisible"
      modal
      :draggable="false"
      :style="{ width: '420px', maxWidth: '100%' }"
      :pt="dialogPt"
    >
      <template #header>
        <div class="flex items-center gap-3">
          <div
            class="flex h-9 w-9 items-center justify-center rounded-full bg-slate-900 text-white"
          >
            <UserGroupIcon class="h-4 w-4" />
          </div>
          <div class="min-w-0">
            <div
              class="text-[11px] font-semibold uppercase tracking-[0.16em] text-slate-400"
            >
              New Role
            </div>
            <div class="truncate text-sm font-semibold text-slate-900">
              建立新的角色模板
            </div>
          </div>
        </div>
      </template>

      <div class="space-y-4">
        <div class="flex flex-col gap-1.5">
          <div
            class="text-[11px] font-semibold uppercase tracking-[0.16em] text-slate-400"
          >
            Role name
          </div>
          <InputText
            v-model="newRoleForm.name"
            placeholder="例如：Store Manager"
            class="w-full text-sm"
          />
        </div>

        <div class="flex flex-col gap-1.5">
          <div
            class="text-[11px] font-semibold uppercase tracking-[0.16em] text-slate-400"
          >
            Description
          </div>
          <InputText
            v-model="newRoleForm.description"
            placeholder="簡短描述此角色的職責"
            class="w-full text-sm"
          />
        </div>

        <div class="flex flex-col gap-1.5">
          <div
            class="text-[11px] font-semibold uppercase tracking-[0.16em] text-slate-400"
          >
            Copy permissions from
          </div>
          <select
            v-model="newRoleForm.baseRoleId"
            class="h-9 w-full rounded-lg border border-slate-300 px-3 text-sm text-slate-700 outline-none focus:border-slate-500 focus:ring-0"
          >
            <option :value="null">不複製，使用預設權限</option>
            <option v-for="role in roles" :key="role.id" :value="role.id">
              {{ role.name }}
            </option>
          </select>
        </div>

        <div
          class="mt-1 flex items-center justify-between rounded-2xl bg-slate-50 px-4 py-3"
        >
          <div class="text-xs text-slate-600">
            新角色預設為啟用狀態，你可以之後再調整權限。
          </div>
          <InputSwitch v-model="newRoleForm.active" />
        </div>
      </div>

      <template #footer>
        <div class="flex w-full items-center justify-between">
          <button
            type="button"
            class="rounded-full px-4 py-1.5 text-sm font-medium text-slate-600 hover:bg-slate-100"
            @click="closeRoleDialog"
          >
            取消
          </button>
          <button
            type="button"
            class="inline-flex items-center rounded-full bg-slate-900 px-5 py-1.5 text-sm font-semibold text-white hover:bg-slate-800 disabled:cursor-not-allowed disabled:bg-slate-300"
            :disabled="!newRoleForm.name.trim()"
            @click="createRole"
          >
            <PlusIcon class="mr-1.5 h-4 w-4" />
            建立角色
          </button>
        </div>
      </template>
    </Dialog>

    <div class="mb-4 flex items-center justify-between">
      <div>
        <h2 class="text-lg font-semibold text-slate-900">ROLE & PERMISSIONS</h2>
        <p class="mt-1 text-base text-slate-500">管理系統角色、權限範圍與成員。</p>
      </div>
      <div class="flex items-center gap-2">
        <span
          class="inline-flex items-center rounded-full bg-slate-100 px-3 py-1 text-base font-medium text-slate-700"
        >
          <ShieldCheckIcon class="mr-1 h-3.5 w-3.5" />
          {{ rolesBadgeLabel }}
        </span>
        <button
          type="button"
          class="inline-flex items-center rounded-full bg-slate-900 px-4 py-1.5 text-base font-semibold text-white hover:bg-slate-800"
          @click="openRoleDialog"
        >
          <PlusIcon class="mr-1.5 h-3.5 w-3.5" />
          New Role
        </button>
      </div>
    </div>

    <div class="mt-2 flex gap-5">
      <div class="w-72 shrink-0">
        <div class="rounded-2xl border border-slate-100 bg-slate-50 p-3">
          <div class="flex items-center justify-between gap-2">
            <div class="text-sm font-semibold uppercase tracking-[0.16em] text-slate-400">
              Roles
            </div>
          </div>

          <div class="mt-2">
            <div class="text-sm font-semibold uppercase tracking-[0.16em] text-slate-400">
              Search
            </div>
            <div class="mt-1 relative">
              <InputText
                v-model="searchKeyword"
                placeholder="搜尋角色名稱"
                class="w-full pr-8 text-base"
              />
              <MagnifyingGlassIcon
                class="pointer-events-none absolute right-2 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-slate-400"
              />
            </div>
          </div>

          <div class="mt-3 space-y-1 min-h-[360px] overflow-y-auto">
            <button
              v-for="role in filteredRoles"
              :key="role.id"
              type="button"
              class="flex w-full items-center gap-3 rounded-2xl px-3 py-2 text-left text-base transition"
              :class="
                role.id === selectedRoleId
                  ? 'bg-white text-slate-900 shadow-sm ring-1 ring-slate-200'
                  : 'text-slate-600 hover:bg-white/70'
              "
              @click="selectRole(role.id)"
            >
              <Avatar
                :label="role.name.charAt(0)"
                shape="circle"
                class="h-7 w-7 bg-slate-900 text-base font-semibold text-white"
              />
              <div class="min-w-0 flex-1">
                <div class="truncate font-semibold">
                  {{ role.name }}
                </div>
                <div class="truncate text-sm text-slate-500">
                  {{ role.description }}
                </div>
              </div>
              <div class="flex flex-col items-end gap-1">
                <span
                  class="inline-flex items-center rounded-full bg-slate-100 px-2 py-0.5 text-xs font-medium text-slate-600"
                >
                  <UserGroupIcon class="mr-0.5 h-3 w-3" />
                  {{ role.userCount }} users
                </span>
                <span
                  v-if="role.builtIn"
                  class="inline-flex items-center rounded-full bg-slate-900 px-2 py-0.5 text-xs font-medium text-white"
                >
                  系統預設
                </span>
              </div>
            </button>

            <div
              v-if="!filteredRoles.length"
              class="flex items-center justify-center px-3 py-6 text-sm text-slate-400"
            >
              找不到符合條件的角色
            </div>
          </div>
        </div>
      </div>

      <div class="flex-1 min-w-0">
        <div v-if="selectedRole" class="space-y-4">
          <div
            class="flex flex-col gap-3 rounded-2xl border border-slate-100 bg-slate-50 px-4 py-3"
          >
            <div class="flex items-start justify-between gap-3">
              <div class="flex items-start gap-3">
                <div
                  class="flex h-10 w-10 items-center justify-center rounded-full bg-slate-900 text-white"
                >
                  <ShieldCheckIcon class="h-5 w-5" />
                </div>
                <div class="min-w-0">
                  <div class="flex items-center gap-2">
                    <input
                      v-model="selectedRole.name"
                      class="max-w-xs border-none bg-transparent p-0 text-lg font-semibold text-slate-900 outline-none focus:ring-0"
                    />
                    <span
                      v-if="selectedRole.builtIn"
                      class="inline-flex items-center rounded-full bg-slate-900 px-2 py-0.5 text-xs font-medium text-white"
                    >
                      系統預設角色
                    </span>
                  </div>
                  <input
                    v-model="selectedRole.description"
                    class="mt-1 w-full border-none bg-transparent p-0 text-base text-slate-500 outline-none focus:ring-0"
                  />
                  <div
                    class="mt-2 flex flex-wrap items-center gap-2 text-sm text-slate-500"
                  >
                    <span
                      class="inline-flex items-center rounded-full bg-slate-100 px-2 py-0.5"
                    >
                      <UserGroupIcon class="mr-1 h-3.5 w-3.5" />
                      綁定 {{ selectedRole.userCount }} 位使用者
                    </span>
                    <span class="inline-flex items-center gap-1">
                      <span
                        class="h-1.5 w-1.5 rounded-full"
                        :class="selectedRole.active ? 'bg-emerald-500' : 'bg-slate-400'"
                      ></span>
                      {{ selectedRole.active ? "啟用中" : "已停用" }}
                    </span>
                  </div>
                </div>
              </div>

              <div class="flex flex-col items-end gap-2">
                <div class="flex items-center gap-2">
                  <span
                    class="text-sm font-semibold uppercase tracking-[0.16em] text-slate-400"
                  >
                    Status
                  </span>
                  <InputSwitch v-model="selectedRole.active" />
                </div>
                <div class="flex items-center gap-2">
                  <button
                    type="button"
                    class="inline-flex items-center rounded-full bg-slate-100 px-3 py-1 text-sm font-semibold text-slate-700 hover:bg-slate-200"
                    @click="duplicateRole"
                  >
                    <ArrowPathIcon class="mr-1 h-3.5 w-3.5" />
                    Duplicate Role
                  </button>
                  <button
                    v-if="!selectedRole.builtIn"
                    type="button"
                    class="inline-flex items-center rounded-full bg-red-50 px-3 py-1 text-sm font-semibold text-red-600 hover:bg-red-100"
                    @click="deleteRole"
                  >
                    <TrashIcon class="mr-1 h-3.5 w-3.5" />
                    Delete
                  </button>
                </div>
              </div>
            </div>
          </div>

          <div class="space-y-3">
            <div
              v-for="group in permissionGroups"
              :key="group.key"
              class="rounded-2xl border border-slate-100 bg-slate-50/80 px-4 py-3"
            >
              <div class="mb-2 flex items-start justify-between gap-3">
                <div class="flex items-start gap-2">
                  <div
                    class="mt-0.5 flex h-8 w-8 items-center justify-center rounded-full bg-white shadow-sm"
                  >
                    <component :is="group.icon" class="h-4 w-4 text-slate-700" />
                  </div>
                  <div>
                    <div class="text-lg font-semibold text-slate-900">
                      {{ group.label }}
                    </div>
                    <div class="text-sm text-slate-500">
                      {{ group.description }}
                    </div>
                  </div>
                </div>
                <button
                  type="button"
                  class="text-sm font-medium text-slate-500 hover:text-slate-900"
                  @click="toggleGroupAll(group.key)"
                >
                  {{ isGroupAllEnabled(group.key) ? "全不選" : "全選" }}
                </button>
              </div>

              <div class="mt-2 space-y-2">
                <div
                  v-for="action in group.actions"
                  :key="action.key"
                  class="flex items-center justify-between gap-3 rounded-xl px-2 py-1.5 text-base hover:bg-white"
                >
                  <div class="flex flex-col">
                    <span class="font-medium text-slate-800">
                      {{ action.label }}
                    </span>
                    <span v-if="action.help" class="text-sm text-slate-500">
                      {{ action.help }}
                    </span>
                  </div>
                  <InputSwitch
                    v-model="selectedRole.permissions[group.key][action.key]"
                  />
                </div>
              </div>
            </div>
          </div>

          <div class="flex items-center justify-end">
            <button
              type="button"
              class="inline-flex items-center rounded-full bg-slate-900 px-5 py-1.5 text-base font-semibold text-white hover:bg-slate-800"
              @click="saveChanges"
            >
              <Cog6ToothIcon class="mr-1.5 h-4 w-4" />
              儲存變更
            </button>
          </div>
        </div>

        <div
          v-else
          class="flex h-full items-center justify-center text-lg text-slate-400"
        >
          請先從左側選擇一個角色。
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { ref, computed } from "vue";
import Avatar from "primevue/avatar";
import ConfirmDialog from "primevue/confirmdialog";
import Dialog from "primevue/dialog";
import InputText from "primevue/inputtext";
import InputSwitch from "primevue/inputswitch";
import { useConfirm } from "primevue/useconfirm";

import {
  ShieldCheckIcon,
  UserGroupIcon,
  PlusIcon,
  TrashIcon,
  ArrowPathIcon,
  Cog6ToothIcon,
  MagnifyingGlassIcon,
  ClipboardDocumentListIcon,
  ShoppingCartIcon,
  UsersIcon,
  WrenchScrewdriverIcon,
} from "@heroicons/vue/24/outline";

const confirm = useConfirm();

const dialogPt = {
  root: { class: "rounded-3xl" },
  header: { class: "border-b border-slate-100 px-6 py-4 bg-white rounded-t-3xl" },
  content: { class: "px-6 py-4 bg-slate-50/60" },
  footer: { class: "border-t border-slate-100 px-6 py-3 bg-white rounded-b-3xl" },
};

const createDefaultPermissions = (overrides = {}) => {
  const base = {
    dashboard: {
      view: true,
    },
    orders: {
      view: true,
      detail: true,
      edit: false,
      cancel: false,
      export: false,
    },
    users: {
      view: true,
      edit: false,
      disable: false,
      resetPassword: false,
    },
    settings: {
      view: false,
      manageRoles: false,
    },
  };
  const merged = { ...base, ...overrides };
  return JSON.parse(JSON.stringify(merged));
};

const roles = ref([
  {
    id: 1,
    name: "System Admin",
    description: "管理整個系統設定與權限。",
    builtIn: true,
    active: true,
    userCount: 3,
    permissions: createDefaultPermissions({
      orders: {
        view: true,
        detail: true,
        edit: true,
        cancel: true,
        export: true,
      },
      users: {
        view: true,
        edit: true,
        disable: true,
        resetPassword: true,
      },
      settings: {
        view: true,
        manageRoles: true,
      },
    }),
  },
  {
    id: 2,
    name: "Operations",
    description: "日常營運與訂單管理。",
    builtIn: false,
    active: true,
    userCount: 8,
    permissions: createDefaultPermissions({
      orders: {
        view: true,
        detail: true,
        edit: true,
        cancel: true,
        export: true,
      },
      users: {
        view: true,
        edit: false,
        disable: false,
        resetPassword: false,
      },
      settings: {
        view: false,
        manageRoles: false,
      },
    }),
  },
  {
    id: 3,
    name: "Support",
    description: "客服人員，用於查詢訂單與協助客戶。",
    builtIn: false,
    active: true,
    userCount: 5,
    permissions: createDefaultPermissions({
      orders: {
        view: true,
        detail: true,
        edit: false,
        cancel: false,
        export: false,
      },
      users: {
        view: true,
        edit: false,
        disable: false,
        resetPassword: false,
      },
    }),
  },
  {
    id: 4,
    name: "Finance",
    description: "負責核對金額、對帳與匯出報表。",
    builtIn: false,
    active: true,
    userCount: 4,
    permissions: createDefaultPermissions({
      orders: {
        view: true,
        detail: true,
        edit: false,
        cancel: false,
        export: true,
      },
      users: {
        view: false,
        edit: false,
        disable: false,
        resetPassword: false,
      },
      settings: {
        view: false,
        manageRoles: false,
      },
    }),
  },
  {
    id: 5,
    name: "Store Manager",
    description: "門市店長，可管理門市相關訂單與會員。",
    builtIn: false,
    active: true,
    userCount: 6,
    permissions: createDefaultPermissions({
      orders: {
        view: true,
        detail: true,
        edit: true,
        cancel: true,
        export: false,
      },
      users: {
        view: true,
        edit: true,
        disable: false,
        resetPassword: false,
      },
      settings: {
        view: true,
        manageRoles: false,
      },
    }),
  },
  {
    id: 6,
    name: "Marketing",
    description: "行銷人員，需查看訂單成效與儀表板。",
    builtIn: false,
    active: true,
    userCount: 3,
    permissions: createDefaultPermissions({
      orders: {
        view: true,
        detail: true,
        edit: false,
        cancel: false,
        export: false,
      },
      users: {
        view: false,
        edit: false,
        disable: false,
        resetPassword: false,
      },
      settings: {
        view: false,
        manageRoles: false,
      },
    }),
  },
  {
    id: 7,
    name: "Auditor",
    description: "稽核人員，只能唯讀查看資料與報表。",
    builtIn: true,
    active: true,
    userCount: 2,
    permissions: createDefaultPermissions({
      orders: {
        view: true,
        detail: true,
        edit: false,
        cancel: false,
        export: true,
      },
      users: {
        view: true,
        edit: false,
        disable: false,
        resetPassword: false,
      },
      settings: {
        view: true,
        manageRoles: false,
      },
    }),
  },
  {
    id: 8,
    name: "HR Manager",
    description: "人資主管，負責內部帳號與啟用/停用。",
    builtIn: false,
    active: true,
    userCount: 2,
    permissions: createDefaultPermissions({
      orders: {
        view: false,
        detail: false,
        edit: false,
        cancel: false,
        export: false,
      },
      users: {
        view: true,
        edit: true,
        disable: true,
        resetPassword: true,
      },
      settings: {
        view: false,
        manageRoles: false,
      },
    }),
  },
  {
    id: 9,
    name: "IT Admin",
    description: "技術管理者，協助設定系統與權限。",
    builtIn: false,
    active: true,
    userCount: 1,
    permissions: createDefaultPermissions({
      orders: {
        view: true,
        detail: true,
        edit: false,
        cancel: false,
        export: true,
      },
      users: {
        view: true,
        edit: true,
        disable: true,
        resetPassword: true,
      },
      settings: {
        view: true,
        manageRoles: true,
      },
    }),
  },
  {
    id: 10,
    name: "Guest Viewer",
    description: "僅供臨時訪客查看儀表板與部分資訊。",
    builtIn: false,
    active: true,
    userCount: 1,
    permissions: createDefaultPermissions({
      dashboard: {
        view: true,
      },
      orders: {
        view: false,
        detail: false,
        edit: false,
        cancel: false,
        export: false,
      },
      users: {
        view: false,
        edit: false,
        disable: false,
        resetPassword: false,
      },
      settings: {
        view: false,
        manageRoles: false,
      },
    }),
  },
]);

const permissionGroups = [
  {
    key: "dashboard",
    label: "儀表板 Dashboard",
    description: "查看系統總覽、即時指標與重要公告。",
    icon: ClipboardDocumentListIcon,
    actions: [
      {
        key: "view",
        label: "查看儀表板",
        help: "允許登入後進入儀表板頁面並查看摘要資訊。",
      },
    ],
  },
  {
    key: "orders",
    label: "訂單管理 Orders",
    description: "查詢與管理訂單狀態、金額與匯出。",
    icon: ShoppingCartIcon,
    actions: [
      {
        key: "view",
        label: "查看訂單列表",
        help: "可進入訂單列表畫面，看到所有訂單。",
      },
      {
        key: "detail",
        label: "查看訂單詳情",
        help: "可打開單筆訂單，查看內部明細與紀錄。",
      },
      {
        key: "edit",
        label: "編輯訂單內容",
        help: "可以修改收件資訊、備註等欄位。",
      },
      {
        key: "cancel",
        label: "取消訂單",
        help: "可以將訂單標記為取消，並觸發相關流程。",
      },
      {
        key: "export",
        label: "匯出訂單報表",
        help: "允許匯出 CSV / Excel 等訂單報表。",
      },
    ],
  },
  {
    key: "users",
    label: "會員管理 Users",
    description: "管理會員資料、狀態與重設密碼。",
    icon: UsersIcon,
    actions: [
      {
        key: "view",
        label: "查看會員資料",
        help: "可搜尋與查看會員列表與基本資料。",
      },
      {
        key: "edit",
        label: "編輯會員資料",
        help: "可以修改會員的基本資訊與備註。",
      },
      {
        key: "disable",
        label: "停用會員",
        help: "可以封鎖或停用會員帳號。",
      },
      {
        key: "resetPassword",
        label: "重設會員密碼",
        help: "可以為會員重設登入密碼。",
      },
    ],
  },
  {
    key: "settings",
    label: "系統設定 Settings",
    description: "調整系統層級的全域設定與角色權限。",
    icon: WrenchScrewdriverIcon,
    actions: [
      {
        key: "view",
        label: "查看系統設定",
        help: "可以進入設定頁，但不一定能編輯。",
      },
      {
        key: "manageRoles",
        label: "管理角色與權限",
        help: "可以新增角色、調整權限與刪除角色。",
      },
    ],
  },
];

const searchKeyword = ref("");
const selectedRoleId = ref(roles.value[0]?.id || null);

const roleDialogVisible = ref(false);
const nextRoleId = ref(roles.value.length + 1);

const newRoleForm = ref({
  name: "",
  description: "",
  baseRoleId: null,
  active: true,
});

const rolesBadgeLabel = computed(() => {
  const total = roles.value.length;
  const active = roles.value.filter((r) => r.active).length;
  return `${active} / ${total} ROLES ACTIVE`;
});

const filteredRoles = computed(() => {
  const keyword = searchKeyword.value.trim().toLowerCase();
  if (!keyword) return roles.value;
  return roles.value.filter((role) => role.name.toLowerCase().includes(keyword));
});

const selectedRole = computed(
  () => roles.value.find((r) => r.id === selectedRoleId.value) || null
);

const selectRole = (id) => {
  selectedRoleId.value = id;
};

const openRoleDialog = () => {
  newRoleForm.value = {
    name: "",
    description: "",
    baseRoleId: null,
    active: true,
  };
  roleDialogVisible.value = true;
};

const closeRoleDialog = () => {
  roleDialogVisible.value = false;
};

const createRole = () => {
  const form = newRoleForm.value;
  let permissions = null;

  if (form.baseRoleId) {
    const base = roles.value.find((r) => r.id === form.baseRoleId);
    if (base) {
      permissions = JSON.parse(JSON.stringify(base.permissions));
    }
  }

  if (!permissions) {
    permissions = createDefaultPermissions();
  }

  const newRole = {
    id: nextRoleId.value++,
    name: form.name.trim(),
    description: form.description.trim() || "自訂角色。",
    builtIn: false,
    active: form.active,
    userCount: 0,
    permissions,
  };

  roles.value.push(newRole);
  selectedRoleId.value = newRole.id;
  roleDialogVisible.value = false;
};

const isGroupAllEnabled = (groupKey) => {
  if (!selectedRole.value) return false;
  const perms = selectedRole.value.permissions[groupKey];
  if (!perms) return false;
  const values = Object.values(perms);
  if (!values.length) return false;
  return values.every((v) => v === true);
};

const toggleGroupAll = (groupKey) => {
  if (!selectedRole.value) return;
  const perms = selectedRole.value.permissions[groupKey];
  if (!perms) return;
  const allEnabled = isGroupAllEnabled(groupKey);
  Object.keys(perms).forEach((key) => {
    perms[key] = !allEnabled;
  });
};

const duplicateRole = () => {
  if (!selectedRole.value) return;
  const base = selectedRole.value;
  const copy = {
    id: nextRoleId.value++,
    name: base.name + " Copy",
    description: base.description,
    builtIn: false,
    active: base.active,
    userCount: 0,
    permissions: JSON.parse(JSON.stringify(base.permissions)),
  };
  roles.value.push(copy);
  selectedRoleId.value = copy.id;
};

const deleteRole = () => {
  if (!selectedRole.value) return;
  const role = selectedRole.value;

  confirm.require({
    header: "Delete Role",
    message: `確定要刪除角色「${role.name}」嗎？。`,
    icon: "pi pi-exclamation-triangle",
    rejectLabel: "取消",
    acceptLabel: "刪除",
    acceptClass: "p-button-danger",
    accept: () => {
      roles.value = roles.value.filter((r) => r.id !== role.id);
      if (roles.value.length) {
        selectedRoleId.value = roles.value[0].id;
      } else {
        selectedRoleId.value = null;
      }
    },
  });
};

const saveChanges = () => {
  if (!selectedRole.value) return;

  confirm.require({
    header: "儲存變更",
    message: `已套用對角色「${selectedRole.value.name}」的權限調整。`,
    icon: "pi pi-check-circle",
    acceptLabel: "OK",
    rejectClass: "hidden",
    accept: () => {},
  });
};
</script>
