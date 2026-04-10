import React, { useEffect, useRef } from 'react';
import {
    Animated,
    Appearance,
    DimensionValue,
    Easing,
    StyleProp,
    ViewStyle,
} from 'react-native';

export interface ShimmerProps {
    /**
     * Width of the shimmer placeholder.
     * Accepts number (px) or percentage string e.g. "100%" or "60%"
     * @default "100%"
     */
    width?: DimensionValue;

    /**
     * Height of the shimmer placeholder in pixels.
     * @default 16
     */
    height?: number;

    /**
     * Border radius of the shimmer placeholder.
     * @default 8
     */
    borderRadius?: number;

    /**
     * Force dark mode appearance.
     * If omitted, the component auto-detects the system color scheme.
     * @default undefined (auto-detect)
     */
    isDark?: boolean;

    /**
     * Override the base background color of the shimmer.
     * Useful for matching your app's surface color.
     */
    baseColor?: string;

    /**
     * Animation cycle duration in milliseconds.
     * Lower = faster pulse, Higher = slower pulse.
     * @default 1000
     */
    speed?: number;

    /**
     * Additional styles applied to the shimmer container.
     */
    style?: StyleProp<ViewStyle>;
}

/**
 * Default theme tokens.
 * Light: a neutral cool gray that works on white/light surfaces.
 * Dark: a dark slate that works on dark surfaces.
 */
const THEME = {
    light: {
        base:      '#e2e5ea',
        highlight: '#c8cdd6',
    },
    dark: {
        base:      '#2c2f38',
        highlight: '#3d4251',
    },
};

/**
 * A lightweight, zero-dependency shimmer placeholder for React Native and Expo.
 * Uses the core Animated API — no additional packages required.
 */
export default function Shimmer({
    width        = '100%',
    height       = 16,
    borderRadius = 8,
    isDark,
    baseColor,
    speed        = 1000,
    style,
}: ShimmerProps) {
    // Resolve theme: prop > system
    const systemDark = Appearance.getColorScheme() === 'dark';
    const dark       = isDark !== undefined ? isDark : systemDark;
    const theme      = dark ? THEME.dark : THEME.light;
    const bg         = baseColor ?? theme.base;

    const anim = useRef(new Animated.Value(0)).current;

    useEffect(() => {
        const loop = Animated.loop(
            Animated.sequence([
                Animated.timing(anim, {
                    toValue:         1,
                    duration:        speed,
                    easing:          Easing.inOut(Easing.ease),
                    useNativeDriver: true,
                }),
                Animated.timing(anim, {
                    toValue:         0,
                    duration:        speed,
                    easing:          Easing.inOut(Easing.ease),
                    useNativeDriver: true,
                }),
            ])
        );
        loop.start();
        return () => loop.stop();
    }, [speed]);

    const opacity = anim.interpolate({
        inputRange:  [0, 1],
        outputRange: dark ? [0.4, 0.8] : [0.5, 1],
    });

    return (
        <Animated.View
            style={[
                {
                    width,
                    height,
                    borderRadius,
                    backgroundColor: bg,
                    opacity,
                },
                style,
            ]}
        />
    );
}
