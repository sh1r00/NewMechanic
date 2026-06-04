/**
 * Material Design 3 Theme Generator
 *
 * Generates CSS custom properties from primary, secondary, and tertiary
 * seed colors defined in package.json. Uses @material/material-color-utilities
 * to produce full tonal palettes, light/dark schemes, and elevation shadows.
 *
 * Usage: node scripts/generate-theme.mjs
 * Output: app/assets/css/material-tokens.css
 *
 * Configuration (package.json → "theme"):
 *   {
 *     "primary": "#d97706",
 *     "secondary": "#5d4037",
 *     "tertiary": "#4a6741"
 *   }
 */

import {
  argbFromHex,
  hexFromArgb,
  themeFromSourceColor,
  CorePalette,
  TonalPalette,
  Hct,
  Scheme,
} from '@material/material-color-utilities'
import { readFileSync, writeFileSync } from 'node:fs'
import { resolve, dirname } from 'node:path'
import { fileURLToPath } from 'node:url'

const __dirname = dirname(fileURLToPath(import.meta.url))

// ============================================
// Read seed colors from package.json
// ============================================
const pkgPath = resolve(__dirname, '../package.json')
const pkg = JSON.parse(readFileSync(pkgPath, 'utf-8'))

if (!pkg.theme || !pkg.theme.primary) {
  console.error('❌ Missing "theme.primary" in package.json')
  console.error('   Add: "theme": { "primary": "#d97706", "secondary": "#5d4037", "tertiary": "#4a6741" }')
  process.exit(1)
}

const PRIMARY_COLOR = pkg.theme.primary
const SECONDARY_COLOR = pkg.theme.secondary || null
const TERTIARY_COLOR = pkg.theme.tertiary || null

console.log(`Seeds: primary=${PRIMARY_COLOR}, secondary=${SECONDARY_COLOR || 'auto'}, tertiary=${TERTIARY_COLOR || 'auto'}`)

// ============================================
// Generate Material 3 theme from primary seed
// ============================================
const theme = themeFromSourceColor(argbFromHex(PRIMARY_COLOR))

// Override secondary and tertiary palettes if custom colors provided
const primaryPalette = theme.palettes.primary
const secondaryPalette = SECONDARY_COLOR
  ? TonalPalette.fromHueAndChroma(
      Hct.fromInt(argbFromHex(SECONDARY_COLOR)).hue,
      Hct.fromInt(argbFromHex(SECONDARY_COLOR)).chroma
    )
  : theme.palettes.secondary
const tertiaryPalette = TERTIARY_COLOR
  ? TonalPalette.fromHueAndChroma(
      Hct.fromInt(argbFromHex(TERTIARY_COLOR)).hue,
      Hct.fromInt(argbFromHex(TERTIARY_COLOR)).chroma
    )
  : theme.palettes.tertiary

// Build final palettes map
const palettes = {
  primary: primaryPalette,
  secondary: secondaryPalette,
  tertiary: tertiaryPalette,
  neutral: theme.palettes.neutral,
  neutralVariant: theme.palettes.neutralVariant,
  error: theme.palettes.error,
}

// M3 tonal stops
const TONES = [0, 4, 6, 10, 12, 17, 20, 22, 24, 25, 30, 35, 40, 50, 60, 70, 80, 87, 90, 92, 94, 95, 96, 98, 99, 100]

/**
 * Generate CSS variables for a tonal palette
 */
function generatePaletteVars(name, palette) {
  return TONES.map(
    (tone) => `  --md-ref-palette-${name}${tone}: ${hexFromArgb(palette.tone(tone))};`
  ).join('\n')
}

/**
 * Build a scheme object with custom secondary/tertiary overrides.
 * The standard Scheme only uses the primary seed — we need to manually
 * override secondary/tertiary color roles with our custom palettes.
 */
