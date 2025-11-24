<!-- src/views/TimelineView.vue -->
<template>
  <div class="space-y-8">
    <section class="rounded-3xl bg-white p-5 shadow-sm">
      <div class="flex items-center justify-between mb-4">
        <h2 class="text-sm font-semibold text-slate-900">Timeline</h2>
        <button
          class="inline-flex h-8 w-8 items-center justify-center rounded-full text-slate-400 hover:bg-slate-100"
        >
          <i class="pi pi-ellipsis-h text-sm" />
        </button>
      </div>

      <div class="border-t border-slate-100 pt-4">
        <div class="px-10">
          <div class="flex justify-between text-[11px] font-semibold text-slate-400">
            <span>Sep</span>
            <span>Oct</span>
          </div>
          <div class="mt-2 flex justify-between text-[11px] text-slate-400">
            <span v-for="(day, index) in timelineDays" :key="day + index">
              {{ day }}
            </span>
          </div>
        </div>

        <div class="relative mt-6 h-96 rounded-3xl bg-slate-50 overflow-hidden">
          <div class="absolute inset-y-0 left-10 w-10 bg-blue-50" />
          <div
            class="absolute inset-y-6 left-12 w-8 rounded-2xl border border-blue-300 bg-blue-100"
          />

          <div class="absolute inset-y-8 left-32 w-[260px] rounded-3xl bg-slate-100/80" />
          <div
            class="absolute inset-y-8 left-[360px] w-[260px] rounded-3xl bg-slate-100/80"
          />
          <div
            class="absolute inset-y-8 left-[688px] w-[220px] rounded-3xl bg-slate-100/80"
          />

          <!-- 黃色 Vendor Evaluation -->
          <div
            class="absolute left-24 top-12 flex items-center justify-between rounded-full px-6 py-3 shadow-[0_14px_30px_rgba(15,23,42,0.18)] cursor-pointer transition"
            :class="
              activeCategory === 'Management'
                ? 'ring-4 ring-slate-900/10 scale-[1.02]'
                : ''
            "
            :style="{
              width: '26rem',
              background:
                'linear-gradient(to right, #facc15 0%, #facc15 42%, #fef3c7 42%, #fef3c7 100%)',
            }"
            @click="setActiveCategory('Management')"
          >
            <div class="flex items-center gap-3">
              <Avatar
                image="https://i.pravatar.cc/80?img=13"
                shape="circle"
                class="h-9 w-9"
              />
              <div>
                <div class="text-sm font-semibold text-white">Vendor Evaluation</div>
                <div class="text-xs text-slate-100/90">Management</div>
              </div>
            </div>
            <div class="text-sm font-semibold text-amber-600">42%</div>
          </div>

          <!-- 藍色 Market Research -->
          <div
            class="absolute left-[600px] top-32 flex items-center justify-between rounded-full px-6 py-3 shadow-[0_14px_30px_rgba(15,23,42,0.18)] cursor-pointer transition"
            :class="
              activeCategory === 'Advertising'
                ? 'ring-4 ring-slate-900/10 scale-[1.02]'
                : ''
            "
            :style="{
              width: '25rem',
              background:
                'linear-gradient(to right, #60a5fa 0%, #60a5fa 68%, #dbeafe 68%, #dbeafe 100%)',
            }"
            @click="setActiveCategory('Advertising')"
          >
            <div class="flex items-center gap-3">
              <Avatar
                image="https://i.pravatar.cc/80?img=11"
                shape="circle"
                class="h-9 w-9 border-2 border-white shadow-sm"
              />
              <div>
                <div class="text-sm font-semibold text-white">Market Research</div>
                <div class="text-xs text-slate-100/90">Advertising</div>
              </div>
            </div>
            <div class="text-sm font-semibold text-blue-600">68%</div>
          </div>

          <!-- 粉紅 Content Strategy -->
          <div
            class="absolute left-[220px] top-52 flex items-center justify-between rounded-full px-6 py-3 shadow-[0_14px_30px_rgba(15,23,42,0.18)] cursor-pointer transition"
            :class="
              activeCategory === 'Branding' ? 'ring-4 ring-slate-900/10 scale-[1.02]' : ''
            "
            :style="{
              width: '43rem',
              background:
                'linear-gradient(to right, #fb7185 0%, #fb7185 91%, #fed7e2 91%, #fed7e2 100%)',
            }"
            @click="setActiveCategory('Branding')"
          >
            <div class="flex items-center gap-3">
              <Avatar
                image="https://i.pravatar.cc/80?img=12"
                shape="circle"
                class="h-9 w-9 border-2 border-white shadow-sm"
              />
              <div>
                <div class="text-sm font-semibold text-white">Content Strategy</div>
                <div class="text-xs text-slate-100/90">Branding</div>
              </div>
            </div>
            <div class="text-sm font-semibold text-rose-500">91%</div>
          </div>

          <!-- 綠色 Frontend Design -->
          <div
            class="absolute left-[360px] top-72 flex items-center justify-between rounded-full px-6 py-3 shadow-[0_14px_30px_rgba(15,23,42,0.18)] cursor-pointer transition"
            :class="
              activeCategory === 'Development'
                ? 'ring-4 ring-slate-900/10 scale-[1.02]'
                : ''
            "
            :style="{
              width: '38rem',
              background:
                'linear-gradient(to right, #22c55e 0%, #22c55e 53%, #bbf7d0 53%, #bbf7d0 100%)',
            }"
            @click="setActiveCategory('Development')"
          >
            <div class="flex items-center gap-3">
              <Avatar
                image="https://i.pravatar.cc/80?img=31"
                shape="circle"
                class="h-9 w-9 border-2 border-white shadow-sm"
              />
              <div>
                <div class="text-sm font-semibold text-white">Frontend Design</div>
                <div class="text-xs text-slate-100/90">Development</div>
              </div>
            </div>
            <div class="text-sm font-semibold text-emerald-700">53%</div>
          </div>

          <button
            class="absolute left-4 top-1/2 -translate-y-1/2 inline-flex h-8 w-8 items-center justify-center rounded-full bg-blue-500 text-white shadow-md"
            @click="moveTimeline('prev')"
          >
            <i class="pi pi-angle-left text-xs" />
          </button>
          <button
            class="absolute right-4 top-1/2 -translate-y-1/2 inline-flex h-8 w-8 items-center justify-center rounded-full bg-blue-500 text-white shadow-md"
            @click="moveTimeline('next')"
          >
            <i class="pi pi-angle-right text-xs" />
          </button>
        </div>
      </div>
    </section>

    <section class="rounded-3xl bg-white p-6 shadow-sm">
      <div class="mb-5 flex items-center justify-between">
        <h2 class="text-sm font-semibold text-slate-900">Calendar</h2>
        <button
          class="text-xs font-medium text-slate-500 hover:text-slate-900"
          @click="toggleWeekends"
        >
          {{ showWeekends ? "Hide Weekends" : "Show Weekends" }}
        </button>
      </div>

      <div class="space-y-8">
        <div class="flex">
          <div v-for="day in visibleCalendarWeekTop" :key="day.id" class="flex-1">
            <div
              class="flex flex-col rounded-3xl transition"
              :class="
                day.isToday
                  ? 'bg-blue-50 ring-1 ring-blue-100 shadow-sm'
                  : 'bg-transparent'
              "
            >
              <div
                class="flex items-center justify-between border-b px-2 py-3"
                :class="day.isToday ? 'border-blue-200' : 'border-slate-100'"
              >
                <div class="flex">
                  <div class="text-xs font-semibold text-slate-500">
                    {{ day.weekday }}
                    <span
                      v-if="day.isToday"
                      class="text-[11px] font-semibold text-blue-500"
                    >
                      TODAY
                    </span>
                  </div>
                </div>
                <div class="text-sm font-semibold text-slate-400">
                  {{ day.date }}
                </div>
              </div>

              <div class="space-y-3 px-1 py-4">
                <div
                  v-for="task in day.tasks"
                  :key="task.id"
                  class="flex items-center justify-between rounded-2xl bg-slate-100 px-1 py-3 cursor-pointer transition"
                  :class="
                    activeCategory && task.category === activeCategory
                      ? 'ring-2 ring-slate-900/10 bg-white shadow-md scale-[1.01]'
                      : ''
                  "
                  @click="setActiveCategory(task.category)"
                >
                  <div class="flex items-center">
                    <Avatar
                      :image="task.avatar"
                      shape="circle"
                      class="h-9 w-9 border-2 border-white shadow-sm"
                    />
                    <div>
                      <div class="text-sm font-semibold text-slate-900">
                        {{ task.title }}
                      </div>
                      <div class="text-xs text-slate-500">
                        {{ task.category }}
                      </div>
                    </div>
                  </div>
                  <span
                    class="rounded-full px-3 py-1.5 text-xs font-semibold"
                    :class="task.badgeClass"
                  >
                    {{ task.badge }}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div class="flex">
          <div v-for="day in visibleCalendarWeekBottom" :key="day.id" class="flex-1">
            <div class="flex flex-col rounded-3xl bg-transparent">
              <div
                class="flex items-center justify-between border-b border-slate-100 px-2 py-3"
              >
                <div>
                  <div class="text-xs font-semibold text-slate-500">
                    {{ day.weekday }}
                  </div>
                </div>
                <div class="text-sm font-semibold text-slate-400">
                  {{ day.date }}
                </div>
              </div>

              <div class="space-y-3 px-1 py-4">
                <div
                  v-for="task in day.tasks"
                  :key="task.id"
                  class="flex items-center justify-between rounded-2xl bg-slate-100 px-1 py-3 cursor-pointer transition"
                  :class="
                    activeCategory && task.category === activeCategory
                      ? 'ring-2 ring-slate-900/10 bg-white shadow-md scale-[1.01]'
                      : ''
                  "
                  @click="setActiveCategory(task.category)"
                >
                  <div class="flex items-center">
                    <Avatar
                      :image="task.avatar"
                      shape="circle"
                      class="h-9 w-9 border-white"
                    />
                    <div>
                      <div class="text-sm font-semibold text-slate-900">
                        {{ task.title }}
                      </div>
                      <div class="text-xs text-slate-500">
                        {{ task.category }}
                      </div>
                    </div>
                  </div>
                  <span
                    class="rounded-full px-3 py-1.5 text-xs font-semibold"
                    :class="task.badgeClass"
                  >
                    {{ task.badge }}
                  </span>
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
import { ref, computed } from "vue";
import Avatar from "primevue/avatar";

