<!-- src/views/AllTasksView.vue -->
<template>
  <div class="space-y-8">
    <!-- 上：儀表板區 -->
    <section class="flex flex-col gap-6 lg:flex-row">
      <!-- 左半：圓形進度 + 任務列表 -->
      <div class="flex-1 flex flex-col gap-6">
        <!-- 三個圓形進度卡片 -->
        <div class="flex flex-col gap-4 md:flex-row">
          <div
            v-for="item in radialCards"
            :key="item.id"
            class="flex-1 rounded-[28px] bg-white px-6 pt-7 pb-7 shadow-sm flex flex-col"
          >
            <div class="flex items-start justify-between gap-2">
              <!-- 圓形儀表 -->
              <div class="relative mx-auto h-32 w-32">
                <!-- 底色圓 -->
                <div class="absolute inset-0 rounded-full bg-slate-100" />
                <!-- 進度圓弧（半圓感） -->
                <div
                  class="absolute inset-0 rounded-full"
                  :style="{
                    background:
                      'conic-gradient(' +
                      item.color +
                      ' 0deg, ' +
                      item.color +
                      ' ' +
                      item.progress * 1.8 +
                      'deg, #e5e7eb ' +
                      item.progress * 1.8 +
                      'deg, #e5e7eb 360deg)',
                  }"
                />
                <!-- 中間白圈 -->
                <div class="absolute inset-[18%] rounded-full bg-white" />
                <!-- 文字區 -->
                <div
                  class="absolute inset-[26%] flex flex-col items-center justify-center text-center"
                >
                  <span class="text-[10px] font-semibold tracking-[0.2em] text-slate-400">
                    PROGRESS
                  </span>
                  <span class="mt-1 text-2xl font-bold text-slate-900">
                    {{ item.progress }}<span class="text-sm">%</span>
                  </span>
                </div>

                <!-- 下方 0% / 100% -->
                <div
                  class="absolute left-0 right-0 -bottom-4 flex items-center justify-between text-[10px] font-semibold text-slate-300"
                >
                  <span>0%</span>
                  <span>100%</span>
                </div>
              </div>

              <!-- 更多按鈕 -->
              <button
                class="inline-flex h-8 w-8 items-center justify-center rounded-full text-slate-400 hover:bg-slate-100"
              >
                <i class="pi pi-ellipsis-h text-sm" />
              </button>
            </div>

            <!-- 標題 -->
            <div class="mt-10 text-center text-sm font-semibold text-slate-900">
              {{ item.title }}
            </div>
          </div>
        </div>

        <!-- 任務進度條 -->
        <div class="rounded-3xl bg-white p-5 shadow-sm">
          <div class="mb-4 flex items-center justify-between">
            <h2 class="text-sm font-semibold text-slate-900">Tasks</h2>
            <button
              class="inline-flex h-8 w-8 items-center justify-center rounded-full text-slate-400 hover:bg-slate-100"
            >
              <i class="pi pi-ellipsis-h text-sm" />
            </button>
          </div>

          <div class="space-y-3">
            <div
              v-for="task in mainTasks"
              :key="task.id"
              class="relative overflow-hidden rounded-full px-4 py-3 shadow-[0_10px_25px_rgba(15,23,42,0.06)]"
              :style="{
                background:
                  'linear-gradient(to right, ' +
                  task.mainColor +
                  ' 0%, ' +
                  task.mainColor +
                  ' ' +
                  task.progress +
                  '%, ' +
                  task.lightColor +
                  ' ' +
                  task.progress +
                  '%, ' +
                  task.lightColor +
                  ' 100%)',
              }"
            >
              <div class="flex items-center justify-between">
                <div class="flex items-center gap-3">
                  <Avatar
                    :image="task.avatar"
                    shape="circle"
                    class="h-9 w-9 border-2 border-white shadow-sm"
                  />
                  <div>
                    <div class="text-sm font-semibold text-white">
                      {{ task.title }}
                    </div>
                    <div class="text-xs text-slate-100/90">
                      {{ task.category }}
                    </div>
                  </div>
                </div>
                <div class="text-sm font-semibold" :style="{ color: task.textColor }">
                  {{ task.progress }}%
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- 右半：側欄任務卡 -->
      <div
        class="w-full lg:w-[320px] xl:w-[360px] flex flex-col rounded-3xl bg-white shadow-sm overflow-hidden"
      >
        <div
          v-for="item in sideTasks"
          :key="item.id"
          class="border-b border-slate-100 last:border-b-0 px-5 py-4"
        >
          <div class="mb-3 flex items-start justify-between gap-2">
            <div>
              <div class="text-sm font-semibold text-slate-900">
                {{ item.title }}
              </div>
              <div class="text-xs text-slate-500">
                {{ item.category }}
              </div>
            </div>
            <span
              class="rounded-full px-3 py-1 text-xs font-semibold"
              :class="item.priorityClass"
            >
              {{ item.priorityLabel }}
            </span>
          </div>

          <div class="mb-3 flex items-center gap-3">
            <div class="h-1.5 flex-1 rounded-full bg-slate-100 overflow-hidden">
              <div
                class="h-full rounded-full"
                :class="item.barClass"
                :style="{ width: item.progress + '%' }"
              />
            </div>
            <div class="text-xs font-semibold text-slate-500">{{ item.progress }}%</div>
          </div>

          <div class="flex items-center justify-between">
            <div class="flex items-center">
              <Avatar
                v-for="(avatar, index) in item.avatars"
                :key="avatar"
                :image="avatar"
                shape="circle"
                class="h-7 w-7 border-2 border-white shadow-sm"
                :class="index !== 0 ? '-ml-2' : ''"
              />
            </div>
            <button
              class="inline-flex h-7 w-7 items-center justify-center rounded-full text-slate-400 hover:bg-slate-100"
            >
              <i class="pi pi-ellipsis-h text-xs" />
            </button>
          </div>
        </div>
      </div>
    </section>

    <!-- 中：Projects 表格 -->
    <section class="rounded-3xl bg-white p-5 shadow-sm">
      <div class="mb-4 flex items-center justify-between">
        <h2 class="text-sm font-semibold text-slate-900">Projects</h2>
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
                  <button class="hover:text-slate-700">
                    <i class="pi pi-pencil text-xs" />
                  </button>
                  <button class="hover:text-red-500">
                    <i class="pi pi-trash text-xs" />
                  </button>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </section>

    <!-- 下：三張公司卡片 -->
    <section class="flex flex-col gap-4 xl:flex-row">
      <div
        v-for="company in companies"
        :key="company.id"
        class="flex-1 rounded-3xl bg-white p-5 shadow-sm"
      >
        <div class="mb-4 flex items-start justify-between gap-3">
          <div class="flex items-start gap-3">
            <div
              class="flex h-10 w-10 items-center justify-center rounded-2xl bg-slate-900 text-white text-lg font-bold"
            >
              {{ company.logoText }}
            </div>
            <div>
              <div class="text-sm font-semibold text-slate-900">
                {{ company.name }}
              </div>
              <div class="text-xs text-slate-500">
                {{ company.location }}
              </div>
            </div>
          </div>
          <div class="flex flex-col items-end gap-2">
            <span
              class="inline-flex items-center rounded-full px-3 py-1 text-xs font-semibold"
              :class="company.statusClass"
            >
              <span
                class="mr-1 inline-block h-2 w-2 rounded-full"
                :class="company.statusDotClass"
              />
              {{ company.status }}
            </span>
            <span
              class="inline-flex items-center rounded-full px-3 py-1 text-xs font-semibold"
              :class="company.priorityClass"
            >
              {{ company.priority }}
            </span>
          </div>
        </div>

        <div class="mb-3 text-xs font-semibold text-slate-600">
          Milestones Completed: {{ company.completed }} / {{ company.total }}
        </div>

        <div class="mb-3 flex items-center gap-3">
          <div class="h-1.5 flex-1 rounded-full bg-slate-100 overflow-hidden">
            <div
              class="h-full rounded-full"
              :class="company.barClass"
              :style="{ width: company.progress + '%' }"
            />
          </div>
          <div class="text-xs font-semibold text-slate-500">{{ company.progress }}%</div>
        </div>

        <div class="flex items-center">
          <Avatar
            v-for="(avatar, index) in company.avatars"
            :key="avatar"
            :image="avatar"
            shape="circle"
            class="h-8 w-8 border-2 border-white shadow-sm"
            :class="index !== 0 ? '-ml-2' : ''"
          />
        </div>
      </div>
    </section>
  </div>
