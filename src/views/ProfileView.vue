<!-- src/views/ProfileView.vue -->
<template>
  <section class="rounded-3xl bg-white p-5 shadow-sm">
    <!-- PrimeVue 確認對話框 -->
    <ConfirmDialog />

    <div class="mb-4 flex items-center justify-between">
      <h2 class="text-sm font-semibold text-slate-900">Profile</h2>
      <div class="text-xs text-slate-500">1 - 10</div>
    </div>

    <div class="overflow-x-auto">
      <table class="min-w-full text-left text-sm">
        <thead>
          <tr
            class="border-b border-slate-100 text-xs font-semibold uppercase text-slate-400"
          >
            <th class="px-3 py-2">
              <input type="checkbox" class="h-4 w-4 rounded border-slate-300" />
            </th>
            <th class="px-3 py-2">Visual</th>
            <th class="px-3 py-2">Designer</th>
            <th class="px-3 py-2">Task</th>
            <th class="px-3 py-2">Status</th>
            <th class="px-3 py-2">Priority</th>
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
                class="h-9 w-9 border border-slate-100"
              />
            </td>
            <td class="px-3 py-3 align-middle text-slate-900">
              {{ row.designer }}
            </td>
            <td class="px-3 py-3 align-middle text-slate-600">
              {{ row.task }}
            </td>
            <td class="px-3 py-3 align-middle">
              <span
                class="inline-flex items-center rounded-full px-3 py-1 text-xs font-semibold"
                :class="row.statusClass"
              >
                <span
                  class="mr-1 inline-block h-2 w-2 rounded-full"
                  :class="row.statusDotClass"
                />
                {{ row.status }}
              </span>
            </td>
            <td class="px-3 py-3 align-middle">
              <span
                class="inline-flex items-center rounded-full px-3 py-1 text-xs font-semibold"
                :class="row.priorityClass"
              >
                {{ row.priority }}
              </span>
            </td>
            <td class="px-3 py-3 align-middle text-xs text-slate-500">
              {{ row.updated }}
            </td>
            <td class="px-3 py-3 align-middle">
              <div class="flex items-center gap-3 text-slate-400">
                <button class="hover:text-slate-700" @click="goToProfileEdit(row)">
                  <i class="pi pi-pencil text-xs" />
                </button>
                <button class="hover:text-red-500" @click="confirmDelete(row)">
                  <i class="pi pi-trash text-xs" />
                </button>
              </div>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </section>
</template>

<script setup>
import { ref } from "vue";
import { useRouter } from "vue-router";
import Avatar from "primevue/avatar";
import ConfirmDialog from "primevue/confirmdialog";
import { useConfirm } from "primevue/useconfirm";

const router = useRouter();
const confirm = useConfirm();

const projects = ref([
  {
    id: 1,
    avatar: "https://i.pravatar.cc/80?img=40",
    designer: "John Doe",
    task: "Market Research",
    status: "Completed",
    statusClass: "bg-emerald-50 text-emerald-700",
    statusDotClass: "bg-emerald-500",
    priority: "High",
    priorityClass: "bg-red-500 text-white",
    updated: "2 hours ago",
  },
  {
    id: 2,
    avatar: "https://i.pravatar.cc/80?img=41",
    designer: "Sarah Johnson",
    task: "Email Marketing",
    status: "On Review",
    statusClass: "bg-pink-50 text-pink-700",
    statusDotClass: "bg-pink-400",
    priority: "Mid",
    priorityClass: "bg-amber-400 text-white",
    updated: "5 hours ago",
  },
  {
    id: 3,
    avatar: "https://i.pravatar.cc/80?img=42",
    designer: "Jessica Doe",
    task: "Design Review",
    status: "In Queue",
    statusClass: "bg-amber-50 text-amber-700",
    statusDotClass: "bg-amber-400",
    priority: "Low",
    priorityClass: "bg-emerald-500 text-white",
    updated: "1 day ago",
  },
  {
    id: 4,
    avatar: "https://i.pravatar.cc/80?img=43",
    designer: "Mike Bay",
    task: "UX Analysis",
    status: "In Progress",
    statusClass: "bg-blue-50 text-blue-700",
    statusDotClass: "bg-blue-500",
    priority: "High",
    priorityClass: "bg-red-500 text-white",
    updated: "2 days ago",
  },
  {
    id: 5,
    avatar: "https://i.pravatar.cc/80?img=44",
    designer: "Em Davis",
    task: "Training Workshop",
    status: "In Queue",
    statusClass: "bg-amber-50 text-amber-700",
    statusDotClass: "bg-amber-400",
    priority: "Low",
    priorityClass: "bg-emerald-500 text-white",
    updated: "4 days ago",
  },
  {
    id: 6,
    avatar: "https://i.pravatar.cc/80?img=45",
    designer: "Daniel Mil",
    task: "Brand Identity",
    status: "On Review",
    statusClass: "bg-pink-50 text-pink-700",
    statusDotClass: "bg-pink-400",
    priority: "Mid",
    priorityClass: "bg-amber-400 text-white",
    updated: "3 days ago",
  },
  {
    id: 7,
    avatar: "https://i.pravatar.cc/80?img=46",
    designer: "Oly Sim",
    task: "Vendor Evaluation",
    status: "Completed",
    statusClass: "bg-emerald-50 text-emerald-700",
    statusDotClass: "bg-emerald-500",
    priority: "Low",
    priorityClass: "bg-emerald-500 text-white",
    updated: "5 days ago",
  },
  {
    id: 8,
    avatar: "https://i.pravatar.cc/80?img=47",
    designer: "Liam Anderson",
    task: "Content Strategy",
    status: "In Progress",
    statusClass: "bg-blue-50 text-blue-700",
    statusDotClass: "bg-blue-500",
    priority: "High",
    priorityClass: "bg-red-500 text-white",
    updated: "4 days ago",
  },
  {
    id: 9,
    avatar: "https://i.pravatar.cc/80?img=48",
    designer: "David Smith",
    task: "Customer Research",
    status: "On Review",
    statusClass: "bg-pink-50 text-pink-700",
    statusDotClass: "bg-pink-400",
    priority: "Mid",
    priorityClass: "bg-amber-400 text-white",
    updated: "8 days ago",
  },
  {
    id: 10,
    avatar: "https://i.pravatar.cc/80?img=49",
    designer: "Jane Doe",
    task: "Logo Design",
    status: "In Queue",
    statusClass: "bg-amber-50 text-amber-700",
    statusDotClass: "bg-amber-400",
    priority: "Low",
    priorityClass: "bg-emerald-500 text-white",
    updated: "8 days ago",
  },
]);

const confirmDelete = (row) => {
  confirm.require({
    header: "Delete Project",
    message: `Are you sure you want to delete ${row.designer}'s project?`,
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
  router.push({
    name: "profile-detail",
    params: { id: row.id },
  });
};
</script>
