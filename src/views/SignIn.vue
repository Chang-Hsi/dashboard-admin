<!-- src/views/LoginPolicyView.vue -->
<template>
  <section class="rounded-3xl bg-white p-5 shadow-sm">
    <div class="mb-4 flex items-center justify-between">
      <div>
        <h2 class="text-base font-semibold text-slate-900">LOGIN & PASSWORD POLICY</h2>
        <p class="mt-1 text-sm text-slate-500">管理帳號格式、密碼強度與登入安全規則</p>
      </div>
      <div class="flex items-center gap-2 text-sm text-slate-500">
        <span
          class="inline-flex items-center rounded-full bg-slate-100 px-3 py-1 font-medium text-slate-700"
        >
          <ShieldCheckIcon class="mr-1 h-3.5 w-3.5" />
          {{ totalRulesLabel }}
        </span>
      </div>
    </div>

    <div class="overflow-x-auto">
      <table class="min-w-full text-left text-base">
        <thead>
          <tr
            class="border-b border-slate-100 text-sm font-semibold uppercase tracking-[0.16em] text-slate-400"
          >
            <th class="px-3 py-2">Rule</th>
            <th class="px-3 py-2">Enabled</th>
            <th class="px-3 py-2">Current Policy</th>
            <th class="px-3 py-2"></th>
          </tr>
        </thead>
        <tbody>
          <tr
            v-for="rule in passwordRules"
            :key="rule.id"
            class="border-b border-slate-100 last:border-0 hover:bg-slate-50/40"
          >
            <td class="px-3 py-3 align-middle">
              <div class="flex items-start gap-3">
                <div
                  class="mt-0.5 flex h-9 w-9 items-center justify-center rounded-full bg-slate-100"
                >
                  <component :is="rule.icon" class="h-5 w-5 text-slate-900" />
                </div>
                <div>
                  <div class="text-base font-semibold text-slate-900">
                    {{ rule.name }}
                  </div>
                  <div class="mt-0.5 text-sm text-slate-500">
                    {{ rule.description }}
                  </div>
                </div>
              </div>
            </td>

            <td class="px-3 py-3 align-middle">
              <div class="flex items-center gap-2">
                <InputSwitch v-model="rule.enabled" />
              </div>
            </td>

            <td class="px-3 py-3 align-middle">
              <span class="text-sm text-slate-700">
                {{ getRuleSummary(rule) }}
              </span>
            </td>

            <td class="px-3 py-3 align-middle">
              <div class="flex items-center justify-end gap-2">
                <button
                  type="button"
                  class="inline-flex items-center rounded-full bg-slate-100 px-3 py-1 text-sm font-semibold text-slate-700 hover:bg-slate-200"
                  @click="openRuleDialog(rule)"
                >
                  <Cog6ToothIcon class="mr-1 h-4 w-4" />
                  設定
                </button>
              </div>
            </td>
          </tr>
        </tbody>
      </table>
    </div>

    <Dialog
      v-model:visible="dialogVisible"
      :modal="true"
      :draggable="false"
      :closable="false"
      :style="{ width: '520px' }"
      class="rounded-3xl"
    >
      <template #header>
        <div class="flex w-full items-center justify-between">
          <div class="flex items-center gap-3">
            <div
              class="flex h-9 w-9 items-center justify-center rounded-full bg-slate-100"
            >
              <component
                v-if="activeRule"
                :is="activeRule.icon"
                class="h-5 w-5 text-slate-900"
              />
            </div>
            <div>
              <div class="text-base font-semibold text-slate-900">
                {{ activeRule?.name }}
              </div>
              <div v-if="activeRule" class="text-sm text-slate-500">
                {{ activeRule.description }}
              </div>
            </div>
          </div>
          <button
            type="button"
            class="rounded-full p-1 text-slate-400 hover:bg-slate-100 hover:text-slate-700"
            @click="closeDialog"
          >
            <XMarkIcon class="h-4 w-4" />
          </button>
        </div>
      </template>

      <div v-if="activeRule" class="space-y-5">
        <div class="flex items-center justify-between rounded-2xl bg-slate-50 px-4 py-3">
          <div class="flex items-center gap-2">
            <ShieldCheckIcon class="h-4 w-4 text-slate-500" />
            <div>
              <div class="text-sm font-medium text-slate-800">啟用此規則</div>
              <div class="text-xs text-slate-500">關閉後，系統不會套用此安全規則。</div>
            </div>
          </div>
          <InputSwitch v-model="activeRule.enabled" />
        </div>

        <div v-if="activeRule.key === 'login-id-format'" class="space-y-4">
          <div class="rounded-2xl bg-slate-50 px-4 py-3">
            <div
              class="mb-2 flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.18em] text-slate-500"
            >
              <UserCircleIcon class="h-4 w-4" />
              <span>帳號類型</span>
            </div>
            <div class="flex flex-col gap-2 text-sm text-slate-700">
              <label class="flex items-center gap-2">
                <input
                  v-model="activeRule.config.type"
                  type="radio"
                  class="h-3.5 w-3.5 border-slate-300 text-slate-900 focus:ring-slate-500"
                  value="email"
                />
                <span>Email 作為登入帳號</span>
              </label>
              <label class="flex items-center gap-2">
                <input
                  v-model="activeRule.config.type"
                  type="radio"
                  class="h-3.5 w-3.5 border-slate-300 text-slate-900 focus:ring-slate-500"
                  value="phone"
                />
                <span>手機號碼作為登入帳號</span>
              </label>
              <label class="flex items-center gap-2">
                <input
                  v-model="activeRule.config.type"
                  type="radio"
                  class="h-3.5 w-3.5 border-slate-300 text-slate-900 focus:ring-slate-500"
                  value="username"
                />
                <span>自訂帳號（使用者名稱）</span>
              </label>
            </div>
          </div>

          <div
            v-if="activeRule.config.type === 'phone'"
            class="rounded-2xl bg-slate-50 px-4 py-3"
          >
            <div
              class="mb-2 flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.18em] text-slate-500"
            >
              <PhoneIcon class="h-4 w-4" />
              <span>手機設定</span>
            </div>
            <div class="flex flex-col gap-3 text-sm text-slate-700">
              <div class="flex items-center gap-3">
                <div class="w-32">
                  <div class="text-xs text-slate-500">國碼</div>
                  <input
                    v-model="activeRule.config.phoneCountryCode"
                    type="text"
                    class="mt-1 h-9 w-full rounded-lg border border-slate-300 px-3 text-sm outline-none focus:border-slate-500 focus:ring-0"
                  />
                </div>
                <div class="flex-1">
                  <div class="text-xs text-slate-500">手機號碼長度</div>
                  <input
                    v-model.number="activeRule.config.phoneLength"
                    type="number"
                    min="6"
                    max="15"
                    class="mt-1 h-9 w-full rounded-lg border border-slate-300 px-3 text-sm outline-none focus:border-slate-500 focus:ring-0"
                  />
                </div>
              </div>
            </div>
          </div>

          <div
            v-if="activeRule.config.type === 'username'"
            class="rounded-2xl bg-slate-50 px-4 py-3"
          >
            <div
              class="mb-2 flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.18em] text-slate-500"
            >
              <IdentificationIcon class="h-4 w-4" />
              <span>自訂帳號規則</span>
            </div>
            <div class="flex flex-col gap-3 text-sm text-slate-700">
              <div class="flex items-center gap-3">
                <div class="flex-1">
                  <div class="text-xs text-slate-500">最小長度</div>
                  <input
                    v-model.number="activeRule.config.usernameMinLength"
                    type="number"
                    min="1"
                    class="mt-1 h-9 w-full rounded-lg border border-slate-300 px-3 text-sm outline-none focus:border-slate-500 focus:ring-0"
                  />
                </div>
                <div class="flex-1">
                  <div class="text-xs text-slate-500">最大長度</div>
                  <input
                    v-model.number="activeRule.config.usernameMaxLength"
                    type="number"
                    min="1"
                    class="mt-1 h-9 w-full rounded-lg border border-slate-300 px-3 text-sm outline-none focus:border-slate-500 focus:ring-0"
                  />
                </div>
              </div>
              <p class="text-xs text-slate-500">
                建議允許英數與底線，實際檢查可交由後端實作。
              </p>
            </div>
          </div>
        </div>

        <div v-if="activeRule.key === 'password-complexity'" class="space-y-4">
          <div class="rounded-2xl bg-slate-50 px-4 py-3">
            <div
              class="mb-2 flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.18em] text-slate-500"
            >
              <LockClosedIcon class="h-4 w-4" />
              <span>基本長度</span>
            </div>
            <div class="flex items-center gap-3 text-sm text-slate-700">
              <div class="w-40">
                <div class="text-xs text-slate-500">最小長度</div>
                <input
                  v-model.number="activeRule.config.minLength"
                  type="number"
                  min="4"
                  class="mt-1 h-9 w-full rounded-lg border border-slate-300 px-3 text-sm outline-none focus:border-slate-500 focus:ring-0"
                />
              </div>
              <p class="text-xs text-slate-500">通常建議至少 8 碼以上以提升安全性。</p>
            </div>
          </div>

          <div class="rounded-2xl bg-slate-50 px-4 py-3">
            <div
              class="mb-2 flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.18em] text-slate-500"
            >
              <KeyIcon class="h-4 w-4" />
              <span>必須包含的字元</span>
            </div>
            <div class="flex flex-col gap-2 text-sm text-slate-700">
              <label class="flex items-center gap-2">
                <input
                  v-model="activeRule.config.requireUppercase"
                  type="checkbox"
                  class="h-3.5 w-3.5 rounded border-slate-300 text-slate-900 focus:ring-slate-500"
                />
                <span>至少一個大寫英文</span>
              </label>
              <label class="flex items-center gap-2">
                <input
                  v-model="activeRule.config.requireLowercase"
                  type="checkbox"
                  class="h-3.5 w-3.5 rounded border-slate-300 text-slate-900 focus:ring-slate-500"
                />
                <span>至少一個小寫英文</span>
              </label>
              <label class="flex items-center gap-2">
                <input
                  v-model="activeRule.config.requireNumbers"
                  type="checkbox"
                  class="h-3.5 w-3.5 rounded border-slate-300 text-slate-900 focus:ring-slate-500"
                />
                <span>至少一個數字</span>
              </label>
              <label class="flex items-center gap-2">
                <input
                  v-model="activeRule.config.requireSymbols"
                  type="checkbox"
                  class="h-3.5 w-3.5 rounded border-slate-300 text-slate-900 focus:ring-slate-500"
                />
                <span>至少一個特殊符號（例如 !@#$%）</span>
              </label>
            </div>
          </div>

          <div class="rounded-2xl bg-slate-50 px-4 py-3">
            <div
              class="mb-2 flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.18em] text-slate-500"
            >
              <ExclamationTriangleIcon class="h-4 w-4" />
              <span>禁止內容</span>
            </div>
            <div class="flex flex-col gap-2 text-sm text-slate-700">
              <label class="flex items-center gap-2">
                <input
                  v-model="activeRule.config.forbidContainingId"
                  type="checkbox"
                  class="h-3.5 w-3.5 rounded border-slate-300 text-slate-900 focus:ring-slate-500"
                />
                <span>不可包含登入帳號（Email / 帳號名稱）</span>
              </label>
              <label class="flex items-center gap-2">
                <input
                  v-model="activeRule.config.forbidSequential"
                  type="checkbox"
                  class="h-3.5 w-3.5 rounded border-slate-300 text-slate-900 focus:ring-slate-500"
                />
                <span>避免明顯連號（例如 1234、abcd 等）</span>
              </label>
            </div>
          </div>
        </div>

        <div v-if="activeRule.key === 'password-expiration'" class="space-y-4">
          <div class="rounded-2xl bg-slate-50 px-4 py-3">
            <div
              class="mb-2 flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.18em] text-slate-500"
            >
              <ClockIcon class="h-4 w-4" />
              <span>密碼有效期限</span>
            </div>
            <div class="flex flex-col gap-3 text-sm text-slate-700">
              <label class="flex items-center gap-2">
                <input
                  v-model="activeRule.config.expirationMode"
                  type="radio"
                  class="h-3.5 w-3.5 border-slate-300 text-slate-900 focus:ring-slate-500"
                  value="never"
                />
                <span>永不過期</span>
              </label>
              <label class="flex items-center gap-2">
                <input
                  v-model="activeRule.config.expirationMode"
                  type="radio"
                  class="h-3.5 w-3.5 border-slate-300 text-slate-900 focus:ring-slate-500"
                  value="days"
                />
                <span>每隔一段時間必須更換密碼</span>
              </label>

              <div
                v-if="activeRule.config.expirationMode === 'days'"
                class="mt-1 flex items-center gap-3"
              >
                <div class="w-40">
                  <div class="text-xs text-slate-500">有效天數</div>
                  <input
                    v-model.number="activeRule.config.expirationDays"
                    type="number"
                    min="1"
                    class="mt-1 h-9 w-full rounded-lg border border-slate-300 px-3 text-sm outline-none focus:border-slate-500 focus:ring-0"
                  />
                </div>
                <p class="text-xs text-slate-500">
                  常見設定為 60、90 或 180 天，視安全需求而定。
                </p>
              </div>
            </div>
          </div>
        </div>

        <div v-if="activeRule.key === 'password-history'" class="space-y-4">
          <div class="rounded-2xl bg-slate-50 px-4 py-3">
            <div
              class="mb-2 flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.18em] text-slate-500"
            >
              <ArrowPathRoundedSquareIcon class="h-4 w-4" />
              <span>歷史密碼限制</span>
            </div>
            <div class="flex items-center gap-3 text-sm text-slate-700">
              <div class="w-40">
                <div class="text-xs text-slate-500">禁止重複最近幾組密碼</div>
                <input
                  v-model.number="activeRule.config.rememberCount"
                  type="number"
                  min="0"
                  class="mt-1 h-9 w-full rounded-lg border border-slate-300 px-3 text-sm outline-none focus:border-slate-500 focus:ring-0"
                />
              </div>
              <p class="text-xs text-slate-500">
                設為 0 代表不檢查歷史密碼，建議至少 3 組以上。
              </p>
            </div>
          </div>
        </div>

        <div v-if="activeRule.key === 'login-lockout'" class="space-y-4">
          <div class="rounded-2xl bg-slate-50 px-4 py-3">
            <div
              class="mb-2 flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.18em] text-slate-500"
            >
              <NoSymbolIcon class="h-4 w-4" />
              <span>登入失敗次數</span>
            </div>
            <div class="flex items-center gap-3 text-sm text-slate-700">
              <div class="w-40">
                <div class="text-xs text-slate-500">允許連續失敗次數</div>
                <input
                  v-model.number="activeRule.config.maxFailedAttempts"
                  type="number"
                  min="1"
                  class="mt-1 h-9 w-full rounded-lg border border-slate-300 px-3 text-sm outline-none focus:border-slate-500 focus:ring-0"
                />
              </div>
              <p class="text-xs text-slate-500">
                達到上限後將暫時鎖定帳號，以避免暴力破解。
              </p>
            </div>
          </div>

          <div class="rounded-2xl bg-slate-50 px-4 py-3">
            <div
              class="mb-2 flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.18em] text-slate-500"
            >
              <LockClosedIcon class="h-4 w-4" />
              <span>鎖定方式</span>
            </div>
            <div class="flex flex-col gap-3 text-sm text-slate-700">
              <div class="flex items-center gap-3">
                <div class="w-40">
                  <div class="text-xs text-slate-500">鎖定時間（分鐘）</div>
                  <input
                    v-model.number="activeRule.config.lockoutMinutes"
                    type="number"
                    min="1"
                    class="mt-1 h-9 w-full rounded-lg border border-slate-300 px-3 text-sm outline-none focus:border-slate-500 focus:ring-0"
                  />
                </div>
                <p class="text-xs text-slate-500">
                  使用者需等待鎖定時間結束後才能再次嘗試登入。
                </p>
              </div>
              <label class="flex items-center gap-2">
                <input
                  v-model="activeRule.config.requireAdminUnlock"
                  type="checkbox"
                  class="h-3.5 w-3.5 rounded border-slate-300 text-slate-900 focus:ring-slate-500"
                />
                <span>需要管理員手動解鎖嚴重鎖定的帳號</span>
              </label>
            </div>
          </div>
        </div>

        <div v-if="activeRule.key === 'two-factor-auth'" class="space-y-4">
          <div class="rounded-2xl bg-slate-50 px-4 py-3">
            <div
              class="mb-2 flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.18em] text-slate-500"
            >
              <FingerPrintIcon class="h-4 w-4" />
              <span>兩步驟驗證</span>
            </div>
            <div class="flex flex-col gap-3 text-sm text-slate-700">
              <p class="text-xs text-slate-500">
                建議對管理員或敏感操作啟用兩步驟驗證，以提升帳號安全性。
              </p>
              <div class="flex flex-col gap-2">
                <label class="flex items-center gap-2">
                  <input
                    v-model="activeRule.config.methods"
                    type="checkbox"
                    class="h-3.5 w-3.5 rounded border-slate-300 text-slate-900 focus:ring-slate-500"
                    value="email"
                  />
                  <span>Email 驗證碼</span>
                </label>
                <label class="flex items-center gap-2">
                  <input
                    v-model="activeRule.config.methods"
                    type="checkbox"
                    class="h-3.5 w-3.5 rounded border-slate-300 text-slate-900 focus:ring-slate-500"
                    value="sms"
                  />
                  <span>簡訊驗證碼（SMS）</span>
                </label>
                <label class="flex items-center gap-2">
                  <input
                    v-model="activeRule.config.methods"
                    type="checkbox"
                    class="h-3.5 w-3.5 rounded border-slate-300 text-slate-900 focus:ring-slate-500"
                    value="app"
                  />
                  <span>驗證器 App（例如 Google Authenticator）</span>
                </label>
              </div>
            </div>
          </div>
        </div>
      </div>

      <template #footer>
        <div class="flex w-full items-center justify-between">
          <button
            type="button"
            class="inline-flex items-center rounded-full px-4 py-1.5 text-sm font-medium text-slate-500 hover:bg-slate-100"
            @click="closeDialog"
          >
            取消
          </button>
          <button
            type="button"
            class="inline-flex items-center rounded-full bg-slate-900 px-5 py-1.5 text-sm font-semibold text-white hover:bg-slate-800"
            @click="saveDialog"
          >
            儲存設定
          </button>
        </div>
      </template>
    </Dialog>
  </section>
