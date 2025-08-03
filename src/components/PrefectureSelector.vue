<template>
  <div class="prefecture-selector">
    <label for="prefecture-select" class="selector-label">
      都道府県を選択してください
    </label>
    <select
      id="prefecture-select"
      v-model="selectedPrefecture"
      @change="handlePrefectureChange"
      class="prefecture-select"
    >
      <option value="">選択してください</option>
      <optgroup
        v-for="(group, regionName) in groupedPrefectures"
        :key="regionName"
        :label="regionName"
      >
        <option
          v-for="prefecture in group"
          :key="prefecture.code"
          :value="prefecture.code"
        >
          {{ prefecture.name }}
        </option>
      </optgroup>
    </select>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { prefectures } from '../data/prefectures.js'

const emit = defineEmits(['prefecture-selected'])

const selectedPrefecture = ref('')

const groupedPrefectures = computed(() => {
  return prefectures.reduce((acc, prefecture) => {
    if (!acc[prefecture.region]) {
      acc[prefecture.region] = []
    }
    acc[prefecture.region].push(prefecture)
    return acc
  }, {})
})

const handlePrefectureChange = () => {
  const prefecture = prefectures.find(p => p.code === selectedPrefecture.value)
  if (prefecture) {
    emit('prefecture-selected', prefecture)
  }
}
</script>

<style scoped>
.prefecture-selector {
  margin: 1rem 0;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.selector-label {
  font-size: 0.9rem;
  color: #374151;
  font-weight: 500;
}

.prefecture-select {
  padding: 0.75rem;
  border: 2px solid #d1d5db;
  border-radius: 0.5rem;
  font-size: 1rem;
  background-color: white;
  cursor: pointer;
  transition: border-color 0.2s ease;
}

.prefecture-select:hover {
  border-color: #9ca3af;
}

.prefecture-select:focus {
  outline: none;
  border-color: #3b82f6;
  box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.1);
}

@media (max-width: 768px) {
  .prefecture-select {
    font-size: 1.1rem;
    padding: 1rem;
  }
}
</style>