// Timeline 日期循環
const baseTimelineDays = [
  "21",
  "22",
  "23",
  "24",
  "25",
  "26",
  "27",
  "28",
  "29",
  "30",
  "1",
  "2",
  "3",
  "4",
  "5",
];

const timelineOffset = ref(0);

const timelineDays = computed(() => {
  const len = baseTimelineDays.length;
  const offset = ((timelineOffset.value % len) + len) % len;
  const result = [];
  for (let i = 0; i < len; i++) {
    const index = (i + offset) % len;
    result.push(baseTimelineDays[index]);
  }
  return result;
});

const moveTimeline = (direction) => {
  if (direction === "prev") {
    timelineOffset.value -= 1;
  } else if (direction === "next") {
    timelineOffset.value += 1;
  }
};

// Timeline ↔ Calendar 連動用的類別
const activeCategory = ref(null);

const setActiveCategory = (category) => {
  if (activeCategory.value === category) {
    activeCategory.value = null;
  } else {
    activeCategory.value = category;
  }
};

// 週末顯示切換
const showWeekends = ref(false);

const toggleWeekends = () => {
  showWeekends.value = !showWeekends.value;
};

// 行事曆資料（上排）
const calendarWeekTopAll = [
  {
    id: 1,
    weekday: "Monday",
    date: "18",
    isToday: false,
    isWeekend: false,
    tasks: [
      {
        id: 1,
        title: "Email Marketing",
        category: "Advertising",
        avatar: "https://i.pravatar.cc/80?img=21",
        badge: "High",
        badgeClass: "bg-red-500 text-white",
      },
    ],
  },
  {
    id: 2,
    weekday: "Tuesday",
    date: "19",
    isToday: false,
    isWeekend: false,
    tasks: [
      {
        id: 1,
        title: "Design Review",
        category: "Branding",
        avatar: "https://i.pravatar.cc/80?img=22",
        badge: "Low",
        badgeClass: "bg-emerald-500 text-white",
      },
      {
        id: 2,
        title: "Customer Research",
        category: "Targeting",
        avatar: "https://i.pravatar.cc/80?img=23",
        badge: "Mid",
        badgeClass: "bg-amber-400 text-white",
      },
    ],
  },
  {
    id: 3,
    weekday: "Wednesday",
    date: "20",
    isToday: false,
    isWeekend: false,
    tasks: [
      {
        id: 1,
        title: "Customer Research",
        category: "Targeting",
        avatar: "https://i.pravatar.cc/80?img=24",
        badge: "Mid",
        badgeClass: "bg-amber-400 text-white",
      },
      {
        id: 2,
        title: "Email Marketing",
        category: "Advertising",
        avatar: "https://i.pravatar.cc/80?img=25",
        badge: "High",
        badgeClass: "bg-red-500 text-white",
      },
    ],
  },
  {
    id: 4,
    weekday: "Thursday",
    date: "21",
    isToday: true,
    isWeekend: false,
    tasks: [
      {
        id: 1,
        title: "Design Review",
        category: "Branding",
        avatar: "https://i.pravatar.cc/80?img=26",
        badge: "Low",
        badgeClass: "bg-emerald-500 text-white",
      },
      {
        id: 2,
        title: "Customer Research",
        category: "Targeting",
        avatar: "https://i.pravatar.cc/80?img=27",
        badge: "Mid",
        badgeClass: "bg-amber-400 text-white",
      },
    ],
  },
  {
    id: 5,
    weekday: "Friday",
    date: "22",
    isToday: false,
    isWeekend: false,
    tasks: [
      {
        id: 1,
        title: "Email Marketing",
        category: "Advertising",
        avatar: "https://i.pravatar.cc/80?img=28",
        badge: "High",
        badgeClass: "bg-red-500 text-white",
      },
    ],
  },
  {
    id: 6,
    weekday: "Saturday",
    date: "23",
    isToday: false,
    isWeekend: true,
    tasks: [],
  },
  {
    id: 7,
    weekday: "Sunday",
    date: "24",
    isToday: false,
    isWeekend: true,
    tasks: [],
  },
];

