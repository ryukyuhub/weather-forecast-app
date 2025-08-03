import { ref } from 'vue'

export function useWeather() {
  const weatherData = ref(null)
  const isLoading = ref(false)
  const error = ref(null)

  const weatherCodes = {
    100: { text: '晴れ', icon: '☀️' },
    101: { text: '晴れ時々曇り', icon: '🌤️' },
    102: { text: '晴れ一時雨', icon: '🌦️' },
    103: { text: '晴れ時々雨', icon: '🌦️' },
    104: { text: '晴れ一時雪', icon: '🌨️' },
    105: { text: '晴れ時々雪', icon: '🌨️' },
    106: { text: '晴れ一時雨か雪', icon: '🌦️' },
    107: { text: '晴れ時々雨か雪', icon: '🌦️' },
    108: { text: '晴れ一時雨か雷雨', icon: '⛈️' },
    110: { text: '晴れ後時々曇り', icon: '🌤️' },
    111: { text: '晴れ後曇り', icon: '🌥️' },
    112: { text: '晴れ後一時雨', icon: '🌦️' },
    113: { text: '晴れ後時々雨', icon: '🌦️' },
    114: { text: '晴れ後雨', icon: '🌧️' },
    115: { text: '晴れ後一時雪', icon: '🌨️' },
    116: { text: '晴れ後時々雪', icon: '🌨️' },
    117: { text: '晴れ後雪', icon: '❄️' },
    118: { text: '晴れ後雨か雪', icon: '🌦️' },
    119: { text: '晴れ後雨か雷雨', icon: '⛈️' },
    120: { text: '晴れ朝夕一時雨', icon: '🌦️' },
    121: { text: '晴れ朝の内一時雨', icon: '🌦️' },
    122: { text: '晴れ夕方一時雨', icon: '🌦️' },
    123: { text: '晴れ山沿い雷雨', icon: '⛈️' },
    124: { text: '晴れ山沿い雪', icon: '🌨️' },
    125: { text: '晴れ午後は雷雨', icon: '⛈️' },
    126: { text: '晴れ昼頃から雨', icon: '🌦️' },
    127: { text: '晴れ夕方から雨', icon: '🌦️' },
    128: { text: '晴れ夜は雨', icon: '🌧️' },
    130: { text: '朝の内霧後晴れ', icon: '🌫️' },
    131: { text: '晴れ明け方霧', icon: '🌫️' },
    132: { text: '晴れ朝夕曇り', icon: '🌤️' },
    140: { text: '晴れ時々雨で雷を伴う', icon: '⛈️' },
    160: { text: '晴れ一時雪か雨', icon: '🌨️' },
    170: { text: '晴れ時々雪か雨', icon: '🌨️' },
    181: { text: '晴れ後雪か雨', icon: '🌨️' },
    200: { text: '曇り', icon: '☁️' },
    201: { text: '曇り時々晴れ', icon: '⛅' },
    202: { text: '曇り一時雨', icon: '🌦️' },
    203: { text: '曇り時々雨', icon: '🌦️' },
    204: { text: '曇り一時雪', icon: '🌨️' },
    205: { text: '曇り時々雪', icon: '🌨️' },
    206: { text: '曇り一時雨か雪', icon: '🌦️' },
    207: { text: '曇り時々雨か雪', icon: '🌦️' },
    208: { text: '曇り一時雨か雷雨', icon: '⛈️' },
    209: { text: '霧', icon: '🌫️' },
    210: { text: '曇り後時々晴れ', icon: '⛅' },
    211: { text: '曇り後晴れ', icon: '⛅' },
    212: { text: '曇り後一時雨', icon: '🌦️' },
    213: { text: '曇り後時々雨', icon: '🌦️' },
    214: { text: '曇り後雨', icon: '🌧️' },
    215: { text: '曇り後一時雪', icon: '🌨️' },
    216: { text: '曇り後時々雪', icon: '🌨️' },
    217: { text: '曇り後雪', icon: '❄️' },
    218: { text: '曇り後雨か雪', icon: '🌦️' },
    219: { text: '曇り後雨か雷雨', icon: '⛈️' },
    220: { text: '曇り朝夕一時雨', icon: '🌦️' },
    221: { text: '曇り朝の内一時雨', icon: '🌦️' },
    222: { text: '曇り夕方一時雨', icon: '🌦️' },
    223: { text: '曇り日中時々晴れ', icon: '⛅' },
    224: { text: '曇り昼頃から雨', icon: '🌦️' },
    225: { text: '曇り夕方から雨', icon: '🌦️' },
    226: { text: '曇り夜は雨', icon: '🌧️' },
    228: { text: '曇り昼頃から雪', icon: '🌨️' },
    229: { text: '曇り夕方から雪', icon: '🌨️' },
    230: { text: '曇り夜は雪', icon: '❄️' },
    231: { text: '曇り海上海岸は霧か霧雨', icon: '🌫️' },
    240: { text: '曇り時々雨で雷を伴う', icon: '⛈️' },
    250: { text: '曇り時々雪で雷を伴う', icon: '⛈️' },
    260: { text: '曇り一時雪か雨', icon: '🌨️' },
    270: { text: '曇り時々雪か雨', icon: '🌨️' },
    281: { text: '曇り後雪か雨', icon: '🌨️' },
    300: { text: '雨', icon: '🌧️' },
    301: { text: '雨時々晴れ', icon: '🌦️' },
    302: { text: '雨時々止む', icon: '🌦️' },
    303: { text: '雨時々雪', icon: '🌨️' },
    304: { text: '雨か雪', icon: '🌨️' },
    306: { text: '大雨', icon: '🌧️' },
    308: { text: '雨で暴風を伴う', icon: '💨' },
    309: { text: '雨一時雪', icon: '🌨️' },
    311: { text: '雨後晴れ', icon: '🌦️' },
    313: { text: '雨後曇り', icon: '🌦️' },
    314: { text: '雨後時々雪', icon: '🌨️' },
    315: { text: '雨後雪', icon: '❄️' },
    316: { text: '雨か雪後晴れ', icon: '🌦️' },
    317: { text: '雨か雪後曇り', icon: '☁️' },
    320: { text: '朝の内雨後晴れ', icon: '🌦️' },
    321: { text: '朝の内雨後曇り', icon: '🌦️' },
    322: { text: '雨朝晩一時雪', icon: '🌨️' },
    323: { text: '雨昼頃から晴れ', icon: '🌦️' },
    324: { text: '雨夕方から晴れ', icon: '🌦️' },
    325: { text: '雨夜は晴', icon: '🌦️' },
    326: { text: '雨夕方から雪', icon: '🌨️' },
    327: { text: '雨夜は雪', icon: '❄️' },
    328: { text: '雨一時強く降る', icon: '🌧️' },
    329: { text: '雨一時みぞれ', icon: '🌨️' },
    340: { text: '雪か雨', icon: '🌨️' },
    350: { text: 'み雨', icon: '🌦️' },
    361: { text: '雪か雨後晴れ', icon: '🌨️' },
    371: { text: '雪か雨後曇り', icon: '🌨️' },
    400: { text: '雪', icon: '❄️' },
    401: { text: '雪時々晴れ', icon: '🌨️' },
    402: { text: '雪時々止む', icon: '🌨️' },
    403: { text: '雪時々雨', icon: '🌨️' },
    405: { text: '大雪', icon: '❄️' },
    406: { text: 'み雪', icon: '🌨️' },
    407: { text: '暴風雪', icon: '❄️' },
    409: { text: '雪一時雨', icon: '🌨️' },
    411: { text: '雪後晴れ', icon: '🌨️' },
    413: { text: '雪後曇り', icon: '☁️' },
    414: { text: '雪後雨', icon: '🌧️' },
    420: { text: '朝の内雪後晴れ', icon: '🌨️' },
    421: { text: '朝の内雪後曇り', icon: '🌨️' },
    422: { text: '雪昼頃から雨', icon: '🌨️' },
    423: { text: '雪夕方から雨', icon: '🌨️' },
    425: { text: '雪一時強く降る', icon: '❄️' },
    426: { text: '雪後みぞれ', icon: '🌨️' },
    427: { text: '雪一時みぞれ', icon: '🌨️' }
  }

  const getWeatherText = (code) => {
    return weatherCodes[code]?.text || '不明'
  }

  const getWeatherIcon = (code) => {
    return weatherCodes[code]?.icon || '❓'
  }

  const fetchWeather = async (areaCode) => {
    isLoading.value = true
    error.value = null

    try {
      const response = await fetch(`https://www.jma.go.jp/bosai/forecast/data/forecast/${areaCode}.json`)
      
      if (!response.ok) {
        throw new Error('天気予報データの取得に失敗しました')
      }

      const data = await response.json()
      
      if (!data || data.length === 0) {
        throw new Error('天気予報データが見つかりません')
      }

      const forecast = data[0]
      const timeSeries = forecast.timeSeries

      const today = new Date()
      const tomorrow = new Date(today)
      tomorrow.setDate(tomorrow.getDate() + 1)

      const formatDate = (date) => {
        return date.toISOString().split('T')[0]
      }

      const todayStr = formatDate(today)
      const tomorrowStr = formatDate(tomorrow)

      const weatherTimeSeries = timeSeries.find(ts => ts.areas[0].weathers)
      const tempTimeSeries = timeSeries.find(ts => ts.areas[0].temps)
      const windTimeSeries = timeSeries.find(ts => ts.areas[0].winds)
      const popTimeSeries = timeSeries.find(ts => ts.areas[0].pops)

      const processedData = {
        area: forecast.reportDatetime,
        publishingOffice: forecast.publishingOffice,
        today: {},
        tomorrow: {}
      }

      if (weatherTimeSeries) {
        const times = weatherTimeSeries.timeDefines
        const weathers = weatherTimeSeries.areas[0].weathers
        const weatherCodes = weatherTimeSeries.areas[0].weatherCodes

        times.forEach((time, index) => {
          const date = new Date(time).toISOString().split('T')[0]
          if (date === todayStr) {
            processedData.today.weather = weathers[index]
            processedData.today.weatherCode = weatherCodes[index]
            processedData.today.icon = getWeatherIcon(parseInt(weatherCodes[index]))
          } else if (date === tomorrowStr) {
            processedData.tomorrow.weather = weathers[index]
            processedData.tomorrow.weatherCode = weatherCodes[index]
            processedData.tomorrow.icon = getWeatherIcon(parseInt(weatherCodes[index]))
          }
        })
      }

      if (tempTimeSeries) {
        const times = tempTimeSeries.timeDefines
        const temps = tempTimeSeries.areas[0].temps

        times.forEach((time, index) => {
          const date = new Date(time).toISOString().split('T')[0]
          const hour = new Date(time).getHours()
          
          if (date === todayStr) {
            if (hour === 6) processedData.today.minTemp = temps[index]
            if (hour === 18) processedData.today.maxTemp = temps[index]
          } else if (date === tomorrowStr) {
            if (hour === 6) processedData.tomorrow.minTemp = temps[index]
            if (hour === 18) processedData.tomorrow.maxTemp = temps[index]
          }
        })
      }

      if (windTimeSeries) {
        const times = windTimeSeries.timeDefines
        const winds = windTimeSeries.areas[0].winds

        times.forEach((time, index) => {
          const date = new Date(time).toISOString().split('T')[0]
          if (date === todayStr) {
            processedData.today.wind = winds[index]
          } else if (date === tomorrowStr) {
            processedData.tomorrow.wind = winds[index]
          }
        })
      }

      if (popTimeSeries) {
        const times = popTimeSeries.timeDefines
        const pops = popTimeSeries.areas[0].pops

        let todayPops = []
        let tomorrowPops = []

        times.forEach((time, index) => {
          const date = new Date(time).toISOString().split('T')[0]
          if (date === todayStr) {
            todayPops.push(pops[index])
          } else if (date === tomorrowStr) {
            tomorrowPops.push(pops[index])
          }
        })

        if (todayPops.length > 0) {
          processedData.today.precipitation = Math.max(...todayPops.filter(p => p !== '' && p !== '--'))
        }
        if (tomorrowPops.length > 0) {
          processedData.tomorrow.precipitation = Math.max(...tomorrowPops.filter(p => p !== '' && p !== '--'))
        }
      }

      weatherData.value = processedData
    } catch (err) {
      error.value = err.message
      console.error('Weather fetch error:', err)
    } finally {
      isLoading.value = false
    }
  }

  return {
    weatherData,
    isLoading,
    error,
    fetchWeather,
    getWeatherText,
    getWeatherIcon
  }
}