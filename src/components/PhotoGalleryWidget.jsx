import React, { useState, useEffect } from 'react';
import './PhotoGalleryWidget.css';

const PhotoGalleryWidget = ({ config, size }) => {
    const [images, setImages] = useState([]);
    const [currentIndex, setCurrentIndex] = useState(0);
    const [nextIndex, setNextIndex] = useState(0);
    const [isTransitioning, setIsTransitioning] = useState(false);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    // Load images from folder
    useEffect(() => {
        const loadImages = async () => {
            if (!config?.folderPath) {
                setLoading(false);
                setError('No folder selected');
                return;
            }

            try {
                setLoading(true);
                setError(null);

                if (window.require) {
                    const { ipcRenderer } = window.require('electron');
                    const imageList = await ipcRenderer.invoke('load-gallery-images', config.folderPath);

                    if (imageList && imageList.length > 0) {
                        setImages(imageList);
                        setCurrentIndex(0);
                        setNextIndex(0);
                    } else {
                        setError('No images found in folder');
                    }
                }
                setLoading(false);
            } catch (err) {
                console.error('Error loading images:', err);
                setError('Failed to load images');
                setLoading(false);
            }
        };

        loadImages();
    }, [config?.folderPath]);

    // Slideshow timer with smooth crossfade (1.2s transition)
    useEffect(() => {
        if (images.length === 0) return;

        const interval = (config?.slideshowInterval || 5) * 1000;
        const timer = setInterval(() => {
            setIsTransitioning(true);
            const next = (currentIndex + 1) % images.length;
            setNextIndex(next);

            // After fade completes, update current index
            setTimeout(() => {
                setCurrentIndex(next);
                setIsTransitioning(false);
            }, 1200); // Longer, smoother transition
        }, interval);

        return () => clearInterval(timer);
    }, [images.length, currentIndex, config?.slideshowInterval]);

    if (loading) {
        return (
            <div className="photo-gallery-widget" style={{ width: size?.width, height: size?.height }}>
                <div className="gallery-placeholder">
                    <div className="gallery-spinner"></div>
                    <p>Loading images...</p>
                </div>
            </div>
        );
    }

    if (error || images.length === 0) {
        return (
            <div className="photo-gallery-widget" style={{ width: size?.width, height: size?.height }}>
                <div className="gallery-placeholder">
                    <div className="gallery-icon">🖼️</div>
                    <p>{error || 'No images to display'}</p>
                    <p className="gallery-hint">Configure the gallery in settings</p>
                </div>
            </div>
        );
    }

    return (
        <div className="photo-gallery-widget" style={{ width: size?.width, height: size?.height }}>
            <div className="gallery-image-container">
                {/* Current Image */}
                <img
                    src={images[currentIndex]}
                    alt={`Slide ${currentIndex + 1}`}
                    className={`gallery-image ${isTransitioning ? 'fade-out' : 'fade-in'}`}
                    onError={(e) => {
                        console.error('Failed to load image:', images[currentIndex]);
                    }}
                />

                {/* Next Image (for crossfade) */}
                {isTransitioning && (
                    <img
                        src={images[nextIndex]}
                        alt={`Slide ${nextIndex + 1}`}
                        className="gallery-image gallery-image-next fade-in"
                    />
                )}
            </div>
        </div>
    );
};

export default PhotoGalleryWidget;
