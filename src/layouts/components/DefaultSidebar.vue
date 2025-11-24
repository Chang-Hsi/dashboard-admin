<template>
  <aside
    class="flex min-h-screen flex-col bg-slate-100 px-4 py-5 sidebar-transition transition-all duration-500 ease-in-out overflow-hidden"
    :class="isCollapsed ? 'w-20' : 'w-64'"
  >
    <div class="flex items-center justify-between">
      <div v-if="!isCollapsed" class="flex items-center gap-2">
        <Squares2X2Icon class="h-7 w-7 text-slate-900" />
        <span class="text-xl font-semibold text-slate-900"> Dasher </span>
      </div>

      <button
        class="hidden rounded-full bg-white p-1.5 text-slate-500 hover:text-slate-900 md:inline-flex"
        @click="toggleCollapse"
      >
        <Bars3Icon class="h-4 w-4" />
      </button>
    </div>

    <nav class="mt-6 flex-1 space-y-1">
      <!-- 上方主要選單 -->
      <button
        v-for="item in mainNav"
        :key="item.id"
        class="flex w-full items-center rounded-3xl text-base font-medium transition-all duration-150"
        :class="[
          isCollapsed ? 'justify-center px-0 py-3' : 'justify-start px-3 py-3 gap-3',
          activeItem === item.id
            ? 'bg-white text-slate-900'
            : 'text-slate-500 hover:text-slate-900 hover:bg-white/80',
        ]"
        @click="handleNavClick(item)"
      >
        <component
          :is="item.icon"
          class="h-5 w-5"
          :class="activeItem === item.id ? 'text-slate-900' : 'text-slate-400'"
        />
        <span v-if="!isCollapsed">
          {{ item.label }}
        </span>

        <span v-if="item.badge && !isCollapsed" class="ml-auto">
          <Badge :value="item.badge" severity="info" />
        </span>
      </button>

      <div class="my-3 border-t border-slate-200" />

      <!-- 下方次要選單 + 子選單 -->
      <div v-for="item in secondaryNav" :key="item.id" class="space-y-1">
        <button
          class="flex w-full items-center rounded-2xl text-base font-medium transition-all duration-150"
          :class="[
            isCollapsed
              ? 'justify-center px-0 py-2.5'
              : 'justify-start px-3 py-2.5 gap-3',
            activeItem === item.id
              ? 'bg-white text-slate-900'
              : 'text-slate-500 hover:text-slate-900 hover:bg-white/80',
          ]"
          @click="handleNavClick(item)"
        >
          <component
            :is="item.icon"
            class="h-5 w-5"
            :class="activeItem === item.id ? 'text-slate-900' : 'text-slate-400'"
          />
          <span v-if="!isCollapsed">
            {{ item.label }}
          </span>
          <ChevronRightIcon
            v-if="item.hasChildren && !isCollapsed"
            class="ml-auto h-4 w-4 text-slate-400 transition-transform"
            :class="openParentId === item.id ? 'rotate-90' : ''"
          />
        </button>

        <div
          v-if="!isCollapsed && item.hasChildren && openParentId === item.id"
          class="pl-11 pt-1 flex flex-col space-y-1"
        >
          <button
            v-for="child in item.children"
            :key="child.id"
            class="w-full text-left text-base"
            :class="[
              'py-1',
              activeItem === child.id
                ? 'font-semibold text-indigo-500'
                : 'text-slate-500 hover:text-slate-900',
            ]"
            @click="handleChildClick(item, child)"
          >
            {{ child.label }}
          </button>
        </div>
      </div>
    </nav>

    <div class="mt-4 border-t border-slate-200 pt-4">
      <div
        class="flex items-center gap-3 rounded-2xl bg-white px-3 py-2"
        :class="isCollapsed ? 'justify-center' : ''"
      >
        <Avatar
          image="https://i.pravatar.cc/80?img=5"
          shape="circle"
          class="border border-slate-200"
        />
        <div v-if="!isCollapsed" class="min-w-0">
          <div class="truncate text-base font-medium text-slate-900">Jane Doe</div>
          <div class="truncate text-xs text-slate-500">UX/UI Designer</div>
        </div>
      </div>
    </div>
  </aside>
