<!-- src/views/ResetPassword.vue -->
<template>
  <div class="space-y-6">
    <ConfirmDialog />

    <Dialog
      v-if="editingProject"
      v-model:visible="editDialogVisible"
      modal
      :draggable="false"
      :style="{ width: '480px', maxWidth: '100%' }"
      :pt="dialogPt"
    >
      <template #header>
        <div class="flex items-center gap-3">
          <div
            class="flex h-10 w-10 items-center justify-center rounded-full bg-slate-900 text-white"
          >
            <KeyIcon class="h-5 w-5" />
          </div>
          <div class="min-w-0">
            <div
              class="text-[11px] font-semibold uppercase tracking-[0.16em] text-slate-400"
            >
              Reset Password
            </div>
            <div class="truncate text-sm font-semibold text-slate-900">
              {{ editingProject.name }}
            </div>
            <div class="truncate text-xs text-slate-500">
              {{ editingProject.email }}
            </div>
          </div>
        </div>
      </template>

      <div class="space-y-5">
        <div class="rounded-2xl bg-slate-50 px-4 py-3">
          <div class="flex items-start gap-3">
            <div
              class="mt-0.5 flex h-8 w-8 items-center justify-center rounded-full bg-slate-900/5"
            >
              <ShieldCheckIcon class="h-4 w-4 text-slate-700" />
            </div>
            <div class="text-xs leading-relaxed text-slate-600">
              為使用者重設登入密碼。請先確認帳號身份，並輸入舊密碼與新密碼。
              此為示意操作，不會實際呼叫後端 API。
            </div>
          </div>
        </div>

        <div class="space-y-4">
          <div class="flex flex-col gap-1.5">
            <div
              class="text-[11px] font-semibold uppercase tracking-[0.16em] text-slate-400"
            >
              Account
            </div>
            <InputText
              v-model="account"
              placeholder="輸入帳號（Email 或使用者名稱）"
              class="w-full text-sm"
            />
          </div>

          <div class="flex flex-col gap-1.5">
            <div
              class="text-[11px] font-semibold uppercase tracking-[0.16em] text-slate-400"
            >
              Old Password
            </div>
            <InputText
              v-model="oldPassword"
              type="password"
              placeholder="輸入舊密碼"
              class="w-full text-sm"
            />
          </div>

          <div class="flex flex-col gap-1.5">
            <div
              class="text-[11px] font-semibold uppercase tracking-[0.16em] text-slate-400"
            >
              New Password
            </div>
            <InputText
              v-model="newPassword"
              type="password"
              placeholder="輸入新密碼"
              class="w-full text-sm"
            />
            <p class="mt-1 text-xs text-slate-400">
              建議至少 8 碼，並包含英文字母與數字。
            </p>
          </div>
        </div>
      </div>

      <template #footer>
        <div class="flex w-full items-center justify-between mt-2">
          <button
            class="rounded-full px-4 py-1.5 text-sm font-medium text-slate-600 hover:bg-slate-100"
            @click="closeEditDialog"
          >
            Cancel
          </button>
          <button
            class="inline-flex items-center rounded-full bg-slate-900 px-5 py-1.5 text-sm font-semibold text-white hover:bg-slate-800 disabled:bg-slate-300 disabled:cursor-not-allowed"
            :disabled="!account.trim() || !oldPassword.trim() || !newPassword.trim()"
            @click="resetPassword"
          >
            <ArrowPathIcon class="mr-1.5 h-4 w-4" />
            RESET PASSWORD
          </button>
        </div>
      </template>
    </Dialog>

    <section class="rounded-3xl bg-white p-5 shadow-sm">
      <div class="mb-4 flex items-center justify-between">
        <h2 class="text-sm font-semibold text-slate-900">Contacts</h2>
        <div class="text-sm text-slate-500">1 - 10</div>
      </div>

      <div class="overflow-x-auto">
        <table class="min-w-full text-left text-sm">
          <thead>
            <tr
              class="border-b border-slate-100 text-sm font-semibold uppercase text-slate-400"
            >
              <th class="px-1 py-2"></th>
              <th class="px-3 py-2">Visual</th>
              <th class="px-3 py-2">Name</th>
              <th class="px-3 py-2">Company</th>
              <th class="px-3 py-2">Phone Number</th>
              <th class="px-3 py-2">Email Address</th>
              <th class="px-3 py-2">Last Updated</th>
              <th class="px-3 py-2"></th>
            </tr>
          </thead>
          <tbody>
            <tr
              v-for="row in projects"
              :key="row.id"
              class="border-b border-slate-100 last:border-0 hover:bg-slate-50/40"
            >
              <td class="px-1 py-3 align-middle"></td>
              <td class="px-3 py-3 align-middle">
                <Avatar
                  :image="row.avatar"
                  shape="circle"
                  size="large"
                  class="h-9 w-9 border border-slate-100"
                />
              </td>
              <td class="px-3 py-3 align-middle text-slate-900">
                {{ row.name }}
              </td>
              <td class="px-3 py-3 align-middle text-slate-600">
                {{ row.company }}
              </td>
              <td class="px-3 py-3 align-middle text-slate-600">
                {{ row.phone }}
              </td>
              <td class="px-3 py-3 align-middle text-slate-600">
                {{ row.email }}
              </td>
              <td class="px-3 py-3 align-middle text-sm text-slate-500">
                {{ row.updated }}
              </td>
              <td class="px-3 py-3 align-middle">
                <div class="flex items-center gap-3 text-slate-400">
                  <button
                    class="inline-flex items-center gap-1 rounded-full px-3 py-1 text-xs font-semibold text-slate-600 ring-1 ring-slate-200 hover:bg-slate-100 hover:text-slate-900"
                    @click="openResetDialog(row)"
                  >
                    <KeyIcon class="h-4 w-4" />
                    <span>Reset</span>
                  </button>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </section>
  </div>
