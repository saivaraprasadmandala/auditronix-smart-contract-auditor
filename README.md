# 🔍 Auditronix - AI Smart Contract Auditor

An AI-powered smart contract auditing tool built with Next.js 14, Tailwind CSS, and Framer Motion. Powered by LLaMA-3-70B for comprehensive security analysis.

## ✨ Features

- **🛡️ AI-Powered Security Analysis**: Advanced vulnerability detection using LLaMA-3-70B
- **⚡ Real-time Code Analysis**: Instant feedback on smart contract security
- **📊 Comprehensive Metrics**: 8 detailed security and quality metrics
- **📄 Professional PDF Reports**: Exportable audit reports with proper formatting
- **🎨 Modern UI**: Beautiful, responsive interface with smooth animations
- **🔧 Live Demo**: Interactive contract editor with real-time analysis

## 🚀 Quick Start

### Prerequisites

- Node.js 18+ 
- npm or yarn
- Together AI API key ([Get one here](https://api.together.xyz))

### Installation

1. **Clone the repository**

   ```bash
   git clone https://github.com/your-repo/auditronix.git
   cd auditronix

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   ```bash
   cp .env.example .env.local
   ```
   
   Edit `.env.local` and add your Together AI API key:
   ```
   TOGETHER_AI_API_KEY=your_api_key_here
   ```

4. **Run the development server**
   ```bash
   npm run dev
   ```

5. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

## 🛠️ Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint

## 📁 Project Structure

```
auditronix-web/
├── app/                    # Next.js 14 App Router
│   ├── api/               # API routes
│   ├── dashboard/         # Dashboard page
│   └── globals.css        # Global styles
├── components/            # React components
│   ├── ui/               # shadcn/ui components
│   ├── animated/         # Animation components
│   └── ...               # Feature components
├── lib/                  # Utilities and helpers
│   ├── types.ts          # TypeScript types
│   ├── constants.ts      # App constants
│   └── pdf-export.ts     # PDF generation
└── public/               # Static assets
```

## 🔧 Configuration

### Environment Variables

| Variable | Description | Required |
|----------|-------------|----------|
| `TOGETHER_AI_API_KEY` | Together AI API key for LLaMA-3 access | Yes |

### API Integration

The app uses Together AI's LLaMA-3-70B model for smart contract analysis. The API integration is handled in `/app/api/analyze/route.ts`.

## 🎨 Customization

### Styling
- Built with Tailwind CSS
- Dark theme by default
- Custom color palette with emerald accents
- Responsive design for all devices

### Components
- Uses shadcn/ui component library
- Framer Motion for animations
- Lucide React for icons

## 📊 Features Overview

### Security Metrics
- **Security Vulnerabilities**: Reentrancy, overflow, access control
- **Gas Optimization**: Loop efficiency, storage usage
- **Code Quality**: Readability, modularity, best practices
- **Access Control**: Permission management
- **Input Validation**: Parameter checks
- **Business Logic**: Logic correctness
- **Upgradability**: Proxy patterns
- **Documentation**: Comments and clarity

### Analysis Capabilities
- Real-time vulnerability detection
- Gas optimization suggestions
- Code quality assessment
- Professional PDF report generation
- Interactive dashboard with metrics

## 🚀 Deployment

### Vercel (Recommended)
1. Push your code to GitHub
2. Connect your repository to Vercel
3. Add environment variables in Vercel dashboard
4. Deploy automatically

### Other Platforms
The app can be deployed to any platform that supports Next.js:
- Netlify
- Railway
- DigitalOcean App Platform
- AWS Amplify

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## 📝 License

This project is licensed under the MIT License.

## 🆘 Support

If you encounter any issues:
1. Check the environment variables are set correctly
2. Ensure your Together AI API key is valid
3. Verify Node.js version (18+)
4. Check the console for error messages

## 🔗 Links

- [Together AI](https://api.together.xyz) - Get your API key
- [Next.js Documentation](https://nextjs.org/docs)
- [Tailwind CSS](https://tailwindcss.com)
- [shadcn/ui](https://ui.shadcn.com)

---

Built with ❤️ using Next.js 14, Tailwind CSS, and AI
