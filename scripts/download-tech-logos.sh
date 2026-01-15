#!/bin/bash

# Script to download tech partner logos with transparent backgrounds
# Run from project root: bash scripts/download-tech-logos.sh

LOGO_DIR="public/images/logos/tech-partners"
mkdir -p "$LOGO_DIR"

echo "📥 Downloading tech partner logos..."

# Stripe (using Clearbit API for high-quality logos)
echo "Downloading Stripe logo..."
curl -s "https://logo.clearbit.com/stripe.com" -o "$LOGO_DIR/stripe.png"

# OpenAI
echo "Downloading OpenAI logo..."
curl -s "https://logo.clearbit.com/openai.com" -o "$LOGO_DIR/openai.png"

# Plaid
echo "Downloading Plaid logo..."
curl -s "https://logo.clearbit.com/plaid.com" -o "$LOGO_DIR/plaid.png"

# Anthropic (Claude)
echo "Downloading Claude logo..."
curl -s "https://logo.clearbit.com/anthropic.com" -o "$LOGO_DIR/claude.png"

# Axle
echo "Downloading Axle logo..."
curl -s "https://logo.clearbit.com/axle.insure" -o "$LOGO_DIR/axle.png"

# Persona
echo "Downloading Persona logo..."
curl -s "https://logo.clearbit.com/withpersona.com" -o "$LOGO_DIR/persona.png"

# PredictHQ
echo "Downloading PredictHQ logo..."
curl -s "https://logo.clearbit.com/predicthq.com" -o "$LOGO_DIR/predicthq.png"

# Brex
echo "Downloading Brex logo..."
curl -s "https://logo.clearbit.com/brex.com" -o "$LOGO_DIR/brex.png"

# Gemini (Google AI)
echo "Downloading Gemini logo..."
curl -s "https://logo.clearbit.com/ai.google.dev" -o "$LOGO_DIR/gemini.png"

echo "✅ Done! Logos saved to $LOGO_DIR"
echo ""
echo "📋 Next steps:"
echo "1. Check the logos in $LOGO_DIR"
echo "2. Replace any low-quality logos with official brand assets"
echo "3. Ensure all logos have transparent backgrounds"
echo "4. Run 'npm run build' to test"

