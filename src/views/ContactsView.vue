<!-- src/views/ContactsView.vue -->
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
          <Avatar
            :image="editingProject.avatar"
            shape="circle"
            class="h-12 w-12 object-cover"
          />
          <div class="min-w-0">
            <div class="text-sm font-semibold uppercase tracking-[0.16em] text-slate-400">
              Edit Contact
            </div>
            <div class="truncate text-sm font-semibold text-slate-900">
              {{ editingProject.name }}
            </div>
          </div>
        </div>
      </template>

      <div class="space-y-5">
        <div class="flex flex-col items-center gap-3">
          <div class="relative">
            <Avatar
              :image="editingProject.avatar"
              shape="circle"
              size="xlarge"
              class="h-20 w-20 border-2 border-white shadow-md object-cover"
            />
            <label
              class="absolute bottom-0 right-0 inline-flex h-7 w-7 cursor-pointer items-center justify-center rounded-full bg-slate-900 text-[10px] font-semibold text-white shadow-md"
            >
              ✎
              <input
                type="file"
                accept="image/*"
                class="hidden"
                @change="onAvatarChange"
              />
            </label>
          </div>
        </div>

        <div class="grid gap-4">
          <div class="flex items-start gap-3">
            <div class="flex-1">
              <div
                class="text-[11px] font-semibold uppercase tracking-[0.16em] text-slate-400"
              >
                Name
              </div>
              <InputText
                v-model="editingProject.name"
                placeholder="Name"
                class="w-full text-sm"
              />
            </div>
          </div>

          <div class="flex items-start gap-3">
            <div class="flex-1">
              <div
                class="text-[11px] font-semibold uppercase tracking-[0.16em] text-slate-400"
              >
                Title
              </div>
              <InputText
                v-model="editingProject.title"
                placeholder="Title"
                class="w-full text-sm"
              />
            </div>
          </div>

          <div class="flex items-start gap-3">
            <div class="flex-1">
              <div
                class="text-[11px] font-semibold uppercase tracking-[0.16em] text-slate-400"
              >
                Company
              </div>
              <InputText
                v-model="editingProject.company"
                placeholder="Company"
                class="w-full text-sm"
              />
            </div>
          </div>

          <div class="flex items-start gap-3">
            <div class="flex-1">
              <div
                class="text-[11px] font-semibold uppercase tracking-[0.16em] text-slate-400"
              >
                Website
              </div>
              <InputText
                v-model="editingProject.website"
                placeholder="Website"
                class="mt-1 w-full text-sm"
              />
            </div>
          </div>

          <div class="flex items-start gap-3">
            <div class="flex-1">
              <div
                class="text-[11px] font-semibold uppercase tracking-[0.16em] text-slate-400"
              >
                Phone Number
              </div>
              <InputText
                v-model="editingProject.phone"
                placeholder="Phone Number"
                class="mt-1 w-full text-sm"
              />
            </div>
          </div>

          <div class="flex items-start gap-3">
            <div class="flex-1">
              <div
                class="text-[11px] font-semibold uppercase tracking-[0.16em] text-slate-400"
              >
                Email
              </div>
              <InputText
                v-model="editingProject.email"
                placeholder="Email"
                class="mt-1 w-full text-sm"
              />
            </div>
          </div>

          <div class="flex items-start gap-3">
            <div class="flex-1">
              <div
                class="text-[11px] font-semibold uppercase tracking-[0.16em] text-slate-400"
              >
                Location
              </div>
              <InputText
                v-model="editingProject.location"
                placeholder="Location"
                class="mt-1 w-full text-sm"
              />
            </div>
          </div>
        </div>
      </div>

      <template #footer>
        <div class="flex w-full items-center justify-end gap-2 mt-4">
          <button
            class="rounded-full px-4 py-1.5 text-sm font-medium text-slate-600 hover:bg-slate-100"
            @click="closeEditDialog"
          >
            Cancel
          </button>
          <button
            class="rounded-full bg-slate-900 px-5 py-1.5 text-sm font-semibold text-white hover:bg-slate-800"
            @click="saveProfile"
          >
            Save changes
          </button>
        </div>
      </template>
    </Dialog>

    <div class="flex justify-center">
      <TabMenu
        v-model:activeIndex="activeIndex"
        :model="tabItems"
        :pt="tabMenuPt"
        class="rounded-full bg-slate-100 p-1"
      />
    </div>

    <section v-if="currentTab === 'card'">
      <div class="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
        <div
          v-for="row in projects"
          :key="row.id"
          class="flex flex-col rounded-3xl bg-white p-5 shadow-sm"
        >
          <div class="flex flex-col items-center">
            <Avatar
              :image="row.avatar"
              shape="circle"
              size="xlarge"
              class="h-20 w-20 border-2 border-slate-100 shadow-md"
            />
            <div class="mt-3 text-center">
              <div class="text-sm font-semibold text-slate-900">
                {{ row.name }}
              </div>
              <div class="mt-0.5 text-sm text-slate-500">
                {{ row.title }}
              </div>
              <div class="mt-0.5 text-sm text-slate-400">
                {{ row.company }}
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
                <div class="text-sm text-slate-700">
                  {{ row.website }}
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
                  Phone Number
                </div>
                <div class="text-sm text-slate-700">
                  {{ row.phone }}
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
                  Email
                </div>
                <div class="text-sm text-slate-700">
                  {{ row.email }}
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
                  Location
                </div>
                <div class="text-sm text-slate-700">
                  {{ row.location }}
                </div>
              </div>
            </div>
          </div>

          <div
            class="mt-5 flex items-center justify-between border-t border-slate-100 pt-4"
          >
            <div class="flex ml-auto items-center gap-3 text-slate-400">
              <button class="hover:text-slate-700" @click="goToProfileEdit(row)">
                <i class="pi pi-pencil text-sm" />
              </button>
              <button class="hover:text-red-500" @click="confirmDelete(row)">
                <i class="pi pi-trash text-sm" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>

    <section v-else class="rounded-3xl bg-white p-5 shadow-sm">
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
              <th class="px-3 py-2">
                <input type="checkbox" class="h-4 w-4 rounded border-slate-300" />
              </th>
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
              <td class="px-3 py-3 align-middle">
                <input type="checkbox" class="h-4 w-4 rounded border-slate-300" />
              </td>
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
                  <button class="hover:text-slate-700" @click="goToProfileEdit(row)">
                    <i class="pi pi-pencil text-sm" />
                  </button>
                  <button class="hover:text-red-500" @click="confirmDelete(row)">
                    <i class="pi pi-trash text-sm" />
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
import { ref, computed } from "vue";
import Avatar from "primevue/avatar";
import TabMenu from "primevue/tabmenu";
import ConfirmDialog from "primevue/confirmdialog";
import Dialog from "primevue/dialog";
import InputText from "primevue/inputtext";
import { useConfirm } from "primevue/useconfirm";
import {
  GlobeAltIcon,
  PhoneIcon,
  EnvelopeIcon,
  MapPinIcon,
  ChevronRightIcon,
} from "@heroicons/vue/24/outline";

