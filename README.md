# Mughal.Dev Premium Portfolio

A high-performance, cinematic portfolio template featuring advanced 3D environments, smooth trailing physics, and premium motion design.

## 🚀 Technologies Used

- **Framework**: [React 18](https://reactjs.org/)
- **Language**: [TypeScript](https://www.typescriptlang.org/)
- **Bundler**: [Vite](https://vitejs.dev/)
- **Animation**: [GSAP](https://greensock.com/gsap/) (ScrollTrigger)
- **3D Graphics**: [Three.js](https://threejs.org/) with [@react-three/fiber](https://github.com/pmndrs/react-three-fiber) & [@react-three/drei](https://github.com/pmndrs/drei)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/)
- **Smooth Scroll**: [Lenis](https://github.com/darkroomengineering/lenis)
- **Icons**: [Lucide React](https://lucide.dev/)

## 🛠️ How to Set Up

### 1. Clone & Install
```bash
# Clone the repository
git clone <your-repo-link>

# Navigate to the project directory
cd app

# Install dependencies
npm install
```

### 2. Development
```bash
# Start the local development server
npm run dev
```

### 3. Build
```bash
# Generate a production build
npm run build
```

## 📝 How to Edit Content

Most of the website's content, theme settings, and features can be managed through a single configuration file:

📍 **Path**: `src/config.ts`

In this file, you can easily change:
- **Brand Info**: Name, Role, Tagline, Email.
- **Theme**: Primary colors, gradients, and typography.
- **Projects**: Titles, descriptions, and thumbnail paths.
- **Skills**: Tools, proficiency levels, and statistics.
- **Socials**: Link your LinkedIn, GitHub, etc.
- **Feature Flags**: Toggle Three.js, Cursor, or Loader on/off.

## 🌐 Hosting on Vercel

1. **Push to GitHub**: Push your code to a GitHub repository.
2. **Import Project**: Log in to [Vercel](https://vercel.com/) and click **"Add New Project"**.
3. **Configure Settings**:
   - **Framework Preset**: Vite
   - **Root Directory**: `app` (if your code is in a subfolder)
   - **Build Command**: `npm run build`
   - **Output Directory**: `dist`
4. **Deploy**: Click "Deploy" and your portfolio will be live in seconds!

---

**Created with love by Mughal.Dev Community**  
**Owner:** Zain Mughal
