<!-- src/views/ProjectsView.vue -->
<template>
  <div class="space-y-6 animate__animated animate__fadeInUp">
    <header class="flex items-center justify-between gap-3">
      <div>
        <h1 class="text-2xl font-semibold text-slate-900">Projects</h1>
        <p class="text-sm text-slate-500">
          專案列表與篩選，之後你可以改成 DataTable 風格。
        </p>
      </div>
      <Button label="新增專案" icon="pi pi-plus" />
    </header>

    <Card>
      <template #title> 專案列表（暫時假資料） </template>
      <template #content>
        <div class="space-y-2 text-sm">
          <div
            class="flex items-center justify-between py-2 border-b border-slate-100 last:border-0"
          >
            <span class="font-medium text-slate-800">Dashboard Admin 重構</span>
            <span class="text-xs text-emerald-600 bg-emerald-50 px-2 py-1 rounded-full">
              In Progress
            </span>
          </div>
          <div
            class="flex items-center justify-between py-2 border-b border-slate-100 last:border-0"
          >
            <span class="font-medium text-slate-800">行動版後台優化</span>
            <span class="text-xs text-slate-600 bg-slate-50 px-2 py-1 rounded-full">
              Planned
            </span>
          </div>
        </div>
      </template>
    </Card>
  </div>
</template>

<script setup></script>
