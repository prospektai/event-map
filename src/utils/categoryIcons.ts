import L from 'leaflet';
import type { EventCategory } from '../data/events';

export const categoryIcons: Record<EventCategory, string> = {
  Technology: '💻',
  Art: '🎨',
  Music: '🎵',
  Sports: '⚽',
  Food: '🍔',
  Education: '📚',
  Community: '🤝',
  Health: '❤️',
  Business: '💼',
  Science: '🔬',
};

export const getMarkerIcon = (category: EventCategory, isSelected: boolean) => {
  const backgroundColor = isSelected ? '#00bcd4' : 'white'; // Accent color for selected, white for others
  const borderColor = 'white'; // Always white border
  const textColor = 'white'; // White text for selected, black for others (changed to white for better contrast on accent color)

  const iconHtml = `
    <div style="
      background-color: ${backgroundColor};
      border: 2px solid ${borderColor};
      border-radius: 50%;
      width: 36px;
      height: 36px;
      display: flex;
      justify-content: center;
      align-items: center;
      font-size: 20px;
      color: ${textColor};
      box-shadow: 0 2px 5px rgba(0,0,0,0.2);
    ">
      ${categoryIcons[category]}
    </div>
  `;

  return L.divIcon({
    html: iconHtml,
    className: 'custom-marker-icon',
    iconSize: [36, 36], // Adjusted size for background
    iconAnchor: [18, 36], // Adjusted anchor
  });
};
