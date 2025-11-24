<!-- src/views/HelpCenterView.vue -->
<template>
  <div class="space-y-6">
    <div class="-m-2 flex flex-wrap">
      <button
        v-for="(item, index) in topics"
        :key="item.id"
        type="button"
        class="m-2 flex w-full flex-col rounded-3xl bg-white p-6 text-left shadow-sm ring-1 ring-slate-100 transition hover:-translate-y-0.5 hover:shadow-md hover:ring-slate-200 sm:w-[calc(50%-1rem)] lg:w-[calc(33.333%-1rem)] animate__animated animate__fadeIn"
        :style="{ animationDelay: index * 0.15 + 's' }"
        @click="goDetail(item)"
      >
        <div class="flex flex-1 flex-col items-center justify-center text-center">
          <div
            class="mb-4 flex h-9 w-9 items-center justify-center rounded-full bg-slate-100"
          >
            <component :is="item.icon" class="h-5 w-5 text-slate-900" />
          </div>
          <h2 class="text-base font-semibold text-slate-900">
            {{ item.title }}
          </h2>
          <p class="mt-2 text-sm text-slate-500 px-4">
            {{ item.description }}
          </p>
        </div>

        <div
          class="mt-6 flex items-center justify-center text-sm font-semibold text-slate-500"
        >
          <span class="mr-2">查看詳情</span>
          <ArrowRightIcon class="h-4 w-4" />
        </div>
      </button>
    </div>
  </div>
</template>

<script setup>
import { useRouter } from "vue-router";
import {
  DocumentTextIcon,
  ShieldCheckIcon,
  UserGroupIcon,
  BanknotesIcon,
  GlobeAltIcon,
  ChatBubbleLeftRightIcon,
  ArrowRightIcon,
} from "@heroicons/vue/24/outline";
import "animate.css";

const router = useRouter();

const topics = [
  {
    id: "service-policy",
    title: "服務政策",
    description: "說明我們提供服務的範圍、使用方式與服務中斷、變更的相關規範。",
    icon: DocumentTextIcon,
  },
  {
    id: "privacy-policy",
    title: "隱私權政策",
    description: "說明如何蒐集、使用與保護您的個人資料，以及您的相關權利。",
    icon: ShieldCheckIcon,
  },
  {
    id: "member-terms",
    title: "會員條款",
    description: "會員註冊、帳號使用、停權與終止服務等相關使用條款說明。",
    icon: UserGroupIcon,
  },
  {
    id: "payment-refund",
    title: "付款與退款政策",
    description: "付款方式、帳單說明，以及退款與取消訂單之處理流程與條件。",
    icon: BanknotesIcon,
  },
  {
    id: "data-security",
    title: "資料與帳號安全",
    description: "系統資料安全措施、登入風險提示與帳號保護相關建議。",
    icon: GlobeAltIcon,
  },
  {
    id: "contact-support",
    title: "聯絡與客服機制",
    description: "如何聯絡客服、回覆時間、申訴與問題處理流程說明。",
    icon: ChatBubbleLeftRightIcon,
  },
];

const goDetail = (item) => {
  router.push({
    name: "help-detail",
    params: { id: item.id },
  });
};
</script>
