// Comprehensive timezone list with IANA identifiers
// Organized by UTC offset for easy browsing

export const timezones = [
    // UTC-12 to UTC-11
    { value: 'Pacific/Midway', label: '(UTC-11:00) Midway Island, Samoa', offset: -11, country: 'AS' },
    { value: 'Pacific/Honolulu', label: '(UTC-10:00) Hawaii', offset: -10, country: 'US' },

    // UTC-9 to UTC-8
    { value: 'America/Anchorage', label: '(UTC-09:00) Alaska', offset: -9, country: 'US' },
    { value: 'America/Los_Angeles', label: '(UTC-08:00) Pacific Time (US & Canada)', offset: -8, country: 'US' },
    { value: 'America/Tijuana', label: '(UTC-08:00) Tijuana, Baja California', offset: -8, country: 'MX' },

    // UTC-7
    { value: 'America/Denver', label: '(UTC-07:00) Mountain Time (US & Canada)', offset: -7, country: 'US' },
    { value: 'America/Phoenix', label: '(UTC-07:00) Arizona', offset: -7, country: 'US' },
    { value: 'America/Chihuahua', label: '(UTC-07:00) Chihuahua, La Paz, Mazatlan', offset: -7, country: 'MX' },

    // UTC-6
    { value: 'America/Chicago', label: '(UTC-06:00) Central Time (US & Canada)', offset: -6, country: 'US' },
    { value: 'America/Mexico_City', label: '(UTC-06:00) Guadalajara, Mexico City, Monterrey', offset: -6, country: 'MX' },
    { value: 'America/Guatemala', label: '(UTC-06:00) Central America', offset: -6, country: 'GT' },

    // UTC-5
    { value: 'America/New_York', label: '(UTC-05:00) Eastern Time (US & Canada)', offset: -5, country: 'US' },
    { value: 'America/Bogota', label: '(UTC-05:00) Bogota, Lima, Quito', offset: -5, country: 'CO' },
    { value: 'America/Indiana/Indianapolis', label: '(UTC-05:00) Indiana (East)', offset: -5, country: 'US' },

    // UTC-4
    { value: 'America/Caracas', label: '(UTC-04:00) Caracas', offset: -4, country: 'VE' },
    { value: 'America/Halifax', label: '(UTC-04:00) Atlantic Time (Canada)', offset: -4, country: 'CA' },
    { value: 'America/Santiago', label: '(UTC-04:00) Santiago', offset: -4, country: 'CL' },

    // UTC-3
    { value: 'America/Sao_Paulo', label: '(UTC-03:00) Brasilia', offset: -3, country: 'BR' },
    { value: 'America/Argentina/Buenos_Aires', label: '(UTC-03:00) Buenos Aires', offset: -3, country: 'AR' },
    { value: 'America/Godthab', label: '(UTC-03:00) Greenland', offset: -3, country: 'GL' },

    // UTC-2 to UTC-1
    { value: 'Atlantic/South_Georgia', label: '(UTC-02:00) Mid-Atlantic', offset: -2, country: 'GS' },
    { value: 'Atlantic/Azores', label: '(UTC-01:00) Azores', offset: -1, country: 'PT' },
    { value: 'Atlantic/Cape_Verde', label: '(UTC-01:00) Cape Verde Is.', offset: -1, country: 'CV' },

    // UTC+0
    { value: 'UTC', label: '(UTC+00:00) Coordinated Universal Time', offset: 0, country: 'UN' },
    { value: 'Europe/London', label: '(UTC+00:00) London, Dublin, Lisbon', offset: 0, country: 'GB' },
    { value: 'Africa/Casablanca', label: '(UTC+00:00) Casablanca', offset: 0, country: 'MA' },

    // UTC+1
    { value: 'Europe/Paris', label: '(UTC+01:00) Paris, Brussels, Amsterdam', offset: 1, country: 'FR' },
    { value: 'Europe/Berlin', label: '(UTC+01:00) Berlin, Rome, Stockholm', offset: 1, country: 'DE' },
    { value: 'Europe/Warsaw', label: '(UTC+01:00) Warsaw, Prague, Budapest', offset: 1, country: 'PL' },
    { value: 'Africa/Lagos', label: '(UTC+01:00) West Central Africa', offset: 1, country: 'NG' },

    // UTC+2
    { value: 'Europe/Athens', label: '(UTC+02:00) Athens, Bucharest, Istanbul', offset: 2, country: 'GR' },
    { value: 'Europe/Helsinki', label: '(UTC+02:00) Helsinki, Kyiv, Riga', offset: 2, country: 'FI' },
    { value: 'Africa/Cairo', label: '(UTC+02:00) Cairo', offset: 2, country: 'EG' },
    { value: 'Africa/Johannesburg', label: '(UTC+02:00) Johannesburg, Pretoria', offset: 2, country: 'ZA' },

    // UTC+3
    { value: 'Europe/Moscow', label: '(UTC+03:00) Moscow, St. Petersburg', offset: 3, country: 'RU' },
    { value: 'Asia/Baghdad', label: '(UTC+03:00) Baghdad', offset: 3, country: 'IQ' },
    { value: 'Asia/Kuwait', label: '(UTC+03:00) Kuwait, Riyadh', offset: 3, country: 'KW' },
    { value: 'Africa/Nairobi', label: '(UTC+03:00) Nairobi', offset: 3, country: 'KE' },

    // UTC+3:30
    { value: 'Asia/Tehran', label: '(UTC+03:30) Tehran', offset: 3.5, country: 'IR' },

    // UTC+4
    { value: 'Asia/Dubai', label: '(UTC+04:00) Abu Dhabi, Muscat, Dubai', offset: 4, country: 'AE' },
    { value: 'Asia/Baku', label: '(UTC+04:00) Baku, Tbilisi, Yerevan', offset: 4, country: 'AZ' },

    // UTC+4:30
    { value: 'Asia/Kabul', label: '(UTC+04:30) Kabul', offset: 4.5, country: 'AF' },

    // UTC+5
    { value: 'Asia/Karachi', label: '(UTC+05:00) Islamabad, Karachi', offset: 5, country: 'PK' },
    { value: 'Asia/Tashkent', label: '(UTC+05:00) Tashkent', offset: 5, country: 'UZ' },

    // UTC+5:30
    { value: 'Asia/Kolkata', label: '(UTC+05:30) Chennai, Kolkata, Mumbai, New Delhi', offset: 5.5, country: 'IN' },
    { value: 'Asia/Colombo', label: '(UTC+05:30) Sri Jayawardenepura', offset: 5.5, country: 'LK' },

    // UTC+5:45
    { value: 'Asia/Kathmandu', label: '(UTC+05:45) Kathmandu', offset: 5.75, country: 'NP' },

    // UTC+6
    { value: 'Asia/Dhaka', label: '(UTC+06:00) Dhaka', offset: 6, country: 'BD' },
    { value: 'Asia/Almaty', label: '(UTC+06:00) Almaty, Astana', offset: 6, country: 'KZ' },

    // UTC+6:30
    { value: 'Asia/Yangon', label: '(UTC+06:30) Yangon (Rangoon)', offset: 6.5, country: 'MM' },

    // UTC+7
    { value: 'Asia/Bangkok', label: '(UTC+07:00) Bangkok, Hanoi, Jakarta', offset: 7, country: 'TH' },
    { value: 'Asia/Krasnoyarsk', label: '(UTC+07:00) Krasnoyarsk', offset: 7, country: 'RU' },

    // UTC+8
    { value: 'Asia/Shanghai', label: '(UTC+08:00) Beijing, Chongqing, Hong Kong', offset: 8, country: 'CN' },
    { value: 'Asia/Singapore', label: '(UTC+08:00) Singapore, Kuala Lumpur', offset: 8, country: 'SG' },
    { value: 'Asia/Taipei', label: '(UTC+08:00) Taipei', offset: 8, country: 'TW' },
    { value: 'Australia/Perth', label: '(UTC+08:00) Perth', offset: 8, country: 'AU' },

    // UTC+9
    { value: 'Asia/Tokyo', label: '(UTC+09:00) Tokyo, Osaka, Sapporo', offset: 9, country: 'JP' },
    { value: 'Asia/Seoul', label: '(UTC+09:00) Seoul', offset: 9, country: 'KR' },
    { value: 'Asia/Yakutsk', label: '(UTC+09:00) Yakutsk', offset: 9, country: 'RU' },

    // UTC+9:30
    { value: 'Australia/Adelaide', label: '(UTC+09:30) Adelaide', offset: 9.5, country: 'AU' },
    { value: 'Australia/Darwin', label: '(UTC+09:30) Darwin', offset: 9.5, country: 'AU' },

    // UTC+10
    { value: 'Australia/Sydney', label: '(UTC+10:00) Sydney, Melbourne, Canberra', offset: 10, country: 'AU' },
    { value: 'Australia/Brisbane', label: '(UTC+10:00) Brisbane', offset: 10, country: 'AU' },
    { value: 'Pacific/Guam', label: '(UTC+10:00) Guam, Port Moresby', offset: 10, country: 'GU' },

    // UTC+11
    { value: 'Pacific/Noumea', label: '(UTC+11:00) Solomon Is., New Caledonia', offset: 11, country: 'SB' },

    // UTC+12
    { value: 'Pacific/Auckland', label: '(UTC+12:00) Auckland, Wellington', offset: 12, country: 'NZ' },
    { value: 'Pacific/Fiji', label: '(UTC+12:00) Fiji, Kamchatka, Marshall Is.', offset: 12, country: 'FJ' },

    // UTC+13
    { value: 'Pacific/Tongatapu', label: '(UTC+13:00) Nuku\'alofa', offset: 13, country: 'TO' },
];