</template>

<script setup>
import { ref, watch } from "vue";
import { useRouter, useRoute } from "vue-router";
import Badge from "primevue/badge";
import Avatar from "primevue/avatar";

import {
  Squares2X2Icon,
  Bars3Icon,
  QueueListIcon,
  RectangleGroupIcon,
  ChatBubbleLeftRightIcon,
  UserIcon,
  PhotoIcon,
  BuildingOffice2Icon,
  BellIcon,
  Cog6ToothIcon,
  QuestionMarkCircleIcon,
  KeyIcon,
  Square3Stack3DIcon,
  WrenchScrewdriverIcon,
  ChevronRightIcon,
} from "@heroicons/vue/24/outline";

const router = useRouter();
const route = useRoute();

const isCollapsed = ref(false);
const activeItem = ref("all-tasks");
const openParentId = ref(null);

const mainNav = [
  { id: "all-tasks", label: "All Tasks", icon: QueueListIcon, routeName: "tasks" },
  { id: "timeline", label: "Timeline", icon: RectangleGroupIcon, routeName: "timeline" },
  {
    id: "messages",
    label: "Messages",
    icon: ChatBubbleLeftRightIcon,
    badge: 3,
    routeName: "messages",
  },
  { id: "profile", label: "Profile", icon: UserIcon, routeName: "profile" },
  { id: "contacts", label: "Contacts", icon: PhotoIcon, routeName: "contacts" },
  { id: "company", label: "Company", icon: BuildingOffice2Icon, routeName: "company" },
  {
    id: "notifications",
    label: "Notifications",
    icon: BellIcon,
    badge: 3,
    routeName: "notifications",
  },
];

const secondaryNav = [
  { id: "settings", label: "Settings", icon: Cog6ToothIcon, routeName: "settings" },
  {
    id: "help-center",
    label: "Help Center",
    icon: QuestionMarkCircleIcon,
    routeName: "help-center",
  },
  {
    id: "auth",
    label: "Authentication",
    icon: KeyIcon,
    hasChildren: true,
    children: [
      { id: "auth-sign-in", label: "Sign In", routeName: "auth-sign-in" },
      {
        id: "auth-reset-password",
        label: "Reset Password",
        routeName: "auth-reset-password",
      },
    ],
  },
  {
    id: "admin",
    label: "Admin Pages",
    icon: Square3Stack3DIcon,
    hasChildren: false,
    routeName: "admin-pages",
  },
  {
    id: "utility",
    label: "Utility Pages",
    icon: WrenchScrewdriverIcon,
    hasChildren: false,
    routeName: "utility-pages",
  },
];

const toggleCollapse = () => {
  isCollapsed.value = !isCollapsed.value;
  if (isCollapsed.value) {
    openParentId.value = null;
  }
};

const handleNavClick = (item) => {
  activeItem.value = item.id;

  if (item.hasChildren && !isCollapsed.value) {
    if (openParentId.value === item.id) {
      openParentId.value = null;
    } else {
      openParentId.value = item.id;
    }
  }

  if (item.routeName) {
    router.push({ name: item.routeName });
  }
};

const handleChildClick = (parent, child) => {
  activeItem.value = child.id;
  openParentId.value = parent.id;

  if (child.routeName) {
    router.push({ name: child.routeName });
  }
};

const updateActiveFromRoute = () => {
  const childItems = secondaryNav.flatMap((item) => item.children || []);
  const allItems = [...mainNav, ...secondaryNav, ...childItems];

  const current = allItems.find((item) => item.routeName === route.name);
  if (current) {
    activeItem.value = current.id;

    if (current.hasChildren) {
      openParentId.value = current.id;
    } else {
      const parentWithChildren = secondaryNav.find((p) =>
        (p.children || []).some((c) => c.id === current.id)
      );
      if (parentWithChildren) {
        openParentId.value = parentWithChildren.id;
      }
    }
  }
};

watch(
  () => route.name,
  () => {
    updateActiveFromRoute();
  },
  { immediate: true }
);
</script>
