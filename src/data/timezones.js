// Comprehensive timezone list with IANA identifiers
// Organized by UTC offset for easy browsing

export const timezones = [
    // UTC-12 to UTC-11
    { value: 'Pacific/Midway', label: '(UTC-11:00) Midway Island, Samoa', offset: -11 },
    { value: 'Pacific/Honolulu', label: '(UTC-10:00) Hawaii', offset: -10 },

    // UTC-9 to UTC-8
    { value: 'America/Anchorage', label: '(UTC-09:00) Alaska', offset: -9 },
    { value: 'America/Los_Angeles', label: '(UTC-08:00) Pacific Time (US & Canada)', offset: -8 },
    { value: 'America/Tijuana', label: '(UTC-08:00) Tijuana, Baja California', offset: -8 },

    // UTC-7
    { value: 'America/Denver', label: '(UTC-07:00) Mountain Time (US & Canada)', offset: -7 },
    { value: 'America/Phoenix', label: '(UTC-07:00) Arizona', offset: -7 },
    { value: 'America/Chihuahua', label: '(UTC-07:00) Chihuahua, La Paz, Mazatlan', offset: -7 },

    // UTC-6
    { value: 'America/Chicago', label: '(UTC-06:00) Central Time (US & Canada)', offset: -6 },
    { value: 'America/Mexico_City', label: '(UTC-06:00) Guadalajara, Mexico City, Monterrey', offset: -6 },
    { value: 'America/Guatemala', label: '(UTC-06:00) Central America', offset: -6 },

    // UTC-5
    { value: 'America/New_York', label: '(UTC-05:00) Eastern Time (US & Canada)', offset: -5 },
    { value: 'America/Bogota', label: '(UTC-05:00) Bogota, Lima, Quito', offset: -5 },
    { value: 'America/Indiana/Indianapolis', label: '(UTC-05:00) Indiana (East)', offset: -5 },

    // UTC-4
    { value: 'America/Caracas', label: '(UTC-04:00) Caracas', offset: -4 },
    { value: 'America/Halifax', label: '(UTC-04:00) Atlantic Time (Canada)', offset: -4 },
    { value: 'America/Santiago', label: '(UTC-04:00) Santiago', offset: -4 },

    // UTC-3
    { value: 'America/Sao_Paulo', label: '(UTC-03:00) Brasilia', offset: -3 },
    { value: 'America/Argentina/Buenos_Aires', label: '(UTC-03:00) Buenos Aires', offset: -3 },
    { value: 'America/Godthab', label: '(UTC-03:00) Greenland', offset: -3 },

    // UTC-2 to UTC-1
    { value: 'Atlantic/South_Georgia', label: '(UTC-02:00) Mid-Atlantic', offset: -2 },
    { value: 'Atlantic/Azores', label: '(UTC-01:00) Azores', offset: -1 },
    { value: 'Atlantic/Cape_Verde', label: '(UTC-01:00) Cape Verde Is.', offset: -1 },

    // UTC+0
    { value: 'UTC', label: '(UTC+00:00) Coordinated Universal Time', offset: 0 },
    { value: 'Europe/London', label: '(UTC+00:00) London, Dublin, Lisbon', offset: 0 },
    { value: 'Africa/Casablanca', label: '(UTC+00:00) Casablanca', offset: 0 },

    // UTC+1
    { value: 'Europe/Paris', label: '(UTC+01:00) Paris, Brussels, Amsterdam', offset: 1 },
    { value: 'Europe/Berlin', label: '(UTC+01:00) Berlin, Rome, Stockholm', offset: 1 },
    { value: 'Europe/Warsaw', label: '(UTC+01:00) Warsaw, Prague, Budapest', offset: 1 },
    { value: 'Africa/Lagos', label: '(UTC+01:00) West Central Africa', offset: 1 },

    // UTC+2
    { value: 'Europe/Athens', label: '(UTC+02:00) Athens, Bucharest, Istanbul', offset: 2 },
    { value: 'Europe/Helsinki', label: '(UTC+02:00) Helsinki, Kyiv, Riga', offset: 2 },
    { value: 'Africa/Cairo', label: '(UTC+02:00) Cairo', offset: 2 },
    { value: 'Africa/Johannesburg', label: '(UTC+02:00) Johannesburg, Pretoria', offset: 2 },

    // UTC+3
    { value: 'Europe/Moscow', label: '(UTC+03:00) Moscow, St. Petersburg', offset: 3 },
    { value: 'Asia/Baghdad', label: '(UTC+03:00) Baghdad', offset: 3 },
    { value: 'Asia/Kuwait', label: '(UTC+03:00) Kuwait, Riyadh', offset: 3 },
    { value: 'Africa/Nairobi', label: '(UTC+03:00) Nairobi', offset: 3 },

    // UTC+3:30
    { value: 'Asia/Tehran', label: '(UTC+03:30) Tehran', offset: 3.5 },

    // UTC+4
    { value: 'Asia/Dubai', label: '(UTC+04:00) Abu Dhabi, Muscat, Dubai', offset: 4 },
    { value: 'Asia/Baku', label: '(UTC+04:00) Baku, Tbilisi, Yerevan', offset: 4 },

    // UTC+4:30
    { value: 'Asia/Kabul', label: '(UTC+04:30) Kabul', offset: 4.5 },

    // UTC+5
    { value: 'Asia/Karachi', label: '(UTC+05:00) Islamabad, Karachi', offset: 5 },
    { value: 'Asia/Tashkent', label: '(UTC+05:00) Tashkent', offset: 5 },

    // UTC+5:30
    { value: 'Asia/Kolkata', label: '(UTC+05:30) Chennai, Kolkata, Mumbai, New Delhi', offset: 5.5 },
    { value: 'Asia/Colombo', label: '(UTC+05:30) Sri Jayawardenepura', offset: 5.5 },

    // UTC+5:45
    { value: 'Asia/Kathmandu', label: '(UTC+05:45) Kathmandu', offset: 5.75 },

    // UTC+6
    { value: 'Asia/Dhaka', label: '(UTC+06:00) Dhaka', offset: 6 },
    { value: 'Asia/Almaty', label: '(UTC+06:00) Almaty, Astana', offset: 6 },

    // UTC+6:30
    { value: 'Asia/Yangon', label: '(UTC+06:30) Yangon (Rangoon)', offset: 6.5 },

    // UTC+7
    { value: 'Asia/Bangkok', label: '(UTC+07:00) Bangkok, Hanoi, Jakarta', offset: 7 },
    { value: 'Asia/Krasnoyarsk', label: '(UTC+07:00) Krasnoyarsk', offset: 7 },

    // UTC+8
    { value: 'Asia/Shanghai', label: '(UTC+08:00) Beijing, Chongqing, Hong Kong', offset: 8 },
    { value: 'Asia/Singapore', label: '(UTC+08:00) Singapore, Kuala Lumpur', offset: 8 },
    { value: 'Asia/Taipei', label: '(UTC+08:00) Taipei', offset: 8 },
    { value: 'Australia/Perth', label: '(UTC+08:00) Perth', offset: 8 },

    // UTC+9
    { value: 'Asia/Tokyo', label: '(UTC+09:00) Tokyo, Osaka, Sapporo', offset: 9 },
    { value: 'Asia/Seoul', label: '(UTC+09:00) Seoul', offset: 9 },
    { value: 'Asia/Yakutsk', label: '(UTC+09:00) Yakutsk', offset: 9 },

    // UTC+9:30
    { value: 'Australia/Adelaide', label: '(UTC+09:30) Adelaide', offset: 9.5 },
    { value: 'Australia/Darwin', label: '(UTC+09:30) Darwin', offset: 9.5 },

    // UTC+10
    { value: 'Australia/Sydney', label: '(UTC+10:00) Sydney, Melbourne, Canberra', offset: 10 },
    { value: 'Australia/Brisbane', label: '(UTC+10:00) Brisbane', offset: 10 },
    { value: 'Pacific/Guam', label: '(UTC+10:00) Guam, Port Moresby', offset: 10 },

    // UTC+11
    { value: 'Pacific/Noumea', label: '(UTC+11:00) Solomon Is., New Caledonia', offset: 11 },

    // UTC+12
    { value: 'Pacific/Auckland', label: '(UTC+12:00) Auckland, Wellington', offset: 12 },
    { value: 'Pacific/Fiji', label: '(UTC+12:00) Fiji, Kamchatka, Marshall Is.', offset: 12 },

    // UTC+13
    { value: 'Pacific/Tongatapu', label: '(UTC+13:00) Nuku\'alofa', offset: 13 },
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
    fontFamily: 'system'
};
