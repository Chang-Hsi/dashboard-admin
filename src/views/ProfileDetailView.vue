<template>
  <div class="mx-auto max-w-6xl px-4 py-6 lg:flex lg:gap-6 lg:space-y-0 space-y-6">
    <section class="flex-1 space-y-6">
      <div class="overflow-hidden rounded-3xl bg-white shadow-sm">
        <div class="relative h-28">
          <div
            v-if="profile.bannerUrl"
            class="h-full w-full bg-cover bg-center"
            :style="{ backgroundImage: `url(${profile.bannerUrl})` }"
          />
          <div
            v-else
            class="h-full bg-linear-to-r from-indigo-500 via-purple-500 to-pink-500"
          />
          <div v-if="isEditing" class="absolute bottom-3 right-4">
            <label
              class="inline-flex cursor-pointer items-center rounded-full bg-white/80 px-3 py-1 text-[11px] font-semibold text-slate-700 shadow-sm"
            >
              Change banner
              <input
                type="file"
                accept="image/*"
                class="hidden"
                @change="onBannerChange"
              />
            </label>
          </div>
        </div>

        <div class="px-6 pb-6">
          <div class="-mt-12 flex items-end gap-4">
            <div class="relative">
              <Avatar
                :image="profile.avatarUrl"
                shape="circle"
                size="xlarge"
                class="h-20 w-20 border-4 border-white shadow-lg object-cover"
              />
              <label
                v-if="isEditing"
                class="absolute bottom-0 right-0 inline-flex h-7 w-7 cursor-pointer items-center justify-center rounded-full bg-white text-[10px] font-semibold text-slate-700 shadow-sm"
              >
                ✎
                <input
                  type="file"
                  accept="image/*"
                  class="hidden"
                  @change="onAvatarChange"
                />
              </label>
            </div>

            <div class="mt-8 relative top-5 flex-1">
              <div v-if="!isEditing">
                <h1 class="text-xl font-semibold text-slate-900">
                  {{ profile.name }}
                </h1>
                <p class="text-sm text-slate-500">
                  {{ profile.title }}
                </p>
              </div>
              <div v-else class="space-y-1">
                <InputText
                  v-model="profile.name"
                  placeholder="Name"
                  class="w-full text-sm font-semibold"
                />
                <InputText
                  v-model="profile.title"
                  placeholder="Title"
                  class="w-full text-sm"
                />
              </div>
            </div>
          </div>

          <div class="mt-6 border-t border-slate-100 pt-4 space-y-4">
            <div>
              <h2 class="mb-1 text-sm font-semibold text-slate-900">About</h2>

              <p v-if="!isEditing" class="text-sm leading-relaxed text-slate-600">
                {{ profile.about1 }}
              </p>
              <Textarea
                v-else
                v-model="profile.about1"
                autoResize
                rows="2"
                class="w-full text-sm leading-relaxed"
              />

              <p v-if="!isEditing" class="mt-2 text-sm leading-relaxed text-slate-600">
                {{ profile.about2 }}
              </p>
              <Textarea
                v-else
                v-model="profile.about2"
                autoResize
                rows="2"
                class="mt-2 w-full text-sm leading-relaxed"
              />

              <p v-if="!isEditing" class="mt-2 text-sm leading-relaxed text-slate-600">
                {{ profile.about3 }}
              </p>
              <Textarea
                v-else
                v-model="profile.about3"
                autoResize
                rows="2"
                class="mt-2 w-full text-sm leading-relaxed"
              />
            </div>

            <div class="flex items-center gap-3 pt-1">
              <span
                class="inline-flex items-center rounded-2xl bg-slate-100 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.16em] text-slate-500"
              >
                Top Skills
              </span>
              <span class="text-xs font-medium text-slate-700"> Webflow </span>
            </div>
          </div>
        </div>
      </div>

      <div class="rounded-3xl bg-white shadow-sm">
        <div
          class="border-b border-slate-100 px-6 py-4 flex items-center justify-between"
        >
          <h2 class="text-sm font-semibold text-slate-900">Experience</h2>
          <Button
            v-if="isEditing"
            label="Add"
            size="small"
            class="px-3! py-1.5! text-xs!"
            @click="addExperience"
          />
        </div>

        <div>
          <div
            v-for="exp in experiences"
            :key="exp.id"
            class="border-b border-slate-100 last:border-b-0 px-6 py-5"
          >
            <div class="flex items-start justify-between gap-4">
              <div class="flex items-start gap-4">
                <div>
                  <label
                    v-if="isEditing"
                    class="flex h-11 w-11 cursor-pointer items-center justify-center rounded-2xl bg-slate-100"
                  >
                    <input
                      type="file"
                      accept="image/*"
                      class="hidden"
                      @change="onExperienceLogoChange($event, exp.id)"
                    />
                    <img
                      v-if="exp.logoUrl"
                      :src="exp.logoUrl"
                      alt=""
                      class="h-7 w-7 rounded-md object-cover"
                    />
                    <span v-else class="text-xl">
                      {{ exp.logoText }}
                    </span>
                  </label>
                  <div
                    v-else
                    class="flex h-11 w-11 items-center justify-center rounded-2xl bg-slate-100"
                  >
                    <img
                      v-if="exp.logoUrl"
                      :src="exp.logoUrl"
                      alt=""
                      class="h-7 w-7 rounded-md object-cover"
                    />
                    <span v-else class="text-xl">
                      {{ exp.logoText }}
                    </span>
                  </div>
                </div>

                <div>
                  <div class="text-sm font-semibold text-slate-900">
                    <span v-if="!isEditing">
                      {{ exp.company }}
                    </span>
                    <InputText
                      v-else
                      v-model="exp.company"
                      class="mt-0.5 w-full text-sm"
                    />
                  </div>
                  <div class="text-xs text-slate-500">
                    <span v-if="!isEditing">
                      {{ exp.location }}
                    </span>
                    <InputText
                      v-else
                      v-model="exp.location"
                      class="mt-0.5 w-full text-xs"
                    />
                  </div>
                  <div
                    class="mt-1 text-[11px] uppercase tracking-[0.16em] text-slate-400"
                  >
                    <span v-if="!isEditing">
                      {{ exp.employmentType }}
                    </span>
                    <InputText
                      v-else
                      v-model="exp.employmentType"
                      class="mt-0.5 w-full text-[11px]"
                    />
                  </div>
                </div>
              </div>

              <div class="text-xs text-right text-slate-500">
                <div class="font-medium text-slate-700">
                  <span v-if="!isEditing">
                    {{ exp.period }}
                  </span>
                  <InputText
                    v-else
                    v-model="exp.period"
                    class="mt-0.5 w-full text-xs text-right"
                  />
                </div>
                <div class="mt-0.5">
                  <span v-if="!isEditing">
                    {{ exp.duration }}
                  </span>
                  <InputText
                    v-else
                    v-model="exp.duration"
                    class="mt-0.5 w-full text-xs text-right"
                  />
                </div>
                <Button
                  v-if="isEditing"
                  label="Delete"
                  size="small"
                  outlined
                  class="mt-2 px-2! py-1! text-[11px]!"
                  @click="removeExperience(exp.id)"
                />
              </div>
            </div>

            <p v-if="!isEditing" class="mt-4 text-sm leading-relaxed text-slate-600">
              {{ exp.description }}
            </p>
            <Textarea
              v-else
              v-model="exp.description"
              autoResize
              rows="3"
              class="mt-4 w-full text-sm leading-relaxed"
            />
          </div>
        </div>
      </div>
    </section>

    <section class="w-full lg:w-80 space-y-6">
      <div class="rounded-3xl bg-white p-5 shadow-sm">
        <div class="mb-4 flex items-center justify-between">
          <h2 class="text-sm font-semibold text-slate-900">Profile Details</h2>
          <div class="flex items-center gap-2">
            <Button
              v-if="!isEditing"
              label="Edit Profile"
              outlined
              size="small"
              class="px-3! py-1.5! text-xs!"
              @click="isEditing = true"
            />
            <Button
              v-else
              label="Done"
              size="small"
              class="px-3! py-1.5! text-xs! bg-slate-900 text-white border-slate-900"
              @click="isEditing = false"
            />
          </div>
        </div>

        <div class="space-y-4">
          <div v-for="detail in details" :key="detail.id" class="flex items-start gap-3">
            <div
              class="mt-0.5 flex h-9 w-9 items-center justify-center rounded-2xl bg-slate-100 text-slate-700"
            >
              <component :is="detail.icon" class="h-4 w-4" />
            </div>
            <div class="flex-1">
              <div
                class="text-[11px] font-semibold uppercase tracking-[0.16em] text-slate-400"
              >
                {{ detail.label }}
              </div>
              <div class="text-sm text-slate-800">
                <span v-if="!isEditing">
                  {{ detail.value }}
                </span>
                <InputText v-else v-model="detail.value" class="mt-1 w-full text-sm" />
              </div>
            </div>
          </div>
        </div>

        <div class="mt-5 border-t border-slate-100 pt-4">
          <div
            class="text-[11px] font-semibold uppercase tracking-[0.16em] text-slate-400"
          >
            Language
          </div>
          <div class="mt-1 text-sm text-slate-800">
            <span v-if="!isEditing">
              {{ profile.language }}
            </span>
            <InputText v-else v-model="profile.language" class="mt-1 w-full text-sm" />
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup>
import { ref } from "vue";
import Avatar from "primevue/avatar";
import Button from "primevue/button";
import InputText from "primevue/inputtext";
import Textarea from "primevue/textarea";
import {
  EnvelopeIcon,
  PhoneIcon,
  GlobeAltIcon,
  MapPinIcon,
} from "@heroicons/vue/24/outline";

