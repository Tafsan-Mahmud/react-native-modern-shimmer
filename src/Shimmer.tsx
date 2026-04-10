import React, { useEffect, useRef } from 'react';
import {
    Animated,
    DimensionValue,
    Easing,
    StyleProp,
    useColorScheme,
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
     * If omitted, auto-detects system color scheme and updates instantly on change.
     * @default undefined (auto-detect)
     */
    isDark?: boolean;
    /**
     * Override the base background color of the shimmer.
     */
    baseColor?: string;
    /**
     * Animation cycle duration in milliseconds.
     * @default 1000
     */
    speed?: number;
    /**
     * Additional styles applied to the shimmer container.
     */
    style?: StyleProp<ViewStyle>;
}

const THEME = {
    light: { base: '#cbcbcb', pulse: '#ebeef2' },
    dark:  { base: '#2d2e32', pulse: '#2e3340' },
};

export default function Shimmer({
    width        = '100%',
    height       = 16,
    borderRadius = 8,
    isDark,
    baseColor,
    speed        = 1000,
    style,
}: ShimmerProps) {
    // useColorScheme re-renders instantly when system theme changes
    const systemScheme = useColorScheme();
    const dark  = isDark !== undefined ? isDark : systemScheme === 'dark';
    const theme = dark ? THEME.dark : THEME.light;
    const bg    = baseColor ?? theme.base;

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
    }, [anim, speed]);

    const opacity = anim.interpolate({
        inputRange:  [0, 1],
        outputRange: dark ? [0.45, 0.85] : [0.55, 1],
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