const visibleCalendarWeekTop = computed(() => {
  return showWeekends.value
    ? calendarWeekTopAll
    : calendarWeekTopAll.filter((day) => !day.isWeekend);
});

// 行事曆資料（下排）
const calendarWeekBottomAll = [
  {
    id: 1,
    weekday: "Monday",
    date: "25",
    isToday: false,
    isWeekend: false,
    tasks: [
      {
        id: 1,
        title: "Design Review",
        category: "Branding",
        avatar: "https://i.pravatar.cc/80?img=29",
        badge: "Low",
        badgeClass: "bg-emerald-500 text-white",
      },
      {
        id: 2,
        title: "Email Marketing",
        category: "Advertising",
        avatar: "https://i.pravatar.cc/80?img=30",
        badge: "High",
        badgeClass: "bg-red-500 text-white",
      },
      {
        id: 3,
        title: "Customer Research",
        category: "Targeting",
        avatar: "https://i.pravatar.cc/80?img=31",
        badge: "Mid",
        badgeClass: "bg-amber-400 text-white",
      },
    ],
  },
  {
    id: 2,
    weekday: "Tuesday",
    date: "26",
    isToday: false,
    isWeekend: false,
    tasks: [
      {
        id: 1,
        title: "Customer Research",
        category: "Targeting",
        avatar: "https://i.pravatar.cc/80?img=32",
        badge: "Mid",
        badgeClass: "bg-amber-400 text-white",
      },
    ],
  },
  {
    id: 3,
    weekday: "Wednesday",
    date: "27",
    isToday: false,
    isWeekend: false,
    tasks: [
      {
        id: 1,
        title: "Email Marketing",
        category: "Advertising",
        avatar: "https://i.pravatar.cc/80?img=33",
        badge: "High",
        badgeClass: "bg-red-500 text-white",
      },
      {
        id: 2,
        title: "Design Review",
        category: "Branding",
        avatar: "https://i.pravatar.cc/80?img=34",
        badge: "Low",
        badgeClass: "bg-emerald-500 text-white",
      },
    ],
  },
  {
    id: 4,
    weekday: "Thursday",
    date: "28",
    isToday: false,
    isWeekend: false,
    tasks: [
      {
        id: 1,
        title: "Design Review",
        category: "Branding",
        avatar: "https://i.pravatar.cc/80?img=35",
        badge: "Low",
        badgeClass: "bg-emerald-500 text-white",
      },
    ],
  },
  {
    id: 5,
    weekday: "Friday",
    date: "29",
    isToday: false,
    isWeekend: false,
    tasks: [
      {
        id: 1,
        title: "Email Marketing",
        category: "Advertising",
        avatar: "https://i.pravatar.cc/80?img=36",
        badge: "High",
        badgeClass: "bg-red-500 text-white",
      },
      {
        id: 2,
        title: "Customer Research",
        category: "Targeting",
        avatar: "https://i.pravatar.cc/80?img=37",
        badge: "Mid",
        badgeClass: "bg-amber-400 text-white",
      },
      {
        id: 3,
        title: "Design Review",
        category: "Branding",
        avatar: "https://i.pravatar.cc/80?img=38",
        badge: "Low",
        badgeClass: "bg-emerald-500 text-white",
      },
    ],
  },
  {
    id: 6,
    weekday: "Saturday",
    date: "30",
    isToday: false,
    isWeekend: true,
    tasks: [],
  },
  {
    id: 7,
    weekday: "Sunday",
    date: "31",
    isToday: false,
    isWeekend: true,
    tasks: [],
  },
];

const visibleCalendarWeekBottom = computed(() => {
  return showWeekends.value
    ? calendarWeekBottomAll
    : calendarWeekBottomAll.filter((day) => !day.isWeekend);
});
</script>
