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
   - Pondération A/Z disponible avec graphique de courbe de pondération A
   - **Simulation de bruit** : Calcul du SNR (Signal-to-Noise Ratio)

2. **Domaine Électrique (dBu, dBV, dBm, dBW)**
   - Mesure de la tension et puissance
   - Affichage VU-mètre animé
   - Calculs de puissance selon l'impédance
   - Conversions dBu, dBV, dBm, dBW en temps réel

3. **Domaine Numérique (dBFS, LUFS)**
   - Mesure du niveau numérique
   - Indicateur de clip digital (LED rouge/orange)
   - **Headroom visuel** : Barre colorée montrant la marge avant clip
   - Analyse EBU R128 (Loudness)
   - Support 16/24/32 bits avec plage dynamique

### Interfaces de Conversion

- **Interface Acoustique ↔ Électrique** : Sensibilité microphone, distance avec loi inverse du carré
- **Interface Électrique ↔ Numérique** : Calibration ADC/DAC avec **11 standards internationaux** :
  - 🇪🇺 **EBU** (Europe) : +4 dBu = -18 dBFS
  - 🇬🇧 **BBC** (UK) : +4 dBu = -18 dBFS
  - 🇫🇷 **France Télévisions** : +6 dBu = -18 dBFS
  - 🇺🇸 **SMPTE** (USA) : +4 dBu = -20 dBFS
  - 🇺🇸 **ATSC** (USA TV) : +4 dBu = -20 dBFS
  - 🇩🇪 **DIN** (Allemagne) : +6 dBu = -15 dBFS
  - 🇩🇪 **ARD/ZDF** : +6 dBu = -9 dBFS
  - 🇯🇵 **ARIB** (Japon) : +4 dBu = -18 dBFS
  - 🏔️ **Nordic** : +6 dBu = -18 dBFS
  - 🏠 **Consumer** : -10 dBV = -12 dBFS
- **Interface Impédance** : Calculs de puissance

### 🎓 Fonctionnalités Pédagogiques Avancées

#### 1. **Mode Sombre/Clair**
- Bascule entre thème sombre et clair
- Accessibilité améliorée avec `focus-visible`
- Adaptation automatique des couleurs

#### 2. **Visualisations Graphiques**
- **Courbe de pondération A** : Graphique SVG interactif montrant l'atténuation par fréquence
- **Headroom visuel** : Barre graduée vert/jaune/rouge montrant la marge avant clip
- **VU-mètre** : Indicateur animé avec zones de sécurité

#### 3. **Mode "Erreurs Courantes"** ⚠️
Modal interactif présentant les erreurs typiques en audio :
- ❌ **Clip numérique** (0 dBFS dépassé) - avec démonstration interactive
- ⚠️ **Gain microphone trop faible** - impact sur le SNR
- ⚠️ **Mauvaise calibration** - confusion entre standards
- ℹ️ **Confusion dBu/dBV** - différence de 2.2 dB
- ❌ **Niveau SPL dangereux** - risques pour l'audition

Chaque erreur inclut :
- Symptôme
- Cause
- Solution
- **Bouton "Démontrer"** qui configure l'outil pour montrer l'erreur en temps réel

#### 4. **Validation Temps Réel** ✅
Alertes contextuelles affichées automatiquement :
- 🔴 **DANGER** : Clip numérique imminent ou SPL >120 dB
- ⚠️ **ATTENTION** : Headroom faible, SNR bas, exposition >85 dB
- ℹ️ **INFO** : Distance excessive, bruit ambiant dominant
- ✅ **SUCCÈS** : SNR excellent (>80 dB)

#### 5. **Historique & Contexte** 📚
Modal éducatif expliquant :
- 🔌 **Pourquoi 600 Ω ?** - Histoire des lignes téléphoniques
- 🎚️ **Pourquoi -18 dBFS ?** - Héritage de l'analogique, headroom
- 📻 **Évolution des standards** - De 1950 à aujourd'hui (VU-mètres → EBU R128)
- 🌍 **Standards par pays** - EBU, BBC, SMPTE, DIN, ARIB, etc.
- 🔊 **94 dB SPL = 1 Pascal** - Pourquoi cette convention ?

