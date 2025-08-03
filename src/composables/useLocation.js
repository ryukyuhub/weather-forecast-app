import { ref } from 'vue'
import { getClosestPrefecture } from '../data/prefectures.js'

export function useLocation() {
  const position = ref(null)
  const isLoading = ref(false)
  const error = ref(null)

  const getCurrentLocation = () => {
    return new Promise((resolve, reject) => {
      if (!navigator.geolocation) {
        reject(new Error('位置情報がサポートされていません'))
        return
      }

      isLoading.value = true
      error.value = null

      navigator.geolocation.getCurrentPosition(
        (pos) => {
          position.value = {
            latitude: pos.coords.latitude,
            longitude: pos.coords.longitude,
            accuracy: pos.coords.accuracy
          }
          isLoading.value = false
          resolve(position.value)
        },
        (err) => {
          isLoading.value = false
          let errorMessage = '位置情報の取得に失敗しました'
          
          switch (err.code) {
            case err.PERMISSION_DENIED:
              errorMessage = '位置情報へのアクセスが拒否されました'
              break
            case err.POSITION_UNAVAILABLE:
              errorMessage = '位置情報が利用できません'
              break
            case err.TIMEOUT:
              errorMessage = '位置情報の取得がタイムアウトしました'
              break
          }
          
          error.value = errorMessage
          reject(new Error(errorMessage))
        },
        {
          enableHighAccuracy: true,
          timeout: 10000,
          maximumAge: 300000
        }
      )
    })
  }

  const getPrefectureCode = (lat, lng) => {
    return getClosestPrefecture(lat, lng)
  }

  return {
    position,
    isLoading,
    error,
    getCurrentLocation,
    getPrefectureCode
  }
}