// Format options for clock display
export const clockFormats = [
    {
        value: 'time-12h',
        label: '12-Hour Time (2:30 PM)',
        example: '2:30 PM'
    },
    {
        value: 'time-24h',
        label: '24-Hour Time (14:30)',
        example: '14:30'
    },
    {
        value: 'time-12h-seconds',
        label: '12-Hour with Seconds (2:30:45 PM)',
        example: '2:30:45 PM'
    },
    {
        value: 'time-24h-seconds',
        label: '24-Hour with Seconds (14:30:45)',
        example: '14:30:45'
    },
    {
        value: 'time-date-12h',
        label: '12-Hour + Date (2:30 PM, Jan 18)',
        example: '2:30 PM, Jan 18'
    },
    {
        value: 'time-date-24h',
        label: '24-Hour + Date (14:30, Jan 18)',
        example: '14:30, Jan 18'
    },
    {
        value: 'time-day-12h',
        label: '12-Hour + Day (2:30 PM, Saturday)',
        example: '2:30 PM, Saturday'
    },
    {
        value: 'time-day-24h',
        label: '24-Hour + Day (14:30, Saturday)',
        example: '14:30, Saturday'
    },
    {
        value: 'full-12h',
        label: 'Full Format 12h (Sat, Jan 18, 2:30 PM)',
        example: 'Sat, Jan 18, 2:30 PM'
    },
    {
        value: 'full-24h',
        label: 'Full Format 24h (Sat, Jan 18, 14:30)',
        example: 'Sat, Jan 18, 14:30'
    },
];

