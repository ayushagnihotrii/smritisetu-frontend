# SmritiSetu Design System: Tactile Denim & Archival Industrial Craft
### SIH26096 • Dr. B. R. Ambedkar Digital Heritage Archive

---

## 🎨 Color Palette & Materiality

| Token Name | Hex Code | Semantic Role |
| :--- | :--- | :--- |
| `--color-ambedkar-blue` | `#1E3A8A` | Primary heritage blue representing Dr. Ambedkar's democratic movement |
| `--color-raw-indigo` | `#223C63` | 14.5oz raw denim twill surface tone |
| `--color-dark-wash` | `#1A2B45` | Elevated card and container background |
| `--color-twill-dark` | `#121E33` | Recessed input and facsimile scan wells |
| `--color-midnight` | `#0A111C` | Kiosk Night dark backdrop |
| `--color-thread-gold` | `#f0c36d` | Contrast stitching, quote highlights, and primary accents |
| `--color-brass` | `#DCB35C` | Hardware stanchions, verified stamps, and borders |
| `--color-copper` | `#B87333` | Hand-set structural copper rivets at card corners |
| `--color-selvedge-red` | `#C93B2B` | Heritage selvedge tape edge line marking archival provenance |
| `--color-parchment` | `#FBF9F4` | Museum Day warm background and heading highlight |

---

## 🔤 Typography & Indic Scripts

SmritiSetu pairs classic dignified serifs with high-legibility sans-serifs and technical monospaces:
- **Display & Headings**: `Roboto Slab` and `Noto Serif Devanagari` (Weight: 700, 800)
- **Body Text**: `Inter` and `Noto Sans Devanagari` (Weight: 400, 500, 600)
- **Archival Metadata & Stamps**: `JetBrains Mono` (Weight: 500, 700)
- **Supported Indic Scripts**: Devanagari (Hindi, Marathi), Tamil (தமிழ்), Telugu (తెలుగు), Bengali (বাংলা), Gujarati (ગુજરાતી), Kannada (ಕನ್ನಡ), Malayalam (മലയാളം), Punjabi (ਪੰਜਾਬੀ), Odia (ଓଡ଼ିଆ), Urdu (اردو).

---

## 📐 Layout & Touch-First Kiosk Standards

- **Touch Target Dimensions**:
  - Web Standard: 44px min-height
  - **Museum Kiosk Mode**: **64px+ min-height**, **min-width: 180px** for primary touch actions
- **Card Accents**:
  - Four corner copper rivets (`.copper-rivet.corner-rivet`) with radial gradient burnish and center indent
  - Gold chain-stitching (`border: 2px dashed #DCB35C`)
- **Archival Tags**:
  - Red selvedge tape (`.selvedge-tape` with crimson edge line)
  - Brass verification stamp (`.brass-stamp` with metallic badge)
