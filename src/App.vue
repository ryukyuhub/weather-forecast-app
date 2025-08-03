<script setup>
import { ref, onMounted } from 'vue'
import { useLocation } from './composables/useLocation.js'
import { useWeather } from './composables/useWeather.js'
import { prefectures } from './data/prefectures.js'
import PrefectureSelector from './components/PrefectureSelector.vue'
import WeatherCard from './components/WeatherCard.vue'
import LoadingSpinner from './components/LoadingSpinner.vue'

const { position, isLoading: locationLoading, error: locationError, getCurrentLocation, getPrefectureCode } = useLocation()
const { weatherData, isLoading: weatherLoading, error: weatherError, fetchWeather } = useWeather()

const selectedPrefecture = ref(null)
const showPrefectureSelector = ref(false)

const loadWeatherData = async (prefectureCode) => {
  const prefecture = prefectures.find(p => p.code === prefectureCode)
  if (prefecture) {
    selectedPrefecture.value = prefecture
    await fetchWeather(prefectureCode)
  }
}

const handleLocationSuccess = async (pos) => {
  const prefectureCode = getPrefectureCode(pos.latitude, pos.longitude)
  await loadWeatherData(prefectureCode)
}

const handlePrefectureSelect = async (prefecture) => {
  await loadWeatherData(prefecture.code)
  showPrefectureSelector.value = false
}

const tryGetCurrentLocation = async () => {
  try {
    const pos = await getCurrentLocation()
    await handleLocationSuccess(pos)
  } catch (err) {
    showPrefectureSelector.value = true
  }
}

const showLocationSelector = () => {
  showPrefectureSelector.value = true
}

onMounted(() => {
  tryGetCurrentLocation()
})
</script>

<template>
  <div class="app">
    <header class="app-header">
      <h1 class="app-title">天気予報</h1>
      <button 
        v-if="selectedPrefecture && !showPrefectureSelector" 
        @click="showLocationSelector"
        class="location-button"
      >
        📍 {{ selectedPrefecture.name }}
      </button>
    </header>

    <main class="app-main">
      <div v-if="locationLoading" class="loading-section">
        <LoadingSpinner message="位置情報を取得中..." />
      </div>

      <div v-else-if="weatherLoading" class="loading-section">
        <LoadingSpinner message="天気予報を取得中..." />
      </div>

      <div v-else-if="showPrefectureSelector" class="selector-section">
        <PrefectureSelector @prefecture-selected="handlePrefectureSelect" />
        <div v-if="locationError" class="error-message">
          {{ locationError }}
        </div>
      </div>

      <div v-else-if="weatherError" class="error-section">
        <div class="error-message">
          {{ weatherError }}
        </div>
        <button @click="showLocationSelector" class="retry-button">
          地域を選択し直す
        </button>
      </div>

      <div v-else-if="weatherData" class="weather-section">
        <div class="weather-cards">
          <WeatherCard
            title="今日"
            :weather-data="weatherData.today"
          />
          <WeatherCard
            title="明日"
            :weather-data="weatherData.tomorrow"
          />
        </div>
        
        <div class="actions">
          <button @click="tryGetCurrentLocation" class="action-button">
            🔄 現在地で更新
          </button>
          <button @click="showLocationSelector" class="action-button">
            📍 地域を変更
          </button>
        </div>
      </div>
    </main>
  </div>
</template>

<style>
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

body {
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
  background: linear-gradient(135deg, #74b9ff 0%, #0984e3 100%);
  min-height: 100vh;
  color: #2d3436;
}

.app {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
}

.app-header {
  background-color: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(10px);
  padding: 1rem 1.5rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-bottom: 1px solid rgba(255, 255, 255, 0.2);
}

.app-title {
  color: white;
  font-size: 1.5rem;
  font-weight: 600;
}

.location-button {
  background-color: rgba(255, 255, 255, 0.2);
  border: 1px solid rgba(255, 255, 255, 0.3);
  color: white;
  padding: 0.5rem 1rem;
  border-radius: 0.5rem;
  cursor: pointer;
  font-size: 0.9rem;
  transition: background-color 0.2s ease;
}

.location-button:hover {
  background-color: rgba(255, 255, 255, 0.3);
}

.app-main {
  flex: 1;
  padding: 2rem 1.5rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  max-width: 800px;
  margin: 0 auto;
  width: 100%;
}

.loading-section,
.selector-section,
.error-section {
  background-color: rgba(255, 255, 255, 0.95);
  border-radius: 1rem;
  padding: 2rem;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  width: 100%;
  max-width: 400px;
}

.weather-section {
  width: 100%;
}

.weather-cards {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 1.5rem;
  margin-bottom: 2rem;
}

.actions {
  display: flex;
  gap: 1rem;
  justify-content: center;
  flex-wrap: wrap;
}

.action-button,
.retry-button {
  background-color: rgba(255, 255, 255, 0.9);
  border: none;
  padding: 0.75rem 1.5rem;
  border-radius: 0.5rem;
  cursor: pointer;
  font-size: 0.9rem;
  font-weight: 500;
  color: #2d3436;
  transition: background-color 0.2s ease, transform 0.2s ease;
}

.action-button:hover,
.retry-button:hover {
  background-color: white;
  transform: translateY(-1px);
}

.error-message {
  background-color: #fee2e2;
  color: #dc2626;
  padding: 1rem;
  border-radius: 0.5rem;
  margin-bottom: 1rem;
  text-align: center;
  border: 1px solid #fecaca;
}

@media (max-width: 768px) {
  .app-header {
    padding: 1rem;
    flex-direction: column;
    gap: 1rem;
    text-align: center;
  }
  
  .app-main {
    padding: 1rem;
  }
  
  .weather-cards {
    grid-template-columns: 1fr;
    gap: 1rem;
  }
  
  .actions {
    flex-direction: column;
    align-items: center;
  }
  
  .action-button,
  .retry-button {
    width: 100%;
    max-width: 200px;
  }
}

@media (max-width: 480px) {
  .app-title {
    font-size: 1.25rem;
  }
  
  .loading-section,
  .selector-section,
  .error-section {
    padding: 1.5rem;
  }
}
</style>