// Font options for clock display
export const clockFonts = [
    { value: 'system', label: 'System Default', family: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif' },
    { value: 'arial', label: 'Arial', family: 'Arial, sans-serif' },
    { value: 'helvetica', label: 'Helvetica', family: 'Helvetica, Arial, sans-serif' },
    { value: 'times', label: 'Times New Roman', family: '"Times New Roman", Times, serif' },
    { value: 'georgia', label: 'Georgia', family: 'Georgia, serif' },
    { value: 'courier', label: 'Courier New', family: '"Courier New", Courier, monospace' },
    { value: 'verdana', label: 'Verdana', family: 'Verdana, sans-serif' },
    { value: 'trebuchet', label: 'Trebuchet MS', family: '"Trebuchet MS", sans-serif' },
    { value: 'impact', label: 'Impact', family: 'Impact, sans-serif' },
    { value: 'comic', label: 'Comic Sans MS', family: '"Comic Sans MS", cursive' },
];

// Default configuration for new WorldClock widgets
export const defaultWorldClockConfig = {
    timezone: 'Asia/Kolkata',
    format: 'time-24h',
    timeColor: '#000000',
    locationColor: '#666666',
    fontFamily: 'system',
    showFlag: false,
    flagOpacity: 0.15
};

// Helper to get flag emoji from country code (e.g. 'IN' -> '🇮🇳')
export const getFlagEmoji = (countryCode) => {
    if (!countryCode || countryCode === 'UN') return '🌐';
    const codePoints = countryCode
        .toUpperCase()
        .split('')
        .map(char => 127397 + char.charCodeAt());
    return String.fromCodePoint(...codePoints);
};