</template>

<script setup>
import { ref } from "vue";
import Avatar from "primevue/avatar";
import ConfirmDialog from "primevue/confirmdialog";
import Dialog from "primevue/dialog";
import InputText from "primevue/inputtext";
import { useConfirm } from "primevue/useconfirm";
import { KeyIcon, ShieldCheckIcon, ArrowPathIcon } from "@heroicons/vue/24/outline";

const confirm = useConfirm();

const dialogPt = {
  root: { class: "rounded-3xl" },
  header: { class: "border-b border-slate-100 px-6 py-4 bg-white rounded-t-3xl" },
  content: { class: "px-6 py-4 bg-slate-50/60" },
  footer: { class: "border-t border-slate-100 px-6 py-3 bg-white rounded-b-3xl" },
};

const projects = ref([
  {
    id: 1,
    avatar: "https://i.pravatar.cc/80?img=40",
    name: "John Doe",
    title: "Sales Manager",
    company: "Apple",
    website: "apple.com",
    phone: "+ (123) 456 789",
    email: "johndoe@apple.com",
    location: "San Diego",
    updated: "2 hours ago",
  },
  {
    id: 2,
    avatar: "https://i.pravatar.cc/80?img=41",
    name: "Mike Bay",
    title: "Data Scientist",
    company: "Microsoft",
    website: "microsoft.com",
    phone: "+ (123) 456 789",
    email: "mikebay@microsoft.com",
    location: "Denver",
    updated: "5 hours ago",
  },
  {
    id: 3,
    avatar: "https://i.pravatar.cc/80?img=48",
    name: "David Smith",
    title: "Analytics Manager",
    company: "Samsung",
    website: "samsung.com",
    phone: "+ (123) 456 789",
    email: "davidsmith@samsung.com",
    location: "San Francisco",
    updated: "8 hours ago",
  },
  {
    id: 4,
    avatar: "https://i.pravatar.cc/80?img=42",
    name: "Jessica Doe",
    title: "Research Analyst",
    company: "Google",
    website: "google.com",
    phone: "+ (123) 456 789",
    email: "jessicadoe@google.com",
    location: "Chicago",
    updated: "1 day ago",
  },
  {
    id: 5,
    avatar: "https://i.pravatar.cc/80?img=45",
    name: "Sarah Johnson",
    title: "Analytics Consultant",
    company: "HP",
    website: "hp.com",
    phone: "+ (123) 456 789",
    email: "sarahjohnson@hp.com",
    location: "Los Angeles",
    updated: "3 days ago",
  },
  {
    id: 6,
    avatar: "https://i.pravatar.cc/80?img=49",
    name: "Michelle Davis",
    title: "Marketing Manager",
    company: "Intel",
    website: "intel.com",
    phone: "+ (123) 456 789",
    email: "michelledavis@intel.com",
    location: "New York",
    updated: "4 days ago",
  },
]);

const editDialogVisible = ref(false);
const editingProject = ref(null);

const account = ref("");
const oldPassword = ref("");
const newPassword = ref("");

const openResetDialog = (row) => {
  editingProject.value = { ...row };
  account.value = row.email || row.name || "";
  oldPassword.value = "";
  newPassword.value = "";
  editDialogVisible.value = true;
};

const closeEditDialog = () => {
  editDialogVisible.value = false;
  editingProject.value = null;
  account.value = "";
  oldPassword.value = "";
  newPassword.value = "";
};

const resetPassword = () => {
  if (!editingProject.value) return;

  confirm.require({
    header: "Password Reset",
    message: `已為 ${editingProject.value.name} 重設密碼。`,
    icon: "pi pi-check-circle",
    acceptLabel: "OK",
    rejectClass: "hidden",
    accept: () => {},
  });

  closeEditDialog();
};
</script>