function buildSchemeColors(baseScheme, isDark) {
  const s = baseScheme
  const result = {
    // Primary (from standard scheme — derived from primary seed)
    primary: s.primary,
    onPrimary: s.onPrimary,
    primaryContainer: s.primaryContainer,
    onPrimaryContainer: s.onPrimaryContainer,
    inversePrimary: s.inversePrimary,
    // Error (from standard scheme)
    error: s.error,
    onError: s.onError,
    errorContainer: s.errorContainer,
    onErrorContainer: s.onErrorContainer,
    // Surface (from standard scheme — neutral palette)
    surface: s.surface,
    onSurface: s.onSurface,
    surfaceVariant: s.surfaceVariant,
    onSurfaceVariant: s.onSurfaceVariant,
    surfaceContainerLowest: s.surfaceContainerLowest,
    surfaceContainerLow: s.surfaceContainerLow,
    surfaceContainer: s.surfaceContainer,
    surfaceContainerHigh: s.surfaceContainerHigh,
    surfaceContainerHighest: s.surfaceContainerHighest,
    inverseSurface: s.inverseSurface,
    inverseOnSurface: s.inverseOnSurface,
    // Outline
    outline: s.outline,
    outlineVariant: s.outlineVariant,
    // Misc
    shadow: s.shadow,
    scrim: s.scrim,
    background: s.background,
    onBackground: s.onBackground,
  }

  // Override secondary from custom palette
  if (SECONDARY_COLOR) {
    result.secondary = secondaryPalette.tone(isDark ? 80 : 40)
    result.onSecondary = secondaryPalette.tone(isDark ? 20 : 100)
    result.secondaryContainer = secondaryPalette.tone(isDark ? 30 : 90)
    result.onSecondaryContainer = secondaryPalette.tone(isDark ? 90 : 10)
  } else {
    result.secondary = s.secondary
    result.onSecondary = s.onSecondary
    result.secondaryContainer = s.secondaryContainer
    result.onSecondaryContainer = s.onSecondaryContainer
  }

  // Override tertiary from custom palette
  if (TERTIARY_COLOR) {
    result.tertiary = tertiaryPalette.tone(isDark ? 80 : 40)
    result.onTertiary = tertiaryPalette.tone(isDark ? 20 : 100)
    result.tertiaryContainer = tertiaryPalette.tone(isDark ? 30 : 90)
    result.onTertiaryContainer = tertiaryPalette.tone(isDark ? 90 : 10)
  } else {
    result.tertiary = s.tertiary
    result.onTertiary = s.onTertiary
    result.tertiaryContainer = s.tertiaryContainer
    result.onTertiaryContainer = s.onTertiaryContainer
  }

  return result
}

const lightColors = buildSchemeColors(theme.schemes.light, false)
const darkColors = buildSchemeColors(theme.schemes.dark, true)

/**
 * Generate scheme CSS variables from a colors object
 */
function generateSchemeVars(colors) {
  return `  /* Primary */
  --md-sys-color-primary: ${hexFromArgb(colors.primary)};
  --md-sys-color-on-primary: ${hexFromArgb(colors.onPrimary)};
  --md-sys-color-primary-container: ${hexFromArgb(colors.primaryContainer)};
  --md-sys-color-on-primary-container: ${hexFromArgb(colors.onPrimaryContainer)};
  --md-sys-color-inverse-primary: ${hexFromArgb(colors.inversePrimary)};

  /* Secondary */
  --md-sys-color-secondary: ${hexFromArgb(colors.secondary)};
  --md-sys-color-on-secondary: ${hexFromArgb(colors.onSecondary)};
  --md-sys-color-secondary-container: ${hexFromArgb(colors.secondaryContainer)};
  --md-sys-color-on-secondary-container: ${hexFromArgb(colors.onSecondaryContainer)};

  /* Tertiary */
  --md-sys-color-tertiary: ${hexFromArgb(colors.tertiary)};
  --md-sys-color-on-tertiary: ${hexFromArgb(colors.onTertiary)};
  --md-sys-color-tertiary-container: ${hexFromArgb(colors.tertiaryContainer)};
  --md-sys-color-on-tertiary-container: ${hexFromArgb(colors.onTertiaryContainer)};

  /* Error */
  --md-sys-color-error: ${hexFromArgb(colors.error)};
  --md-sys-color-on-error: ${hexFromArgb(colors.onError)};
  --md-sys-color-error-container: ${hexFromArgb(colors.errorContainer)};
  --md-sys-color-on-error-container: ${hexFromArgb(colors.onErrorContainer)};

  /* Surface */
  --md-sys-color-surface: ${hexFromArgb(colors.surface)};
  --md-sys-color-on-surface: ${hexFromArgb(colors.onSurface)};
  --md-sys-color-surface-variant: ${hexFromArgb(colors.surfaceVariant)};
  --md-sys-color-on-surface-variant: ${hexFromArgb(colors.onSurfaceVariant)};
  --md-sys-color-surface-container-lowest: ${hexFromArgb(colors.surfaceContainerLowest)};
  --md-sys-color-surface-container-low: ${hexFromArgb(colors.surfaceContainerLow)};
  --md-sys-color-surface-container: ${hexFromArgb(colors.surfaceContainer)};
  --md-sys-color-surface-container-high: ${hexFromArgb(colors.surfaceContainerHigh)};
  --md-sys-color-surface-container-highest: ${hexFromArgb(colors.surfaceContainerHighest)};
  --md-sys-color-inverse-surface: ${hexFromArgb(colors.inverseSurface)};
  --md-sys-color-inverse-on-surface: ${hexFromArgb(colors.inverseOnSurface)};

  /* Outline */
  --md-sys-color-outline: ${hexFromArgb(colors.outline)};
  --md-sys-color-outline-variant: ${hexFromArgb(colors.outlineVariant)};

  /* Misc */
  --md-sys-color-shadow: ${hexFromArgb(colors.shadow)};
  --md-sys-color-scrim: ${hexFromArgb(colors.scrim)};
  --md-sys-color-background: ${hexFromArgb(colors.background)};
  --md-sys-color-on-background: ${hexFromArgb(colors.onBackground)};`
}

