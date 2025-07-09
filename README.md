# 🔍 Auditronix - AI Smart Contract Auditor
[![Landing Page](https://github.com/user-attachments/assets/2cc2caf1-d44a-406e-9739-09ca60135aa8)](https://auditronix-smart-contract-auditor.builtforthis.tech/)
An AI-powered smart contract auditing tool built with Next.js, Tailwind CSS, and Framer Motion. Powered by LLaMA-3-70B for security analysis.

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
- Built with NextJS,Tailwind CSS
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
- 
## 📸 Screenshots & Walkthrough
Here’s a quick walkthrough of the **Auditronix - AI Smart Contract Auditor** in action:
### 🔧 1. Landing Page
> Elegant and modern UI with quick access to the contract editor and audit dashboard
![Landing Page](https://github.com/user-attachments/assets/8382d2e2-7685-46dd-b7e3-b36d17e402c3)
---

### 🧠 2. Smart Contract Editor
> Write or paste your Solidity smart contract here. Supports syntax highlighting and instant editing.
![Editor](https://github.com/user-attachments/assets/7c3fd52d-13da-4315-bfd6-d80787a597a4)
---

### ⚙️ 3. Real-Time AI Audit
> On hitting "Run AI Audit", the system analyzes your contract using **LLaMA-3-70B** and returns detailed results.
![Audit Results](https://github.com/user-attachments/assets/cef4caf7-c154-4ac8-a374-0c20f8bfb41a)
![Audit Results-2](https://github.com/user-attachments/assets/7527c1b3-8425-4c60-83e3-0ac3219ee062)
---

### 📊 4. Security Metrics Dashboard
> Displays insights like vulnerabilities, gas efficiency, code quality, and access control.
![Dashboard](https://github.com/user-attachments/assets/c1f5674a-dfbc-4219-8ccf-53513ebaae03)
![Dashboard-2](https://github.com/user-attachments/assets/d605463a-40f6-47c9-abad-a694d938dbdc)
![Dashboard-3](https://github.com/user-attachments/assets/2a7430f7-6486-4da5-b753-20b246b50821)
---

### 📄 5. Export PDF Report
> Generate and download a professional audit report with one click.
![PDF Export](https://github.com/user-attachments/assets/4107261a-e48a-4646-bd9e-967ef8161a5d)
🔗 [View Full PDF Report](./auditronix-report-2025-07-09.pdf)
---

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

## Contributing
We welcome contributions! Please follow these steps:
1. Fork the repository
2. Create a feature branch (`git checkout -b feature/your-feature`)
3. Commit your changes (`git commit -am 'Add some feature'`)
4. Push to the branch (`git push origin feature/your-feature`)
5. Open a Pull Request



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

⭐ If you found this project useful, consider giving it a star on GitHub!

