<template>
  <header class="flex items-center justify-between bg-slate-100 px-6 py-4">
    <!-- 左側搜尋框 -->
    <div class="flex w-full max-w-xl items-center">
      <div class="flex w-full items-center rounded-full bg-white px-4 py-2">
        <MagnifyingGlassIcon class="mr-2 h-4 w-4 text-slate-400" />
        <input
          v-model="search"
          type="text"
          placeholder="Search"
          class="w-full border-0 bg-transparent text-sm text-slate-700 placeholder:text-slate-400 focus:outline-none focus:ring-0"
        />
      </div>
    </div>

    <!-- 右側成員 + 圖標 -->
    <div class="ml-4 flex items-center gap-6">
      <!-- 成員頭像群 -->
      <div class="flex items-center gap-1">
        <div class="flex -space-x-3">
          <Avatar
            v-for="member in members"
            :key="member.id"
            :image="member.image"
            shape="circle"
            class="h-8 w-8 border-2 border-slate-50"
          />
        </div>

        <Avatar
          label="+8"
          shape="circle"
          class="h-8 w-8 bg-blue-600 text-xs font-semibold text-white"
        />
      </div>

      <!-- 右側圖標區 -->
      <div class="flex items-center gap-4">
        <!-- 通知 -->
        <button
          class="relative inline-flex items-center justify-center text-slate-700 hover:text-slate-900"
        >
          <BellIcon class="h-5 w-5" />
          <Badge
            severity="info"
            class="absolute -right-1 -top-1 h-2 w-2 rounded-full p-0"
          />
        </button>

        <!-- 購物車 -->
        <button
          class="relative inline-flex items-center justify-center text-slate-700 hover:text-slate-900"
        >
          <ShoppingCartIcon class="h-5 w-5" />
          <Badge
            value="0"
            severity="info"
            class="absolute -right-3 -top-1 px-1 text-[10px]"
          />
        </button>

        <!-- 設定 -->
        <button
          class="inline-flex items-center justify-center text-slate-700 hover:text-slate-900"
        >
          <Cog6ToothIcon class="h-5 w-5" />
        </button>
      </div>
    </div>
  </header>
</template>

<script setup>
import { ref } from "vue";
import Avatar from "primevue/avatar";
import Badge from "primevue/badge";
import {
  MagnifyingGlassIcon,
  BellIcon,
  ShoppingCartIcon,
  Cog6ToothIcon,
} from "@heroicons/vue/24/outline";

const search = ref("");

const members = [
  { id: 1, image: "https://i.pravatar.cc/72?img=1" },
  { id: 2, image: "https://i.pravatar.cc/72?img=2" },
  { id: 3, image: "https://i.pravatar.cc/72?img=3" },
  { id: 4, image: "https://i.pravatar.cc/72?img=4" },
];
</script>