</template>

<script setup>
import Avatar from "primevue/avatar";

const radialCards = [
  {
    id: 1,
    title: "UX/UI Research",
    progress: 38,
    color: "#fb7185", // 粉紅
  },
  {
    id: 2,
    title: "Brand Identity",
    progress: 74,
    color: "#3b82f6", // 藍色
  },
  {
    id: 3,
    title: "Logo Design",
    progress: 56,
    color: "#facc15", // 黃色
  },
];

const mainTasks = [
  {
    id: 1,
    title: "Market Research",
    category: "Advertising",
    avatar: "https://i.pravatar.cc/80?img=11",
    progress: 68,
    mainColor: "#60a5fa", // 左側主色
    lightColor: "#dbeafe", // 右側淺色
    textColor: "#2563eb", // 百分比文字色
  },
  {
    id: 2,
    title: "Content Strategy",
    category: "Branding",
    avatar: "https://i.pravatar.cc/80?img=12",
    progress: 91,
    mainColor: "#fb7185",
    lightColor: "#fed7e2",
    textColor: "#e11d48",
  },
  {
    id: 3,
    title: "Vendor Evaluation",
    category: "Management",
    avatar: "https://i.pravatar.cc/80?img=13",
    progress: 42,
    mainColor: "#facc15",
    lightColor: "#fef3c7",
    textColor: "#d97706",
  },
];