#### 6. **Simulation de Bruit**
- Slider de bruit de fond (20-80 dB SPL)
- Calcul du SNR en temps réel
- Alertes si SNR < 30 dB (bruit audible)
- Validation pour SNR > 60 dB (qualité professionnelle)

### Pédagogie

- **Infobulles omniprésentes** : Tous les concepts expliqués au survol
- **Calculs en temps réel** : Mise à jour instantanée de tous les panneaux
- **Source verrouillable** : Exploration bidirectionnelle des conversions
- **Formules commentées** : Code JavaScript abondamment documenté
- **Accessibilité** : Support clavier (Escape pour fermer), ARIA labels, focus visible

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

- **HTML5** : Structure sémantique avec ARIA pour l'accessibilité
- **Tailwind CSS** (CDN) : Design moderne et responsive avec thèmes personnalisés
- **JavaScript ES6+** : Calculs et interactions, aucune dépendance externe
- **SVG** : Visualisations graphiques (courbe de pondération A)
- **Cloudflare Pages** : Hébergement et déploiement

## Formules Mathématiques

### Domaine Acoustique
- **dB SPL** = 20 × log₁₀(P / P₀) où P₀ = 20 µPa
- **Loi inverse du carré** : -6 dB par doublement de distance
- **SNR** = SPL(signal) - SPL(bruit) en dB

### Domaine Électrique
- **dBu** = 20 × log₁₀(V / 0.775V)
- **dBV** = 20 × log₁₀(V / 1V)
- **dBm** = 10 × log₁₀(P / 1mW)
- **dBW** = 10 × log₁₀(P / 1W)
- **Puissance** = V² / Z

### Conversions
- **94 dB SPL = 1 Pascal** (référence sensibilité micro)
- **Calibration** : Point de référence entre analogique et numérique
  - EBU : +4 dBu = -18 dBFS (18 dB headroom)
  - SMPTE : +4 dBu = -20 dBFS (20 dB headroom)
  - DIN : +6 dBu = -15 dBFS (15 dB headroom)
  - France : +6 dBu = -18 dBFS (18 dB headroom)
  - Consumer : -10 dBV = -12 dBFS (12 dB headroom)

## Guide d'Utilisation

1. **Choisir une source** : Cliquez sur "🔓 Définir comme Source" dans l'un des trois panneaux
2. **Ajuster le niveau** : Utilisez le slider vertical du panneau source
3. **Observer les conversions** : Les deux autres panneaux se mettent à jour automatiquement
4. **Configurer les interfaces** : Ajustez sensibilité micro, distance, calibration
5. **Explorer les erreurs** : Cliquez sur "⚠️ Erreurs Courantes" pour apprendre
6. **Consulter l'historique** : Cliquez sur "📚 Historique & Contexte" pour comprendre le "pourquoi"
7. **Basculer le thème** : Cliquez sur "🌙 Mode Clair" pour le confort visuel

## Structure du Projet

```
/
├── index.html      # Application complète (HTML + CSS + JS + SVG)
├── package.json    # Configuration Node.js
├── .gitignore      # Fichiers à ignorer
└── README.md       # Documentation
```

## Cas d'Usage Pédagogiques

- **Formation audio** : Expliquer les conversions dB aux étudiants
- **Setup studio** : Comprendre la calibration de sa chaîne audio
- **Dépannage** : Identifier pourquoi les niveaux ne correspondent pas
- **Broadcast** : Comprendre les différences EBU vs SMPTE
- **Prévention auditive** : Visualiser les niveaux dangereux
- **Enregistrement** : Optimiser le gain pour un bon SNR

## Licence

MIT

## Auteur

Application éducative pour l'apprentissage de la chaîne audio professionnelle.

---

**Version** : 2.0 (avec améliorations pédagogiques)