</template>

<script setup>
import { ref, computed } from "vue";
import Dialog from "primevue/dialog";
import InputSwitch from "primevue/inputswitch";

import {
  ShieldCheckIcon,
  Cog6ToothIcon,
  XMarkIcon,
  KeyIcon,
  LockClosedIcon,
  ExclamationTriangleIcon,
  ClockIcon,
  ArrowPathRoundedSquareIcon,
  NoSymbolIcon,
  FingerPrintIcon,
  UserCircleIcon,
  IdentificationIcon,
  PhoneIcon,
} from "@heroicons/vue/24/outline";

// 規則列表（之後可以改成從 API 取得）
const passwordRules = ref([
  {
    id: 1,
    key: "login-id-format",
    name: "帳號格式 Login ID",
    description: "決定使用 Email、手機或自訂帳號作為登入帳號。",
    icon: UserCircleIcon,
    enabled: true,
    config: {
      type: "email",
      phoneCountryCode: "+886",
      phoneLength: 10,
      usernameMinLength: 4,
      usernameMaxLength: 20,
    },
  },
  {
    id: 2,
    key: "password-complexity",
    name: "密碼長度與複雜度",
    description: "設定密碼最小長度與必須包含的字元種類。",
    icon: LockClosedIcon,
    enabled: true,
    config: {
      minLength: 8,
      requireUppercase: true,
      requireLowercase: true,
      requireNumbers: true,
      requireSymbols: false,
      forbidContainingId: true,
      forbidSequential: true,
    },
  },
  {
    id: 3,
    key: "password-expiration",
    name: "密碼有效期限",
    description: "控制密碼需要多久重新設定一次。",
    icon: ClockIcon,
    enabled: true,
    config: {
      expirationMode: "days", // never / days
      expirationDays: 90,
    },
  },
  {
    id: 4,
    key: "password-history",
    name: "歷史密碼限制",
    description: "限制使用者不可重複最近幾組密碼。",
    icon: ArrowPathRoundedSquareIcon,
    enabled: true,
    config: {
      rememberCount: 3,
    },
  },
  {
    id: 5,
    key: "login-lockout",
    name: "登入失敗鎖定",
    description: "防止多次嘗試錯誤密碼造成的暴力破解攻擊。",
    icon: NoSymbolIcon,
    enabled: true,
    config: {
      maxFailedAttempts: 5,
      lockoutMinutes: 10,
      requireAdminUnlock: false,
    },
  },
  {
    id: 6,
    key: "two-factor-auth",
    name: "兩步驟驗證 2FA",
    description: "針對重要帳號或敏感操作啟用額外驗證流程。",
    icon: FingerPrintIcon,
    enabled: false,
    config: {
      methods: ["email"],
    },
  },
]);

