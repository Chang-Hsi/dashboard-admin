<template>
  <div class="min-h-screen flex bg-slate-100">
    <DefaultSidebar />

    <div class="flex-1 flex flex-col min-w-0">
      <DefaultHeader />

      <main class="flex-1 px-4 md:px-8 py-6">
        <div class="mx-auto w-full max-w-6xl">
          <RouterView />
        </div>
      </main>
    </div>
  </div>
</template>

<script setup>
import { RouterView } from "vue-router";
import DefaultSidebar from "./components/DefaultSidebar.vue";
import DefaultHeader from "./components/DefaultHeader.vue";
</script>
