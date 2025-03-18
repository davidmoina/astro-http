<template>
  <div v-if="isLoading">Loading...</div>

  <button v-else-if="likeCount === 0" @click="likePost">Like this post</button>

  <button v-else @click="likePost">
    Likes <span>{{ likeCount }}</span>
  </button>
</template>

<script lang="ts" setup>
import confetti from "canvas-confetti";
import debounce from "lodash.debounce";
import { ref, watch } from "vue";

interface Props {
  postId: string;
}

const props = defineProps<Props>();

const likeCount = ref(0);
const likeClicks = ref(0);
const isLoading = ref(true);

watch(
  likeCount,
  debounce(() => {
    fetch(`/api/posts/likes/${props.postId}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ likes: likeClicks.value }),
    });

    likeClicks.value = 0;
  }, 500)
);

const likePost = () => {
  likeCount.value++;
  likeClicks.value++;

  confetti({
    particleCount: 100,
    spread: 70,
    origin: {
      x: Math.random(),
      y: Math.random() - 0.2,
    },
  });
};

const getCurrentLikes = async () => {
  const response = await fetch(`/api/posts/likes/${props.postId}`);

  if (!response.ok) return;

  const data = await response.json();

  likeCount.value = data.likes;
  isLoading.value = false;
};

await getCurrentLikes();
</script>

<style scoped>
button {
  background-color: #5e51bc;
  color: #fff;
  border: none;
  border-radius: 4px;
  padding: 10px 20px;
  cursor: pointer;
  transition: all 0.3s;
}
</style>