const dialogVisible = ref(false);
const activeRule = ref(null);

const totalRulesLabel = computed(() => {
  const total = passwordRules.value.length;
  const enabled = passwordRules.value.filter((r) => r.enabled).length;
  return `${enabled} / ${total} RULES ENABLED`;
});

// 規則摘要字串（表格中顯示用）
const getRuleSummary = (rule) => {
  if (!rule.enabled) {
    return "此規則目前未啟用";
  }

  switch (rule.key) {
    case "login-id-format": {
      const type = rule.config.type;
      if (type === "email") {
        return "使用 Email 作為登入帳號";
      }
      if (type === "phone") {
        return `使用手機號碼登入 (${rule.config.phoneCountryCode}, 長度 ${rule.config.phoneLength} 碼)`;
      }
      if (type === "username") {
        return `自訂帳號，長度 ${rule.config.usernameMinLength}～${rule.config.usernameMaxLength} 碼`;
      }
      return "帳號格式設定中";
    }
    case "password-complexity": {
      const parts = [];
      parts.push(`至少 ${rule.config.minLength} 碼`);
      const requirements = [];
      if (rule.config.requireUppercase) requirements.push("大寫");
      if (rule.config.requireLowercase) requirements.push("小寫");
      if (rule.config.requireNumbers) requirements.push("數字");
      if (rule.config.requireSymbols) requirements.push("符號");
      if (requirements.length) {
        parts.push(`需含 ${requirements.join("、")}`);
      }
      return parts.join("，");
    }
    case "password-expiration": {
      if (rule.config.expirationMode === "never") {
        return "密碼永不過期";
      }
      if (rule.config.expirationMode === "days" && rule.config.expirationDays) {
        return `密碼每 ${rule.config.expirationDays} 天必須更換一次`;
      }
      return "密碼有效期限已啟用";
    }
    case "password-history": {
      const n = rule.config.rememberCount;
      if (!n || n <= 0) {
        return "不限制歷史密碼重複";
      }
      return `不得重複最近 ${n} 組密碼`;
    }
    case "login-lockout": {
      const max = rule.config.maxFailedAttempts;
      const minutes = rule.config.lockoutMinutes;
      let text = `連續登入失敗 ${max} 次，鎖定 ${minutes} 分鐘`;
      if (rule.config.requireAdminUnlock) {
        text += "，嚴重情況需管理員解鎖";
      }
      return text;
    }
    case "two-factor-auth": {
      const methods = rule.config.methods || [];
      if (!methods.length) {
        return "已啟用 2FA，但尚未選擇驗證方式";
      }
      const map = {
        email: "Email 驗證碼",
        sms: "簡訊驗證碼",
        app: "驗證器 App",
      };
      const labels = methods.map((m) => map[m] || m);
      return `已啟用 2FA：${labels.join("、")}`;
    }
    default:
      return "已啟用";
  }
};

// 開啟 Dialog（複製一份規則出來編輯，避免未存就影響列表）
const openRuleDialog = (rule) => {
  const cloned = JSON.parse(JSON.stringify(rule));
  activeRule.value = {
    ...cloned,
    icon: rule.icon,
  };
  dialogVisible.value = true;
};

const closeDialog = () => {
  dialogVisible.value = false;
  activeRule.value = null;
};

// 儲存 Dialog 內容回列表（之後可以在這裡串 API）
const saveDialog = () => {
  if (!activeRule.value) return;

  const index = passwordRules.value.findIndex((r) => r.id === activeRule.value.id);
  if (index !== -1) {
    passwordRules.value[index] = {
      ...passwordRules.value[index],
      enabled: activeRule.value.enabled,
      config: {
        ...activeRule.value.config,
      },
    };
  }

  closeDialog();
};
</script>
