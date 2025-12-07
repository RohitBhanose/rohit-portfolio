# Quick Start Guide

## 🚀 Get Started in 3 Steps

### Step 1: Install Dependencies

```bash
cd portfolio
npm install
```

### Step 2: Run Development Server

```bash
npm run dev
```

### Step 3: Open in Browser

Visit [http://localhost:3000](http://localhost:3000)

---

## 📝 Next Steps

### Customize Your Content

1. **Update Hero Section** (`components/sections/Hero.tsx`)
   - Change name, tagline, and description

2. **Update About Section** (`components/sections/About.tsx`)
   - Modify personal information and facts

3. **Update Skills** (`components/sections/Skills.tsx`)
   - Adjust skill levels and add/remove skills

4. **Update Projects** (`components/sections/Projects.tsx`)
   - Replace with your actual projects
   - Update GitHub and demo links

5. **Update Experience** (`components/sections/Experience.tsx`)
   - Add your education and work experience

6. **Update Contact** (`components/sections/Contact.tsx`)
   - Add your email, phone, and social links
   - Configure form submission (currently placeholder)

7. **Update SEO** (`app/layout.tsx`)
   - Modify metadata for better SEO

### Add Your Resume

1. Place your resume PDF in the `public` folder
2. Update resume links in:
   - `components/sections/Hero.tsx`
   - `components/sections/About.tsx`

### Add Your Avatar

1. Place your avatar image in the `public` folder
2. Update the image path in `components/sections/Hero.tsx`

---

## 🎨 Customize Colors

Edit `tailwind.config.ts` to change the color scheme:

```typescript
colors: {
  primary: {
    DEFAULT: '#6C63FF',  // Change this
  },
  accent: {
    DEFAULT: '#00E5FF',  // Change this
  },
  // ...
}
```

---

## 🚀 Deploy

See `DEPLOYMENT.md` for detailed deployment instructions.

**Quick Deploy to Vercel:**
```bash
npm install -g vercel
vercel
```

---

## 📚 Learn More

- [Next.js Documentation](https://nextjs.org/docs)
- [TailwindCSS Documentation](https://tailwindcss.com/docs)
- [Framer Motion Documentation](https://www.framer.com/motion/)
- [Recharts Documentation](https://recharts.org/)

---

Happy coding! 🎉



