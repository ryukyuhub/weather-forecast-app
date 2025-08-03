export const prefectures = [
  { code: '016000', name: '北海道', region: '北海道' },
  { code: '020000', name: '青森県', region: '東北' },
  { code: '030000', name: '岩手県', region: '東北' },
  { code: '040000', name: '宮城県', region: '東北' },
  { code: '050000', name: '秋田県', region: '東北' },
  { code: '060000', name: '山形県', region: '東北' },
  { code: '070000', name: '福島県', region: '東北' },
  { code: '080000', name: '茨城県', region: '関東' },
  { code: '090000', name: '栃木県', region: '関東' },
  { code: '100000', name: '群馬県', region: '関東' },
  { code: '110000', name: '埼玉県', region: '関東' },
  { code: '120000', name: '千葉県', region: '関東' },
  { code: '130000', name: '東京都', region: '関東' },
  { code: '140000', name: '神奈川県', region: '関東' },
  { code: '150000', name: '新潟県', region: '北陸' },
  { code: '160000', name: '富山県', region: '北陸' },
  { code: '170000', name: '石川県', region: '北陸' },
  { code: '180000', name: '福井県', region: '北陸' },
  { code: '190000', name: '山梨県', region: '甲信' },
  { code: '200000', name: '長野県', region: '甲信' },
  { code: '210000', name: '岐阜県', region: '東海' },
  { code: '220000', name: '静岡県', region: '東海' },
  { code: '230000', name: '愛知県', region: '東海' },
  { code: '240000', name: '三重県', region: '東海' },
  { code: '250000', name: '滋賀県', region: '近畿' },
  { code: '260000', name: '京都府', region: '近畿' },
  { code: '270000', name: '大阪府', region: '近畿' },
  { code: '280000', name: '兵庫県', region: '近畿' },
  { code: '290000', name: '奈良県', region: '近畿' },
  { code: '300000', name: '和歌山県', region: '近畿' },
  { code: '310000', name: '鳥取県', region: '中国' },
  { code: '320000', name: '島根県', region: '中国' },
  { code: '330000', name: '岡山県', region: '中国' },
  { code: '340000', name: '広島県', region: '中国' },
  { code: '350000', name: '山口県', region: '中国' },
  { code: '360000', name: '徳島県', region: '四国' },
  { code: '370000', name: '香川県', region: '四国' },
  { code: '380000', name: '愛媛県', region: '四国' },
  { code: '390000', name: '高知県', region: '四国' },
  { code: '400000', name: '福岡県', region: '九州' },
  { code: '410000', name: '佐賀県', region: '九州' },
  { code: '420000', name: '長崎県', region: '九州' },
  { code: '430000', name: '熊本県', region: '九州' },
  { code: '440000', name: '大分県', region: '九州' },
  { code: '450000', name: '宮崎県', region: '九州' },
  { code: '460040', name: '鹿児島県', region: '九州' },
  { code: '471000', name: '沖縄県', region: '沖縄' }
];

export const getClosestPrefecture = (latitude, longitude) => {
  const prefectureCoords = {
    '016000': { lat: 43.0642, lng: 141.3469 },
    '020000': { lat: 40.8244, lng: 140.7400 },
    '030000': { lat: 39.7036, lng: 141.1527 },
    '040000': { lat: 38.2682, lng: 140.8721 },
    '050000': { lat: 39.7186, lng: 140.1024 },
    '060000': { lat: 38.2404, lng: 140.3633 },
    '070000': { lat: 37.7503, lng: 140.4676 },
    '080000': { lat: 36.3418, lng: 140.4468 },
    '090000': { lat: 36.5657, lng: 139.8836 },
    '100000': { lat: 36.3911, lng: 139.0607 },
    '110000': { lat: 35.8617, lng: 139.6455 },
    '120000': { lat: 35.6052, lng: 140.1233 },
    '130000': { lat: 35.6762, lng: 139.6503 },
    '140000': { lat: 35.4478, lng: 139.6425 },
    '150000': { lat: 37.9026, lng: 139.0235 },
    '160000': { lat: 36.6953, lng: 137.2113 },
    '170000': { lat: 36.5946, lng: 136.6256 },
    '180000': { lat: 36.0652, lng: 136.2216 },
    '190000': { lat: 35.6641, lng: 138.5684 },
    '200000': { lat: 36.6513, lng: 138.1811 },
    '210000': { lat: 35.3912, lng: 136.7223 },
    '220000': { lat: 34.9769, lng: 138.3831 },
    '230000': { lat: 35.1802, lng: 136.9066 },
    '240000': { lat: 34.7303, lng: 136.5086 },
    '250000': { lat: 35.0045, lng: 135.8684 },
    '260000': { lat: 35.0211, lng: 135.7556 },
    '270000': { lat: 34.6937, lng: 135.5023 },
    '280000': { lat: 34.6913, lng: 135.1830 },
    '290000': { lat: 34.6851, lng: 135.8050 },
    '300000': { lat: 34.2261, lng: 135.1675 },
    '310000': { lat: 35.5038, lng: 134.2381 },
    '320000': { lat: 35.4723, lng: 133.0505 },
    '330000': { lat: 34.6617, lng: 133.9349 },
    '340000': { lat: 34.3965, lng: 132.4596 },
    '350000': { lat: 34.1861, lng: 131.4707 },
    '360000': { lat: 34.0658, lng: 134.5593 },
    '370000': { lat: 34.3401, lng: 134.0434 },
    '380000': { lat: 33.8416, lng: 132.7657 },
    '390000': { lat: 33.5597, lng: 133.5311 },
    '400000': { lat: 33.6064, lng: 130.4181 },
    '410000': { lat: 33.2494, lng: 130.2989 },
    '420000': { lat: 32.7448, lng: 129.8737 },
    '430000': { lat: 32.7898, lng: 130.7417 },
    '440000': { lat: 33.2382, lng: 131.6126 },
    '450000': { lat: 31.9077, lng: 131.4202 },
    '460040': { lat: 31.5602, lng: 130.5581 },
    '471000': { lat: 26.2124, lng: 127.6792 }
  };

  let closestCode = '130000';
  let minDistance = Infinity;

  for (const [code, coords] of Object.entries(prefectureCoords)) {
    const distance = Math.sqrt(
      Math.pow(latitude - coords.lat, 2) + Math.pow(longitude - coords.lng, 2)
    );
    if (distance < minDistance) {
      minDistance = distance;
      closestCode = code;
    }
  }

  return closestCode;
};