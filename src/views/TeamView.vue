<!-- src/views/TeamView.vue -->
<template>
  <div class="space-y-6 animate__animated animate__fadeInUp">
    <header class="space-y-1">
      <h1 class="text-2xl font-semibold text-slate-900">Team</h1>
      <p class="text-sm text-slate-500">
        管理團隊成員與角色，之後可以加上邀請、權限等功能。
      </p>
    </header>

    <Card>
      <template #title> 成員列表（示意） </template>
      <template #content>
        <ul class="divide-y divide-slate-100 text-sm">
          <li class="flex items-center justify-between py-3">
            <div>
              <div class="font-medium text-slate-800">Chang-Hsi</div>
              <div class="text-xs text-slate-500">Frontend Engineer</div>
            </div>
            <span class="text-xs text-amber-700 bg-amber-50 px-2 py-1 rounded-full">
              Owner
            </span>
          </li>
          <li class="flex items-center justify-between py-3">
            <div>
              <div class="font-medium text-slate-800">Teammate A</div>
              <div class="text-xs text-slate-500">Backend Engineer</div>
            </div>
            <span class="text-xs text-slate-600 bg-slate-50 px-2 py-1 rounded-full">
              Member
            </span>
          </li>
        </ul>
      </template>
    </Card>
  </div>
</template>

<script setup></script>
