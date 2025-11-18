/**
 * Configuration Module
 * Handles environment variables and configuration for the application
 *
 * Usage:
 *   import { config } from './src/config.js';
 *   console.log(config.ENVIRONMENT);
 */

const getEnvVariable = (key, defaultValue = '') => {
    // Try to get from window.__ENV__ first (injected by Cloudflare Pages)
    if (typeof window !== 'undefined' && window.__ENV__?.[key]) {
        return window.__ENV__[key];
    }

    // Fall back to environment variable or default
    return process.env[key] || defaultValue;
};

export const config = {
    // Application environment
    ENVIRONMENT: getEnvVariable('ENVIRONMENT', 'development'),

    // URLs
    CLOUDFLARE_PAGES_URL: getEnvVariable('CLOUDFLARE_PAGES_URL', 'http://localhost:8080'),

    // Feature flags
    ENABLE_ANALYTICS: getEnvVariable('ENABLE_ANALYTICS', 'false') === 'true',
    ENABLE_DEBUG: getEnvVariable('ENABLE_DEBUG', 'false') === 'true',

    // Application info
    APP_NAME: getEnvVariable('APP_NAME', 'Le Convertisseur de Niveaux Audio'),
    APP_VERSION: getEnvVariable('APP_VERSION', '1.0.0'),

    // Computed properties
    isProduction: () => config.ENVIRONMENT === 'production',
    isStaging: () => config.ENVIRONMENT === 'staging',
    isDevelopment: () => config.ENVIRONMENT === 'development',

    // Utility methods
    log: (message, data = null) => {
        if (config.ENABLE_DEBUG) {
            console.log(`[${config.APP_NAME}] ${message}`, data || '');
        }
    },

    error: (message, error = null) => {
        console.error(`[${config.APP_NAME}] ERROR: ${message}`, error || '');
    },

    getEnvironmentInfo: () => ({
        environment: config.ENVIRONMENT,
        version: config.APP_VERSION,
        url: config.CLOUDFLARE_PAGES_URL,
        debug: config.ENABLE_DEBUG,
        analytics: config.ENABLE_ANALYTICS,
    }),
};

// Log initialization info in development
if (config.isDevelopment()) {
    console.log('[CONFIG] Application initialized', config.getEnvironmentInfo());
}

export default config;
