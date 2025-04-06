# purgD - AI-Powered Inventory Liquidation Platform

purgD is a modern web application that helps businesses optimize their inventory liquidation through AI-powered promotional campaigns. The platform analyzes inventory data and generates targeted promotional content for slow-moving products.

## Features

- Upload inventory spreadsheets (XLSX, XLS, CSV)
- Automatic identification of slow-moving products
- AI-generated promotional campaigns
- Suggested discount percentages
- Real-time campaign generation progress
- Modern, responsive UI

## Getting Started

### Prerequisites

- Node.js (v16 or higher)
- npm or yarn
- OpenAI API key

### Installation

1. Clone the repository:
```bash
git clone https://github.com/yourusername/purgd.git
cd purgd
```

2. Install dependencies:
```bash
npm install
```

3. Create a `.env` file in the root directory and add your OpenAI API key:
```
VITE_OPENAI_API_KEY=your_openai_api_key_here
```

4. Start the development server:
```bash
npm run dev
```

### Spreadsheet Format

Your inventory spreadsheet should include the following columns:
- SKU
- Name
- Quantity
- Sales
- Price

## Usage

1. Upload your inventory spreadsheet using the drag-and-drop interface
2. Review the uploaded products
3. Click "Generate Promotional Campaigns" to create AI-powered campaigns
4. Review and implement the generated campaigns

## Technologies Used

- React
- TypeScript
- Vite
- Tailwind CSS
- OpenAI API
- XLSX library
- React Dropzone

## License

MIT

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.
