# Le Convertisseur de Niveaux Audio

Application web éducative pour comprendre les conversions entre les domaines acoustique, électrique et numérique en audio professionnel.

## Description

Cet outil pédagogique permet de visualiser et comprendre comment un niveau audio se traduit lorsqu'il passe :
- Du monde **acoustique** (pression dans l'air - dB SPL)
- Au monde **électrique** (tension dans un câble - dBu, dBV, dBm)
- Au monde **numérique** (échantillons dans un ordinateur - dBFS, LUFS)

## Fonctionnalités

### Trois Domaines Interconnectés

1. **Domaine Acoustique (dB SPL)**
   - Mesure de la pression sonore
   - Plage : 0 dB (seuil d'audition) à 140 dB (seuil de douleur)
   - Presets : Chuchotement, Voix normale, Concert rock
   - Pondération A/Z disponible

2. **Domaine Électrique (dBu, dBV, dBm, dBW)**
   - Mesure de la tension et puissance
   - Affichage VU-mètre
   - Calculs de puissance selon l'impédance

3. **Domaine Numérique (dBFS, LUFS)**
   - Mesure du niveau numérique
   - Indicateur de clip digital
   - Analyse EBU R128 (Loudness)
   - Support 16/24/32 bits

### Interfaces de Conversion

- **Interface Acoustique ↔ Électrique** : Sensibilité microphone, distance
- **Interface Électrique ↔ Numérique** : Calibration ADC/DAC (EBU, SMPTE, DIN, Consumer)
- **Interface Impédance** : Calculs de puissance

### Pédagogie

- Infobulles explicatives sur tous les concepts
- Calculs en temps réel
- Source verrouillable pour explorer les conversions dans tous les sens
- Formules commentées dans le code source

## Déploiement sur Cloudflare Pages

### Méthode 1 : Via le Dashboard Cloudflare

1. Connectez-vous à [Cloudflare Dashboard](https://dash.cloudflare.com)
2. Allez dans **Pages** > **Create a project**
3. Connectez votre dépôt Git
4. Configurez les paramètres :
   - **Build command** : (laisser vide)
   - **Build output directory** : `/`
   - **Root directory** : `/`
5. Déployez !

### Méthode 2 : Via Wrangler CLI

```bash
npm install -g wrangler
wrangler pages deploy . --project-name=audio-level-converter
```

### Configuration Cloudflare Pages

Le projet est optimisé pour Cloudflare Pages avec :
- Fichier unique `index.html` (pas de build nécessaire)
- CDN Tailwind CSS
- JavaScript vanilla (pas de dépendances)
- Compatible Node.js 22+

## Utilisation Locale

Pour tester localement :

```bash
# Méthode 1 : Serveur HTTP simple
npx http-server -p 8080

# Méthode 2 : Python
python3 -m http.server 8080

# Méthode 3 : Wrangler Pages (simule Cloudflare)
wrangler pages dev .
```

Puis ouvrez `http://localhost:8080` dans votre navigateur.

## Technologies Utilisées

- **HTML5** : Structure sémantique
- **Tailwind CSS** (CDN) : Design moderne et responsive
- **JavaScript ES6+** : Calculs et interactions
- **Cloudflare Pages** : Hébergement et déploiement

## Formules Mathématiques

### Domaine Acoustique
- **dB SPL** = 20 × log₁₀(P / P₀) où P₀ = 20 µPa
- **Loi inverse du carré** : -6 dB par doublement de distance

### Domaine Électrique
- **dBu** = 20 × log₁₀(V / 0.775V)
- **dBV** = 20 × log₁₀(V / 1V)
- **dBm** = 10 × log₁₀(P / 1mW)
- **Puissance** = V² / Z

### Conversions
- **94 dB SPL = 1 Pascal** (référence sensibilité micro)
- **Calibration** : Point de référence entre analogique et numérique
  - EBU : +4 dBu = -18 dBFS
  - SMPTE : +4 dBu = -20 dBFS
  - DIN : +6 dBu = -15 dBFS
  - Consumer : -10 dBV = -12 dBFS

## Structure du Projet

```
/
├── index.html      # Application complète (HTML + CSS + JS)
├── package.json    # Configuration Node.js
└── README.md       # Documentation
```

## Licence

MIT

## Auteur

Application éducative pour l'apprentissage de la chaîne audio professionnelle.