const confirm = useConfirm();

const activeIndex = ref(0);
const tabItems = [
  { label: "Card View", icon: "pi pi-id-card", key: "card" },
  { label: "Table View", icon: "pi pi-table", key: "table" },
];

const tabMenuPt = {
  menu: { class: "flex gap-1" },
  action: ({ context }) => ({
    class: [
      "flex items-center gap-2 rounded-full px-4 py-1.5 text-sm font-medium transition",
      context.index === activeIndex.value
        ? "bg-white text-slate-900 shadow-sm"
        : "text-slate-500 hover:bg-slate-200/70",
    ],
  }),
  icon: { class: "text-sm" },
  label: { class: "text-sm" },
};

const dialogPt = {
  root: { class: "rounded-3xl" },
  header: { class: "border-b border-slate-100 px-6 py-4 bg-white rounded-t-3xl" },
  content: { class: "px-6 py-4 bg-slate-50/60" },
  footer: { class: "border-t border-slate-100 px-6 py-3 bg-white rounded-b-3xl" },
};

const currentTab = computed(() => tabItems[activeIndex.value].key);

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

const confirmDelete = (row) => {
  confirm.require({
    header: "Delete Contact",
    message: `Are you sure you want to delete ${row.name}'s data?`,
    icon: "pi pi-exclamation-triangle",
    rejectLabel: "Cancel",
    acceptLabel: "Delete",
    acceptClass: "p-button-danger",
    accept: () => {
      projects.value = projects.value.filter((p) => p.id !== row.id);
    },
  });
};

const goToProfileEdit = (row) => {
  editingProject.value = { ...row };
  editDialogVisible.value = true;
};

const closeEditDialog = () => {
  editDialogVisible.value = false;
  editingProject.value = null;
};

const saveProfile = () => {
  if (!editingProject.value) return;
  projects.value = projects.value.map((p) =>
    p.id === editingProject.value.id ? { ...p, ...editingProject.value } : p
  );
  editDialogVisible.value = false;
};

const onAvatarChange = (event) => {
  const files = event.target.files;
  if (!files || !files.length || !editingProject.value) return;
  const file = files[0];
  const reader = new FileReader();
  reader.onload = () => {
    editingProject.value.avatar = reader.result;
  };
  reader.readAsDataURL(file);
  event.target.value = "";
};
</script>