const sideTasks = [
  {
    id: 1,
    title: "Email Marketing",
    category: "Advertising",
    progress: 68,
    barClass: "bg-blue-500",
    priorityLabel: "Mid",
    priorityClass: "bg-blue-50 text-blue-700",
    avatars: [
      "https://i.pravatar.cc/80?img=21",
      "https://i.pravatar.cc/80?img=22",
      "https://i.pravatar.cc/80?img=23",
      "https://i.pravatar.cc/80?img=24",
    ],
  },
  {
    id: 2,
    title: "Design Review",
    category: "Branding",
    progress: 91,
    barClass: "bg-pink-400",
    priorityLabel: "Low",
    priorityClass: "bg-emerald-50 text-emerald-700",
    avatars: [
      "https://i.pravatar.cc/80?img=25",
      "https://i.pravatar.cc/80?img=26",
      "https://i.pravatar.cc/80?img=27",
      "https://i.pravatar.cc/80?img=28",
    ],
  },
  {
    id: 3,
    title: "Customer Research",
    category: "Targeting",
    progress: 42,
    barClass: "bg-amber-400",
    priorityLabel: "High",
    priorityClass: "bg-red-50 text-red-700",
    avatars: [
      "https://i.pravatar.cc/80?img=29",
      "https://i.pravatar.cc/80?img=30",
      "https://i.pravatar.cc/80?img=31",
      "https://i.pravatar.cc/80?img=32",
    ],
  },
  {
    id: 4,
    title: "UX Analysis",
    category: "Research",
    progress: 57,
    barClass: "bg-emerald-500",
    priorityLabel: "Mid",
    priorityClass: "bg-blue-50 text-blue-700",
    avatars: [
      "https://i.pravatar.cc/80?img=33",
      "https://i.pravatar.cc/80?img=34",
      "https://i.pravatar.cc/80?img=35",
      "https://i.pravatar.cc/80?img=36",
    ],
  },
];

const projects = [
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
];

const companies = [
  {
    id: 1,
    logoText: "A",
    name: "Apple",
    location: "Apple Park, CA",
    status: "In Progress",
    statusClass: "bg-blue-50 text-blue-700",
    statusDotClass: "bg-blue-500",
    priority: "Mid",
    priorityClass: "bg-amber-400 text-white",
    completed: 5,
    total: 8,
    progress: 57,
    barClass: "bg-emerald-500",
    avatars: [
      "https://i.pravatar.cc/80?img=51",
      "https://i.pravatar.cc/80?img=52",
      "https://i.pravatar.cc/80?img=53",
      "https://i.pravatar.cc/80?img=54",
    ],
  },
  {
    id: 2,
    logoText: "G",
    name: "Google",
    location: "Mountain View, CA",
    status: "In Queue",
    statusClass: "bg-amber-50 text-amber-700",
    statusDotClass: "bg-amber-400",
    priority: "Low",
    priorityClass: "bg-emerald-500 text-white",
    completed: 6,
    total: 7,
    progress: 91,
    barClass: "bg-pink-400",
    avatars: [
      "https://i.pravatar.cc/80?img=55",
      "https://i.pravatar.cc/80?img=56",
      "https://i.pravatar.cc/80?img=57",
      "https://i.pravatar.cc/80?img=58",
    ],
  },
  {
    id: 3,
    logoText: "M",
    name: "Microsoft",
    location: "Redmond, WA",
    status: "On Review",
    statusClass: "bg-pink-50 text-pink-700",
    statusDotClass: "bg-pink-400",
    priority: "High",
    priorityClass: "bg-red-500 text-white",
    completed: 4,
    total: 9,
    progress: 42,
    barClass: "bg-amber-400",
    avatars: [
      "https://i.pravatar.cc/80?img=59",
      "https://i.pravatar.cc/80?img=60",
      "https://i.pravatar.cc/80?img=61",
      "https://i.pravatar.cc/80?img=62",
    ],
  },
];
</script>