/**
 * Generate M3 elevation shadow tokens
 */
function generateElevationShadows(colors) {
  const shadowColor = hexFromArgb(colors.shadow)
  return `  /* Elevation shadows (M3 spec) */
  --md-sys-elevation-0: none;
  --md-sys-elevation-1: 0 1px 2px 0 ${shadowColor}1a, 0 1px 3px 1px ${shadowColor}0d;
  --md-sys-elevation-2: 0 1px 2px 0 ${shadowColor}26, 0 2px 6px 2px ${shadowColor}0d;
  --md-sys-elevation-3: 0 1px 3px 0 ${shadowColor}26, 0 4px 8px 3px ${shadowColor}0d;
  --md-sys-elevation-4: 0 2px 3px 0 ${shadowColor}26, 0 6px 10px 4px ${shadowColor}0d;
  --md-sys-elevation-5: 0 4px 4px 0 ${shadowColor}26, 0 8px 12px 6px ${shadowColor}0d;`
}

// ============================================
// Build the output CSS
// ============================================
const output = `/* ============================================
 * Material Design 3 Tokens
 * Auto-generated from package.json "theme":
 *   primary:   ${PRIMARY_COLOR}
 *   secondary: ${SECONDARY_COLOR || '(auto-derived)'}
 *   tertiary:  ${TERTIARY_COLOR || '(auto-derived)'}
 * Run: node scripts/generate-theme.mjs
 * DO NOT EDIT MANUALLY
 * ============================================ */

/* Reference Palettes (full tonal scales) */
:root {
${generatePaletteVars('primary', palettes.primary)}

${generatePaletteVars('secondary', palettes.secondary)}

${generatePaletteVars('tertiary', palettes.tertiary)}

${generatePaletteVars('neutral', palettes.neutral)}

${generatePaletteVars('neutral-variant', palettes.neutralVariant)}

${generatePaletteVars('error', palettes.error)}
}

/* Light Scheme (default) */
:root {
${generateSchemeVars(lightColors)}

${generateElevationShadows(lightColors)}
}

/* Dark Scheme */
.dark {
${generateSchemeVars(darkColors)}

${generateElevationShadows(darkColors)}
}
`

// Write output
const outputPath = resolve(__dirname, '../app/assets/css/material-tokens.css')
writeFileSync(outputPath, output, 'utf-8')

console.log(`\n✓ Material 3 tokens generated`)
console.log(`  Primary:   ${PRIMARY_COLOR}`)
console.log(`  Secondary: ${SECONDARY_COLOR || '(auto from primary)'}`)
console.log(`  Tertiary:  ${TERTIARY_COLOR || '(auto from primary)'}`)
console.log(`  → ${outputPath}`)
console.log(`  → ${Object.keys(palettes).length} palettes × ${TONES.length} tones`)
console.log(`  → Light & dark schemes with elevation shadows`)
