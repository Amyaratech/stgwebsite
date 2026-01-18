import React, { useState, useEffect, useRef } from 'react';
import './WorldClockWidget.css';
import { clockFonts, timezones, getFlagEmoji } from '../data/timezones';

const WorldClockWidget = ({ config, size }) => {
    const [currentTime, setCurrentTime] = useState(new Date());
    const containerRef = useRef(null);
    const [fontSize, setFontSize] = useState({ time: 48, location: 16 });

    // Update time every second
    useEffect(() => {
        const timer = setInterval(() => {
            setCurrentTime(new Date());
        }, 1000);

        return () => clearInterval(timer);
    }, []);

    // Calculate responsive font size based on widget dimensions - PROFESSIONAL SCALING
    useEffect(() => {
        if (size && config) {
            const { width, height } = size;
            const { format = 'time-24h' } = config;

            // Determine content complexity based on format
            const isSimpleFormat = format === 'time-12h' || format === 'time-24h';
            const hasSeconds = format.includes('seconds');
            const hasDate = format.includes('date');
            const hasDay = format.includes('day');
            const isFull = format.includes('full');

            // Calculate base font size using available space
            // MUCH MORE AGGRESSIVE SCALING for better space utilization
            const availableWidth = width - 40; // Account for padding
            const availableHeight = height - 60; // Account for padding + location text

            // Base calculation: scale with widget size
            // For simple time: MUCH LARGER font (up to 28% of width)
            // For complex formats: smaller font to fit content
            let widthScaleFactor = 0.22; // Default: 22% of width

            if (isSimpleFormat && !hasSeconds) {
                widthScaleFactor = 0.30; // Simple time: 30% of width - VERY LARGE!
            } else if (hasSeconds) {
                widthScaleFactor = 0.22; // With seconds: 22% of width
            } else if (isFull) {
                widthScaleFactor = 0.15; // Full format: 15% of width
            } else if (hasDate || hasDay) {
                widthScaleFactor = 0.20; // With date/day: 20% of width
            }

            // Calculate time font based on width
            let timeFontSize = availableWidth * widthScaleFactor;

            // Also consider height - don't exceed 55% of available height for time
            const maxHeightBasedSize = availableHeight * 0.55;
            timeFontSize = Math.min(timeFontSize, maxHeightBasedSize);

            // Set reasonable bounds (increased max to 280px for very large widgets)
            timeFontSize = Math.max(32, Math.min(280, timeFontSize));

            // Location font: 26-30% of time font
            const locationFontSize = Math.max(16, timeFontSize * 0.28);

            setFontSize({
                time: Math.round(timeFontSize),
                location: Math.round(locationFontSize)
            });
        }
    }, [size, config]);

    // Format time based on selected format and timezone
    const formatTime = () => {
        const { timezone = 'Asia/Kolkata', format = 'time-24h' } = config || {};

        try {
            switch (format) {
                case 'time-12h':
                    return new Intl.DateTimeFormat('en-US', {
                        timeZone: timezone,
                        hour: 'numeric',
                        minute: '2-digit',
                        hour12: true
                    }).format(currentTime);

                case 'time-24h':
                    return new Intl.DateTimeFormat('en-US', {
                        timeZone: timezone,
                        hour: '2-digit',
                        minute: '2-digit',
                        hour12: false
                    }).format(currentTime);

                case 'time-12h-seconds':
                    return new Intl.DateTimeFormat('en-US', {
                        timeZone: timezone,
                        hour: 'numeric',
                        minute: '2-digit',
                        second: '2-digit',
                        hour12: true
                    }).format(currentTime);

                case 'time-24h-seconds':
                    return new Intl.DateTimeFormat('en-US', {
                        timeZone: timezone,
                        hour: '2-digit',
                        minute: '2-digit',
                        second: '2-digit',
                        hour12: false
                    }).format(currentTime);

                case 'time-date-12h':
                    const time12 = new Intl.DateTimeFormat('en-US', {
                        timeZone: timezone,
                        hour: 'numeric',
                        minute: '2-digit',
                        hour12: true
                    }).format(currentTime);
                    const date1 = new Intl.DateTimeFormat('en-US', {
                        timeZone: timezone,
                        month: 'short',
                        day: 'numeric'
                    }).format(currentTime);
                    return `${time12}, ${date1}`;

                case 'time-date-24h':
                    const time24 = new Intl.DateTimeFormat('en-US', {
                        timeZone: timezone,
                        hour: '2-digit',
                        minute: '2-digit',
                        hour12: false
                    }).format(currentTime);
                    const date2 = new Intl.DateTimeFormat('en-US', {
                        timeZone: timezone,
                        month: 'short',
                        day: 'numeric'
                    }).format(currentTime);
                    return `${time24}, ${date2}`;

                case 'time-day-12h':
                    const time12d = new Intl.DateTimeFormat('en-US', {
                        timeZone: timezone,
                        hour: 'numeric',
                        minute: '2-digit',
                        hour12: true
                    }).format(currentTime);
                    const day1 = new Intl.DateTimeFormat('en-US', {
                        timeZone: timezone,
                        weekday: 'long'
                    }).format(currentTime);
                    return `${time12d}, ${day1}`;

                case 'time-day-24h':
                    const time24d = new Intl.DateTimeFormat('en-US', {
                        timeZone: timezone,
                        hour: '2-digit',
                        minute: '2-digit',
                        hour12: false
                    }).format(currentTime);
                    const day2 = new Intl.DateTimeFormat('en-US', {
                        timeZone: timezone,
                        weekday: 'long'
                    }).format(currentTime);
                    return `${time24d}, ${day2}`;

                case 'full-12h':
                    return new Intl.DateTimeFormat('en-US', {
                        timeZone: timezone,
                        weekday: 'short',
                        month: 'short',
                        day: 'numeric',
                        hour: 'numeric',
                        minute: '2-digit',
                        hour12: true
                    }).format(currentTime);

                case 'full-24h':
                    return new Intl.DateTimeFormat('en-US', {
                        timeZone: timezone,
                        weekday: 'short',
                        month: 'short',
                        day: 'numeric',
                        hour: '2-digit',
                        minute: '2-digit',
                        hour12: false
                    }).format(currentTime);

                default:
                    return new Intl.DateTimeFormat('en-US', {
                        timeZone: timezone,
                        hour: '2-digit',
                        minute: '2-digit',
                        hour12: false
                    }).format(currentTime);
            }
        } catch (error) {
            console.error('Error formatting time:', error);
            return 'Invalid timezone';
        }
    };

    // Get timezone name for display
    const getTimezoneName = () => {
        const { timezone = 'Asia/Kolkata' } = config || {};
        try {
            const parts = timezone.split('/');
            return parts[parts.length - 1].replace(/_/g, ' ');
        } catch {
            return timezone;
        }
    };

    // Get font family
    const getFontFamily = () => {
        const { fontFamily = 'system' } = config || {};
        const font = clockFonts.find(f => f.value === fontFamily);
        return font ? font.family : clockFonts[0].family;
    };

    // Get Flag for Background
    const renderFlagBackground = () => {
        if (!config?.showFlag) return null;

        const { timezone = 'Asia/Kolkata' } = config || {};
        const tzInfo = timezones.find(t => t.value === timezone);
        if (!tzInfo?.country || tzInfo.country === 'UN') return null;

        const countryCode = tzInfo.country.toLowerCase();
        // Using FlagCDN for high-quality, high-res flag images
        const flagUrl = `https://flagcdn.com/w1280/${countryCode}.png`;
        const opacity = config.flagOpacity ?? 0.8;

        return (
            <div className="clock-background-flag-layer">
                <img
                    src={flagUrl}
                    alt=""
                    className="clock-bg-image"
                    style={{ opacity: opacity }}
                />
                {/* Subtle scrim to ensure text readability */}
                <div className="clock-bg-overlay"></div>
            </div>
        );
    };

    return (
        <div className="world-clock-widget" ref={containerRef}>
            {renderFlagBackground()}
            <div className="clock-content-layer">
                <div className="clock-display">
                    <div
                        className="clock-time"
                        style={{
                            fontSize: `${fontSize.time}px`,
                            color: config?.timeColor || '#000000',
                            fontFamily: getFontFamily(),
                            textShadow: config?.showFlag ? '0 2px 10px rgba(0,0,0,0.3)' : 'none'
                        }}
                    >
                        {formatTime()}
                    </div>
                    <div
                        className="clock-location"
                        style={{
                            fontSize: `${fontSize.location}px`,
                            color: config?.locationColor || '#666666',
                            fontFamily: getFontFamily(),
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            textShadow: config?.showFlag ? '0 1px 5px rgba(0,0,0,0.3)' : 'none'
                        }}
                    >
                        <span>{getTimezoneName()}</span>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default WorldClockWidget;
