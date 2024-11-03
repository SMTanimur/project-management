export const COLORS = {
  ROSE: '#FF007F',
  SKY_BLUE: '#87CEEB',
  MINT_GREEN: '#98FF98',
  SUNSET_ORANGE: '#FF4500',
  DEEP_PURPLE: '#5D3FD3',
  AQUA_MARINE: '#7FFFD4',
  CORAL_PINK: '#F88379',
  EMERALD_GREEN: '#50C878',
  CRIMSON_RED: '#DC143C',
  SANDY_BROWN: '#F4A460',
  CYAN: '#00FFFF',
  FOREST_GREEN: '#228B22',
  AMBER: '#FFBF00',
};

export const CUSTOM_COLORS = {
  ROSE: '#FF007F',
  DEEP_PURPLE: '#5D3FD3',
  EMERALD_GREEN: '#50C878',
  CRIMSON_RED: '#DC143C',
  CYAN: '#00FFFF',
  AMBER: '#FFBF00',
}

// make array of colors key and value
export const COLORS_ARRAY = Object.values(CUSTOM_COLORS);

export function getRandomColor() {
  const colorValues = Object.values(COLORS); // Get all color values
  const randomIndex = Math.floor(Math.random() * colorValues.length); // Pick a random index
  return colorValues[randomIndex]; // Return the color value
}
