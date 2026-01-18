// 10 World-Class Theme Presets for Widgets
// Each theme includes complete styling for container + content

export const themePresets = [
    {
        id: 'minimal-light',
        name: 'Minimal Light',
        emoji: '☀️',
        description: 'Clean and bright',
        // Widget container theme
        container: {
            backgroundColor: '#FFFFFF',
            backgroundOpacity: 0.95,
            transparent: false,
            borderRadius: 16,
            borderWidth: 0,
            borderColor: '#E5E7EB',
            borderStyle: 'solid',
            blur: 8,
            brightness: 1,
            contrast: 1,
            shadowColor: 'rgba(0,0,0,0.1)',
            shadowBlur: 20,
            shadowX: 0,
            shadowY: 4,
            headerBackgroundColor: '#F3F4F6',
            headerTextColor: '#1F2937'
        },
        // Clock-specific config
        clock: {
            timeColor: '#1F2937',
            locationColor: '#6B7280',
            fontFamily: 'system'
        }
    },
    {
        id: 'dark-elegance',
        name: 'Dark Elegance',
        emoji: '🌙',
        description: 'Sophisticated dark theme',
        container: {
            backgroundColor: '#1F2937',
            backgroundOpacity: 0.98,
            transparent: false,
            borderRadius: 20,
            borderWidth: 1,
            borderColor: '#374151',
            borderStyle: 'solid',
            blur: 12,
            brightness: 0.95,
            contrast: 1.05,
            shadowColor: 'rgba(0,0,0,0.5)',
            shadowBlur: 30,
            shadowX: 0,
            shadowY: 8,
            headerBackgroundColor: '#111827',
            headerTextColor: '#F9FAFB'
        },
        clock: {
            timeColor: '#F9FAFB',
            locationColor: '#9CA3AF',
            fontFamily: 'helvetica'
        }
    },
    {
        id: 'ocean-breeze',
        name: 'Ocean Breeze',
        emoji: '🌊',
        description: 'Cool blue tones',
        container: {
            backgroundColor: '#0EA5E9',
            backgroundOpacity: 0.25,
            transparent: false,
            borderRadius: 24,
            borderWidth: 2,
            borderColor: '#0284C7',
            borderStyle: 'solid',
            blur: 15,
            brightness: 1.1,
            contrast: 1,
            shadowColor: 'rgba(14,165,233,0.3)',
            shadowBlur: 25,
            shadowX: 0,
            shadowY: 6,
            headerBackgroundColor: '#0284C7',
            headerTextColor: '#FFFFFF'
        },
        clock: {
            timeColor: '#0C4A6E',
            locationColor: '#0369A1',
            fontFamily: 'verdana'
        }
    },
    {
        id: 'sunset-glow',
        name: 'Sunset Glow',
        emoji: '🌅',
        description: 'Warm gradient vibes',
        container: {
            backgroundColor: '#F97316',
            backgroundOpacity: 0.35,
            transparent: false,
            borderRadius: 20,
            borderWidth: 0,
            borderColor: '#EA580C',
            borderStyle: 'solid',
            blur: 18,
            brightness: 1.15,
            contrast: 1,
            shadowColor: 'rgba(249,115,22,0.4)',
            shadowBlur: 28,
            shadowX: 0,
            shadowY: 8,
            headerBackgroundColor: '#EA580C',
            headerTextColor: '#FFFFFF'
        },
        clock: {
            timeColor: '#7C2D12',
            locationColor: '#C2410C',
            fontFamily: 'georgia'
        }
    },
    {
        id: 'forest-zen',
        name: 'Forest Zen',
        emoji: '🌲',
        description: 'Natural green calm',
        container: {
            backgroundColor: '#10B981',
            backgroundOpacity: 0.28,
            transparent: false,
            borderRadius: 18,
            borderWidth: 2,
            borderColor: '#059669',
            borderStyle: 'solid',
            blur: 14,
            brightness: 1.05,
            contrast: 1,
            shadowColor: 'rgba(16,185,129,0.25)',
            shadowBlur: 22,
            shadowX: 0,
            shadowY: 5,
            headerBackgroundColor: '#059669',
            headerTextColor: '#FFFFFF'
        },
        clock: {
            timeColor: '#064E3B',
            locationColor: '#047857',
            fontFamily: 'trebuchet'
        }
    },
    {
        id: 'neon-cyber',
        name: 'Neon Cyber',
        emoji: '⚡',
        description: 'Futuristic neon',
        container: {
            backgroundColor: '#8B5CF6',
            backgroundOpacity: 0.22,
            transparent: false,
            borderRadius: 12,
            borderWidth: 3,
            borderColor: '#A78BFA',
            borderStyle: 'solid',
            blur: 20,
            brightness: 1.2,
            contrast: 1.1,
            shadowColor: 'rgba(139,92,246,0.5)',
            shadowBlur: 35,
            shadowX: 0,
            shadowY: 10,
            headerBackgroundColor: '#6D28D9',
            headerTextColor: '#E9D5FF'
        },
        clock: {
            timeColor: '#DDD6FE',
            locationColor: '#C4B5FD',
            fontFamily: 'courier'
        }
    },
    {
        id: 'rose-gold',
        name: 'Rose Gold',
        emoji: '🌸',
        description: 'Elegant pink luxury',
        container: {
            backgroundColor: '#EC4899',
            backgroundOpacity: 0.30,
            transparent: false,
            borderRadius: 22,
            borderWidth: 1,
            borderColor: '#F9A8D4',
            borderStyle: 'solid',
            blur: 16,
            brightness: 1.08,
            contrast: 1,
            shadowColor: 'rgba(236,72,153,0.3)',
            shadowBlur: 24,
            shadowX: 0,
            shadowY: 6,
            headerBackgroundColor: '#DB2777',
            headerTextColor: '#FDF2F8'
        },
        clock: {
            timeColor: '#831843',
            locationColor: '#BE185D',
            fontFamily: 'georgia'
        }
    },
    {
        id: 'monochrome',
        name: 'Monochrome',
        emoji: '⬛',
        description: 'Pure black & white',
        container: {
            backgroundColor: '#000000',
            backgroundOpacity: 0.85,
            transparent: false,
            borderRadius: 8,
            borderWidth: 2,
            borderColor: '#FFFFFF',
            borderStyle: 'solid',
            blur: 0,
            brightness: 1,
            contrast: 1.15,
            shadowColor: 'rgba(255,255,255,0.2)',
            shadowBlur: 15,
            shadowX: 0,
            shadowY: 4,
            headerBackgroundColor: '#FFFFFF',
            headerTextColor: '#000000'
        },
        clock: {
            timeColor: '#FFFFFF',
            locationColor: '#D1D5DB',
            fontFamily: 'arial'
        }
    },
    {
        id: 'classic-bw',
        name: 'Classic B&W',
        emoji: '⬜',
        description: 'Timeless white & black',
        container: {
            backgroundColor: '#FFFFFF',
            backgroundOpacity: 0.95,
            transparent: false,
            borderRadius: 8,
            borderWidth: 2,
            borderColor: '#000000',
            borderStyle: 'solid',
            blur: 0,
            brightness: 1,
            contrast: 1.1,
            shadowColor: 'rgba(0,0,0,0.15)',
            shadowBlur: 12,
            shadowX: 0,
            shadowY: 3,
            headerBackgroundColor: '#000000',
            headerTextColor: '#FFFFFF'
        },
        clock: {
            timeColor: '#000000',
            locationColor: '#4B5563',
            fontFamily: 'arial'
        }
    },
    {
        id: 'glass-morphism',
        name: 'Glass Morphism',
        emoji: '💎',
        description: 'Modern frosted glass',
        container: {
            backgroundColor: '#FFFFFF',
            backgroundOpacity: 0.15,
            transparent: false,
            borderRadius: 28,
            borderWidth: 1,
            borderColor: '#FFFFFF',
            borderStyle: 'solid',
            blur: 25,
            brightness: 1.25,
            contrast: 1,
            shadowColor: 'rgba(255,255,255,0.15)',
            shadowBlur: 30,
            shadowX: 0,
            shadowY: 8,
            headerBackgroundColor: 'rgba(255,255,255,0.2)',
            headerTextColor: '#1F2937'
        },
        clock: {
            timeColor: '#111827',
            locationColor: '#4B5563',
            fontFamily: 'system'
        }
    },
    {
        id: 'retro-vintage',
        name: 'Retro Vintage',
        emoji: '📻',
        description: 'Classic warm tones',
        container: {
            backgroundColor: '#D97706',
            backgroundOpacity: 0.40,
            transparent: false,
            borderRadius: 16,
            borderWidth: 3,
            borderColor: '#92400E',
            borderStyle: 'solid',
            blur: 10,
            brightness: 0.95,
            contrast: 1.08,
            shadowColor: 'rgba(217,119,6,0.4)',
            shadowBlur: 20,
            shadowX: 2,
            shadowY: 6,
            headerBackgroundColor: '#B45309',
            headerTextColor: '#FEF3C7'
        },
        clock: {
            timeColor: '#451A03',
            locationColor: '#78350F',
            fontFamily: 'times'
        }
    }
];

// Helper function to apply theme preset
export const applyThemePreset = (preset) => {
    return {
        theme: preset.container,
        typeConfig: preset.clock
    };
};