const isEditing = ref(false);

const profile = ref({
  name: "Michelle Davis",
  title: "Webflow Dev @ TaskDasher",
  about1:
    "Lorem ipsum dolor sit amet, consectetur adipiscing elit. In ut nunc sed mauris dapibus varius. Donec placerat ante non mi luctus, a finibus ligula interdum.",
  about2:
    "Cras accumsan nibh tortor, vitae lobortis magna tincidunt eget. Suspendisse orci nisl, pellentesque commodo dignissim sed, cursus vel massa.",
  about3:
    "Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo.",
  avatarUrl: "https://i.pravatar.cc/160?img=64",
  bannerUrl: "",
  language: "English",
});

const experiences = ref([
  {
    id: 1,
    logoText: "G",
    logoUrl: "",
    company: "Google",
    location: "Mountain View, CA",
    employmentType: "Full time",
    period: "May 2023 - Present",
    duration: "4 mos",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse varius enim in eros elementum tristique. Duis cursus, mi quis viverra ornare, eros dolor interdum nulla, ut commodo diam libero vitae erat.",
  },
  {
    id: 2,
    logoText: "",
    logoUrl: "",
    company: "Apple",
    location: "Apple Park, CA",
    employmentType: "Full time",
    period: "Nov 2020 - May 2023",
    duration: "2 yrs 7 mos",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse varius enim in eros elementum tristique. Duis cursus, mi quis viverra ornare, eros dolor interdum nulla, ut commodo diam libero vitae erat.",
  },
  {
    id: 3,
    logoText: "■",
    logoUrl: "",
    company: "Microsoft",
    location: "Redmond, WA",
    employmentType: "Full time",
    period: "Oct 2018 - Nov 2020",
    duration: "2 yrs 2 mos",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse varius enim in eros elementum tristique. Duis cursus, mi quis viverra ornare, eros dolor interdum nulla, ut commodo diam libero vitae erat.",
  },
]);

