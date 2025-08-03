<template>
  <div class="weather-card">
    <div class="card-header">
      <h3 class="day-title">{{ title }}</h3>
      <div class="weather-icon">{{ weatherData.icon }}</div>
    </div>
    
    <div class="weather-content">
      <div class="weather-description">
        {{ weatherData.weather || '情報なし' }}
      </div>
      
      <div class="weather-details">
        <div class="temperature-range" v-if="weatherData.minTemp || weatherData.maxTemp">
          <span class="temp-label">気温:</span>
          <span class="temperature">
            <span v-if="weatherData.minTemp" class="min-temp">{{ weatherData.minTemp }}℃</span>
            <span v-if="weatherData.minTemp && weatherData.maxTemp" class="temp-separator"> / </span>
            <span v-if="weatherData.maxTemp" class="max-temp">{{ weatherData.maxTemp }}℃</span>
          </span>
        </div>
        
        <div class="precipitation" v-if="weatherData.precipitation !== undefined && weatherData.precipitation !== ''">
          <span class="precip-label">降水確率:</span>
          <span class="precip-value">{{ weatherData.precipitation }}%</span>
        </div>
        
        <div class="wind" v-if="weatherData.wind">
          <span class="wind-label">風:</span>
          <span class="wind-value">{{ weatherData.wind }}</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
defineProps({
  title: {
    type: String,
    required: true
  },
  weatherData: {
    type: Object,
    required: true
  }
})
</script>

<style scoped>
.weather-card {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  border-radius: 1rem;
  padding: 1.5rem;
  color: white;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  transition: transform 0.2s ease, box-shadow 0.2s ease;
}

.weather-card:hover {
  transform: translateY(-2px);
  box-shadow: 0 8px 15px rgba(0, 0, 0, 0.2);
}

.card-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1rem;
}

.day-title {
  font-size: 1.25rem;
  font-weight: 600;
  margin: 0;
}

.weather-icon {
  font-size: 2.5rem;
}

.weather-content {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.weather-description {
  font-size: 1.1rem;
  font-weight: 500;
  text-align: center;
  padding: 0.5rem;
  background-color: rgba(255, 255, 255, 0.1);
  border-radius: 0.5rem;
}

.weather-details {
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
}

.temperature-range,
.precipitation,
.wind {
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 0.95rem;
}

.temp-label,
.precip-label,
.wind-label {
  font-weight: 500;
  opacity: 0.9;
}

.temperature {
  font-weight: 600;
}

.min-temp {
  color: #93c5fd;
}

.max-temp {
  color: #fbbf24;
}

.temp-separator {
  opacity: 0.7;
  margin: 0 0.25rem;
}

.precip-value {
  font-weight: 600;
  color: #7dd3fc;
}

.wind-value {
  font-weight: 500;
  opacity: 0.9;
}

@media (max-width: 768px) {
  .weather-card {
    padding: 1.25rem;
  }
  
  .day-title {
    font-size: 1.1rem;
  }
  
  .weather-icon {
    font-size: 2rem;
  }
  
  .weather-description {
    font-size: 1rem;
  }
  
  .temperature-range,
  .precipitation,
  .wind {
    font-size: 0.9rem;
  }
}

@media (max-width: 480px) {
  .weather-details {
    gap: 0.5rem;
  }
  
  .temperature-range,
  .precipitation,
  .wind {
    flex-direction: column;
    align-items: flex-start;
    gap: 0.25rem;
  }
}
</style>