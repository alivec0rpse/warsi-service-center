# Warsi Service Center - Production Website

Professional automobile service center website built with Astro and Tailwind CSS, deployed on GitHub Pages.

## 🚀 Business Information

**Name:** Warsi Service Center  
**Phone:** [9756544613](tel:9756544613)  
**Email:** [adiwarsi953@gmail.com](mailto:adiwarsi953@gmail.com)  
**Website:** [warsi.qzz.io](https://warsi.qzz.io)

## 🛠️ Services Offered

- Denting and painting
- Mechanical repairs
- Welding services
- Washing and polishing
- Teflon coating
- Electrical work
- Custom modding and body kits
- Custom suspension setups
- Color change and removal
- New parts installation
- AC works
- Custom-made body parts
- Custom exhausts and bodyworks
- Engine tuning
- Services for cars, bikes, and scooters
- Repainting of household items

## 🏗️ Tech Stack

- **Framework:** [Astro](https://astro.build) - Fast, modern static site generator
- **Styling:** [Tailwind CSS](https://tailwindcss.com) - Utility-first CSS framework
- **Deployment:** GitHub Pages with GitHub Actions
- **Output:** Fully static site (no backend, no database)

## 📁 Project Structure

```
boss-service-center/
├── .github/
│   └── workflows/
│       └── deploy.yml          # GitHub Actions workflow for deployment
├── public/
│   ├── CNAME                   # Custom domain configuration
│   ├── favicon.svg             # Site favicon
│   └── robots.txt              # SEO robots file
├── src/
│   ├── components/
│   │   ├── Header.astro        # Navigation header
│   │   ├── Footer.astro        # Site footer
│   │   └── ServiceCard.astro   # Reusable service card component
│   ├── layouts/
│   │   └── BaseLayout.astro    # Base HTML layout with SEO
│   ├── pages/
│   │   ├── index.astro         # Home page
│   │   ├── services.astro      # Services page
│   │   └── contact.astro       # Contact page
│   └── styles/
│       └── global.css          # Global styles and Tailwind imports
├── astro.config.mjs            # Astro configuration
├── tailwind.config.mjs         # Tailwind CSS configuration
├── tsconfig.json               # TypeScript configuration
├── package.json                # Project dependencies
└── README.md                   # This file
```

## 🚀 Getting Started

### Prerequisites

- Node.js 18+ installed
- npm, yarn, or pnpm package manager
- Git

### Local Development

1. **Clone the repository:**

```bash
git clone <your-repository-url>
cd boss-service-center
```

2. **Install dependencies:**

```bash
npm install
```

3. **Start development server:**

```bash
npm run dev
```

The site will be available at `http://localhost:4321`

4. **Build for production:**

```bash
npm run build
```

5. **Preview production build:**

```bash
npm run preview
```

## 📦 Deployment to GitHub Pages

### Initial Setup

1. **Create GitHub repository:**
   - Create a new repository on GitHub (e.g., `warsi-service-center`)
   - Do NOT initialize with README, .gitignore, or license

2. **Push code to GitHub:**

```bash
git init
git add .
git commit -m "Initial commit: Warsi Service Center website"
git branch -M main
git remote add origin https://github.com/YOUR_USERNAME/YOUR_REPO_NAME.git
git push -u origin main
```

3. **Configure GitHub Pages:**
   - Go to your repository on GitHub
   - Click **Settings** → **Pages**
   - Under "Build and deployment":
     - Source: Select **GitHub Actions**
   - Save the settings

4. **Configure custom domain (if using):**
   - In the same Pages settings
   - Under "Custom domain", enter: `warsi.qzz.io`
   - Click Save
   - The CNAME file in the `public/` folder will be automatically used

5. **DNS Configuration:**
   
   For the custom domain to work, configure these DNS records with your domain provider:
   
   ```
   Type: CNAME
   Name: warsi.qzz (or your subdomain)
   Value: YOUR_GITHUB_USERNAME.github.io
   ```

### Automatic Deployment

The site automatically deploys when you push to the `main` branch:

```bash
git add .
git commit -m "Update content"
git push origin main
```

GitHub Actions will:
1. Build the Astro site
2. Deploy to GitHub Pages
3. Make it live at your custom domain

### Manual Deployment

To trigger a manual deployment:
1. Go to your repository on GitHub
2. Click **Actions** tab
3. Select the "Deploy to GitHub Pages" workflow
4. Click **Run workflow**

## 🎨 Design Features

### Dark Workshop Theme
- Custom color palette optimized for automotive workshop aesthetic
- Gradient accents (orange, yellow, blue)
- Modern, professional appearance

### Performance Optimizations
- Static site generation for fast loading
- Minimal JavaScript
- Optimized CSS with Tailwind
- Responsive images and assets

### SEO Optimizations
- Meta tags for social sharing
- Semantic HTML structure
- Proper heading hierarchy
- Mobile-first responsive design
- Accessible navigation

### Animations
- Smooth scroll animations
- Intersection Observer for on-scroll reveals
- Hover effects on interactive elements
- Gradient text effects

## 📱 Mobile Responsiveness

The site is fully responsive across all devices:
- Mobile phones (320px+)
- Tablets (768px+)
- Desktops (1024px+)
- Large screens (1280px+)

## 🔧 Customization

### Update Business Information

Edit the following files to update contact information:

- Header: `src/components/Header.astro`
- Footer: `src/components/Footer.astro`
- Contact Page: `src/pages/contact.astro`

### Modify Services

Edit `src/pages/services.astro` to add, remove, or modify services.

### Change Colors

Update the color scheme in `tailwind.config.mjs`:

```js
colors: {
  'workshop-dark': '#0a0a0a',
  'accent-orange': '#ff6b35',
  // ... add your colors
}
```

### Update Domain

1. Change `CNAME` file in `public/` folder
2. Update `site` property in `astro.config.mjs`
3. Configure DNS records with your domain provider

## 🔍 SEO Checklist

- ✅ Proper meta tags on all pages
- ✅ Open Graph tags for social sharing
- ✅ Twitter Card tags
- ✅ Semantic HTML structure
- ✅ robots.txt file
- ✅ Accessible navigation
- ✅ Mobile-friendly design
- ✅ Fast load times
- ✅ Valid HTML
- ✅ Proper heading hierarchy

## 🐛 Troubleshooting

### Site not deploying?
1. Check GitHub Actions tab for error logs
2. Ensure repository settings have Pages enabled
3. Verify the workflow file is in `.github/workflows/`

### Custom domain not working?
1. Check DNS records are properly configured
2. Wait 24-48 hours for DNS propagation
3. Verify CNAME file contains correct domain
4. Check GitHub Pages settings

### Build errors?
1. Check Node.js version (18+ required)
2. Delete `node_modules` and reinstall: `rm -rf node_modules && npm install`
3. Clear Astro cache: `rm -rf .astro`

## 📄 License

This is a production website for Warsi Service Center. All rights reserved.

## 👨‍💻 Development Notes

### Design Decisions

1. **Astro Framework:** Chosen for optimal performance and SEO. Generates purely static HTML with minimal JavaScript.

2. **Tailwind CSS:** Provides utility-first styling for rapid development and consistent design system.

3. **Dark Theme:** Professional workshop aesthetic that stands out and reduces eye strain.

4. **No Backend:** Fully static site keeps costs zero and performance maximum. Contact is handled via click-to-call and click-to-email.

5. **Component-based:** Reusable components ensure consistency and maintainability.

6. **Mobile-first:** Designed primarily for mobile users who are likely searching for services on-the-go.

### Performance Metrics Goals

- Lighthouse Score: 95+ on all metrics
- First Contentful Paint: < 1.5s
- Time to Interactive: < 3.5s
- Total page size: < 500KB

## 📞 Support

For website support or modifications, contact:
- Email: adiwarsi953@gmail.com
- Phone: 9756544613

---

**Built with ❤️ for Warsi Service Center**