const details = ref([
  {
    id: "email",
    label: "Email",
    value: "michelle@mail.com",
    icon: EnvelopeIcon,
  },
  {
    id: "phone",
    label: "Phone Number",
    value: "+ (123) 456 789",
    icon: PhoneIcon,
  },
  {
    id: "website",
    label: "Website",
    value: "taskdasher.com",
    icon: GlobeAltIcon,
  },
  {
    id: "location",
    label: "Location",
    value: "New York City",
    icon: MapPinIcon,
  },
]);

const readImageFile = (event, setter) => {
  const files = event.target.files;
  if (!files || !files.length) return;
  const file = files[0];
  const reader = new FileReader();
  reader.onload = () => {
    setter(reader.result);
  };
  reader.readAsDataURL(file);
};

const onAvatarChange = (event) => {
  readImageFile(event, (dataUrl) => {
    profile.value.avatarUrl = dataUrl;
  });
  event.target.value = "";
};

const onBannerChange = (event) => {
  readImageFile(event, (dataUrl) => {
    profile.value.bannerUrl = dataUrl;
  });
  event.target.value = "";
};

const onExperienceLogoChange = (event, id) => {
  readImageFile(event, (dataUrl) => {
    const exp = experiences.value.find((e) => e.id === id);
    if (exp) {
      exp.logoUrl = dataUrl;
    }
  });
  event.target.value = "";
};

const addExperience = () => {
  const nextId = experiences.value.length
    ? Math.max(...experiences.value.map((e) => e.id)) + 1
    : 1;

  experiences.value.push({
    id: nextId,
    logoText: "🏢",
    logoUrl: "",
    company: "New Company",
    location: "Location",
    employmentType: "Full time",
    period: "2024 - Present",
    duration: "0 yrs",
    description: "Describe your role and responsibilities here.",
  });
};

const removeExperience = (id) => {
  experiences.value = experiences.value.filter((e) => e.id !== id);
};
</script>
