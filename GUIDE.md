# Project Guide

## Favicon

The favicon is located at `/public/favicon.ico`. To change the favicon, replace this file with your own `favicon.ico` file.

## Logo

The logo is an SVG component in `src/components/Header.tsx`. To change the logo, edit the `Logo` component in that file.

## SEO

- The page title and meta description are defined in `src/app/layout.tsx`.
- The `next-sitemap` package is used to generate a sitemap. The configuration is in `next-sitemap.config.js`.
